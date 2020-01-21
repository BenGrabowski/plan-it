import config from '../config';

const TokenService = {
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token);
      },
      getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY);
      },
      clearAuthToken() {
        window.localStorage.removeItem(config.TOKEN_KEY);
      },
      hasAuthToken() {
        return !!TokenService.getAuthToken();
      },
      saveUserId(id) {
        window.localStorage.setItem('user_id', id);
      },
      getUserId() {
        return window.localStorage.getItem('user_id');
      },
      clearUserId() {
        window.localStorage.removeItem('user_id');
      },  
}

export default TokenService;