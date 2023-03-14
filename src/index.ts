import app from './api';
import update from './scrapper';
const cron = require('node-cron');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//update();

//cron.schedule('* 30 * * * *', async () => await update());
