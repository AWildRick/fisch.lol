document.getElementById("discord-login-btn").addEventListener("click", () => {
    const clientID = "501116066903359489";
    const redirectUri = "https://yoursite.netlify.app/.netlify/functions/discord-login";
    const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=identify`;
  
    window.location.href = oauthUrl; // Redirect to Discord login
  });  