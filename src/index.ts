import express from 'express';
import config from './config';
import Loaders from './loaders';
import Logger from './loaders/logger';
import uploadInvestInfo from './api/uploadInfo/uploadInvestInfo';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  app.get('/upload', async (req, res) => {
    await uploadInvestInfo(req,res);
    res.send('Upload successful');
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });


  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
