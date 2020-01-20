import path from 'path';
import express from 'express';
import ganache from 'ganache-core';
import HbsCompiler from './HbsCompiler';

const expressPort = 3000;
const ganachePort = 7585;

function launchApiServer() {
  const app = express();
  
  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
  });

  app.listen(expressPort, function () {
    console.log(`API server ready and listening on ${expressPort}.`);
  });  
}

function launchGanacheServer() {
  const server = ganache.server();
  
  server.listen(ganachePort, function(err: any, blockchain: any) { 
    const contractsPath = path.resolve(__dirname, 'src', 'contracts');
    const contractPath = path.resolve(contractsPath, 'choreography.sol.hbs');
    const partialsPath = path.resolve(contractsPath, 'partials');
    const hbsCompiler = new HbsCompiler(contractPath, partialsPath);
    const compiledTemplate = hbsCompiler.compile();
    console.log(compiledTemplate);
    console.log(`Ganache server ready and listening on ${ganachePort}`);
  });
}

launchGanacheServer();
