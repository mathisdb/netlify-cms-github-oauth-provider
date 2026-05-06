module.exports = (req, res) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URL;
  const scope = 'repo,user';

  const url = `https://github.com/login/oauth/authorize`
    + `?client_id=${encodeURIComponent(clientId)}`
    + `&redirect_uri=${encodeURIComponent(redirectUri)}`
    + `&scope=${encodeURIComponent(scope)}`;

  res.redirect(url);
};
