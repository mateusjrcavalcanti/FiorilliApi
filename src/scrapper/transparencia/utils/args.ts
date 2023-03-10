const args = {
  headless: true,
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  defaultNavigationTimeout: 60000,
  defautlTimeout: 60000,
  args: [
    '--disable-web-security',
    '--enable-feature=NetworkService',
    '--disable-features=IsolateOrigins',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-sandbox',
    '--disable-features=site-per-process',
  ],
};
export default args;
