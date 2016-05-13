
const AppConstants = {
  appName: 'Some App Name',
  jwtKey: 'jwtToken',
  API:(
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000/users'
      : '/users'
  ),
  pages: {
    home: 'Home',
    login: 'Log in',
    register: 'Sign up',
    profile: 'Profile'
  }
};
export default AppConstants;
