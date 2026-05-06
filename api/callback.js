module.exports = async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token } = await response.json();
  if (!access_token) return res.status(401).send('No token received');

  const content = JSON.stringify({ token: access_token, provider: 'github' });

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html><html><body><script>
(function() {
  var content = ${JSON.stringify(content)};
  function receiveMessage(e) {
    window.opener.postMessage('authorization:github:success:' + content, e.origin);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`);
};
