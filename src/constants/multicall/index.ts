import { ChainId } from '@uniswap/sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: '0xc7370B1f2cba1F79D22FDA84B860879eD94B5059', //TODO: CHANGE THIS
  [ChainId.MAINNET]: '0xc7370B1f2cba1F79D22FDA84B860879eD94B5059',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
