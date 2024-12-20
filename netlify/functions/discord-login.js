const fetch = require("node-fetch");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../../firebase-service-account.json"); // Path to your service account file

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore(); // Reference to Firestore

exports.handler = async function (event) {
  const clientID = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = "https://yoursite.netlify.app/.netlify/functions/discord-login";

  const code = event.queryStringParameters.code;

  // Exchange code for access token
  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: tokenData.error }),
    };
  }

  // Get user details from Discord
  const userResponse = await fetch("https://discord.com/api/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const userData = await userResponse.json();

  if (userData.id) {
    // Save user to Firestore
    const userRef = db.collection("users").doc(userData.id); // Use Discord user ID as document ID
    await userRef.set(
      {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        accessToken: tokenData.access_token, // Store access token (optional)
        refreshToken: tokenData.refresh_token, // Store refresh token (optional)
        lastLogin: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true } // Merge to avoid overwriting existing data
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User saved successfully!", user: userData }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Failed to fetch user details from Discord." }),
    };
  }
};
