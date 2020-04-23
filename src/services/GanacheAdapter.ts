import ganache from 'ganache-core';
import Web3 from 'web3';

export default class GanacheAdapter {

  private readonly web3: Web3;

  constructor() {
    const provider = ganache.provider();
    this.web3 = new Web3(provider as any);
  }

  public async deployContract(compiledSolContract: any, account: string): Promise<string> {

    const deployedContract = await new this.web3.eth.Contract(compiledSolContract.abi)
      .deploy({
        data: '0x' + compiledSolContract.evm.bytecode.object,
        arguments: []
      })
      .send({
        from: account,
        gas: 2000000
      });

    return deployedContract.options.address;
  }

  public async getDefaultAccount(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }

  public async executeTask(taskName: string, account: string): Promise<void> {

  }

}
