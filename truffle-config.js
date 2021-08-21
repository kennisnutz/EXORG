require('babel-register');
require('babel-polyfill');

const HDWalletProvider= require('@truffle/hdwallet-provider');
const mnemonic= "MNEMONIC_PHRASE"

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    bscMainnet: {
      provider: ()=> new HDWalletProvider(
        mnemonic,
        'https://bsc-dataseed.binance.org/'
      ),
      
      network_id: 56,// 
      skipDryRun: true
    },
    bscTestnet :  {
      provider: ()=> new HDWalletProvider(
        mnemonic,
        'https://data-seed-prebsc-1-s1.binance.org:8545'
      ),
      
      network_id: 97,// 
      skipDryRun: true
    },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
}
