import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH_CALLBACK_URL,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(routerHistory) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        routerHistory.replace('/');
      } else if (err) {
        routerHistory.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    const proji = {
      access_token: authResult.accessToken,
      id_token: authResult.idToken,
      expires_at: expiresAt
    };

    localStorage.setItem('proji', JSON.stringify(proji));
  }

  logout(routerHistory) {
    localStorage.removeItem('proji');
    routerHistory.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let proji = localStorage.getItem('proji');
    proji = JSON.parse(proji);
    if (!proji) {
      return false;
    }

    return new Date().getTime() < proji.expires_at;
  }
}
