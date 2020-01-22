import ganache from 'ganache-core';
import Web3 from 'web3';

export default class GanacheAdapter {

    public static async deploy(compiledSolContract: any): Promise<string> {
        const provider = ganache.provider();
        const web3 = new Web3(provider as any);
        const accounts = await web3.eth.getAccounts();
        const deployedContract = await new web3.eth.Contract(compiledSolContract.abi)
            .deploy({
                data: '0x' + compiledSolContract.evm.bytecode.object,
                arguments: [0]
            })
            .send({
                from: accounts[0],
                gas: 2000000
            });
        
        return deployedContract.options.address;
    }

}