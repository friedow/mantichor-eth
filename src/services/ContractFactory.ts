import path from 'path';
import HbsCompiler from '@/services/HbsCompiler';
import SolCompiler from '@/services/SolCompiler';
import GanacheAdaper from '@/services/GanacheAdapter';

export default class ContractCreator {

  public static async deployChoreographyContract(): Promise<string> {
    const contractsPath = path.resolve(__dirname, '../contracts');
    const contractFileName = 'choreography.sol.hbs';
    const contractPath = path.resolve(contractsPath, contractFileName);
    const partialsPath = path.resolve(contractsPath, 'partials');

    const contractCode = HbsCompiler.compile(contractPath, partialsPath);
    console.log('=========================');
    console.log('Generated solidity code:');
    console.log(contractCode);

    const compiledSolContract = SolCompiler.compile(contractFileName, contractCode);
    console.log('=========================');
    console.log('Solidity config compiled.');

    const ganacheAdapter = new GanacheAdaper();
    const account = await ganacheAdapter.getDefaultAccount();
    const contractAddress = await ganacheAdapter.deployContract(compiledSolContract, account);
    console.log('=========================');
    console.log(`Contract deployed at ${contractAddress}`);

    return contractAddress;
  }

}
