import util from 'util';
import express from 'express';
import ganache from 'ganache-core';
import ContractCreator from '@/services/ContractFactory';
// import router from './routes/router';

const expressPort = 3000;
const ganachePort = 7585;

function launchApiServer() {
  const app = express();

  // app.use(router);

  app.listen(expressPort, () => {
    console.log(`API server ready and listening on ${expressPort}.`);
  });
}

async function launchGanacheServer() {
  const server = ganache.server();
  const serverListenAsync = util.promisify(server.listen);
  await serverListenAsync();
  console.log('=========================');
  console.log(`Ganache server ready and listening on ${ganachePort}`);
  ContractCreator.deployChoreographyContract();
}

launchGanacheServer();
// launchApiServer();
