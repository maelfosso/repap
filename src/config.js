const dev = {
  API_URL: 'http://localhost:4000',
};

const prod = {
  API_URL: 'https://mv-final-repap-api.herokuapp.com',
};

const config = process.env.APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  ...config,
};
