import path from 'path';
import express from 'express';
import ganache from 'ganache-core';
import HbsCompiler from './HbsCompiler';
import SolCompiler from './SolCompiler';
import GanacheAdaper from './GanacheAdapter';

const expressPort = 3000;
const ganachePort = 7585;

function launchApiServer() {
  const app = express();

  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
  });

  app.listen(expressPort, () => {
    console.log(`API server ready and listening on ${expressPort}.`);
  });
}

function launchGanacheServer() {
  const server = ganache.server();

  server.listen(ganachePort, async (err: any, blockchain: any) => {
    const contractsPath = path.resolve(__dirname, 'contracts');
    const contractFileName = 'choreography.sol.hbs';
    const contractPath = path.resolve(contractsPath, contractFileName);
    const partialsPath = path.resolve(contractsPath, 'partials');

    console.log('=========================');
    const contractCode = HbsCompiler.compile(contractPath, partialsPath);
    console.log('Generated solidity code:');
    console.log(contractCode);

    console.log('=========================');
    const compiledSolConfig = SolCompiler.compile(contractFileName, contractCode);
    console.log('Compiled solidity config:');
    console.log(compiledSolConfig);

    console.log('=========================');
    const contracts = compiledSolConfig.contracts;
    for (const contractGroup in contracts) {
      if (contracts.hasOwnProperty(contractGroup)) {
        for (const contractName in contracts[contractGroup]) {
          if (contracts[contractGroup].hasOwnProperty(contractName)) {
            const contractAddress = await GanacheAdaper.deploy(contracts[contractGroup][contractName]);
            console.log(`Contract deployed at address: ${contractAddress}`);
          }
        }
      }
    }

    console.log('=========================');
    console.log(`Ganache server ready and listening on ${ganachePort}`);
  });
}

launchGanacheServer();
