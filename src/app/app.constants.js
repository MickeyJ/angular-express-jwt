
const AppConstants = {
  appName: 'Reddit Clone',
  jwtKey: 'jwtToken',
  API:(
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : ''
  ),
  pages: {
    home: 'Home',
    login: 'Log in',
    register: 'Sign up',
    profile: 'Profile'
  }
};
export default AppConstants;
