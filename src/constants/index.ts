import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import {
  injected,
  walletconnect,
  walletlink,
  portis,
  arkaneconnect,
  safeApp,
} from '../connectors';
import MetamaskIcon from 'assets/images/metamask.png';
import BlockWalletIcon from 'assets/images/blockwalletIcon.svg';
import cypherDIcon from 'assets/images/cypherDIcon.png';
import BitKeepIcon from 'assets/images/bitkeep.png';
import CoinbaseWalletIcon from 'assets/images/coinbaseWalletIcon.svg';
import WalletConnectIcon from 'assets/images/walletConnectIcon.svg';
import PortisIcon from 'assets/images/portisIcon.png';
import VenlyIcon from 'assets/images/venly.svg';
import GnosisIcon from 'assets/images/gnosis_safe.png';

const WETH_ONLY: ChainTokenList = {
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
};

// TODO: Remove this constant when supporting multichain
export const MATIC_CHAIN = ChainId.MAINNET;

export enum TxnType {
  SWAP,
  ADD,
  REMOVE,
}

export const GlobalConst = {
  blacklists: {
    TOKEN_BLACKLIST: [null],
    PAIR_BLACKLIST: [null],
  },
  addresses: {
    ROUTER_ADDRESS: {
      [ChainId.MAINNET]: '0xF03B6DAD0e06e6c542CF88596355f91922f69bA7',
      [ChainId.TESTNET]: '0x8954AfA98594b838bda56FE4C12a09D7739D179b',
    }, //'0x6207A65a8bbc87dD02C3109D2c74a6bCE4af1C8c';//
    ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
    LAIR_ADDRESS: '0xF03B6DAD0e06e6c542CF88596355f91922f69bA7',
    NEW_LAIR_ADDRESS: '0xF03B6DAD0e06e6c542CF88596355f91922f69bA7',
    QUICK_ADDRESS: '0x6FC4563460d5f45932C473334d5c1C5B4aEA0E01',
    NEW_QUICK_ADDRESS: '0x5E245Ca4fc9Ce5D4D03E53F50E0cE681e9DCf4fD',
    FACTORY_ADDRESS: '0x1e00cf5647108EdCB4f6e1EbC5805753db3dF63e',
    GOVERNANCE_ADDRESS: '0xBCd969bDF37654aaE11D37817b13Da9F7e0374e5', //TODO: MATIC
    MERKLE_DISTRIBUTOR_ADDRESS: {
      // TODO: specify merkle distributor for mainnet
      [ChainId.MAINNET]: '0x4087F566796b46eEB01A38174c06E2f9924eAea8', //TODO: MATIC
      [ChainId.TESTNET]: undefined,
    },
    QUICK_CONVERSION: '0xBCd969bDF37654aaE11D37817b13Da9F7e0374e5',
  },
  utils: {
    QUICK_CONVERSION_RATE: 1000,
    ONEDAYSECONDS: 60 * 60 * 24,
    DQUICKFEE: 0.04,
    DQUICKAPR_MULTIPLIER: 0.01,
    ROWSPERPAGE: 10,
    FEEPERCENT: 0.003,
    BUNDLE_ID: '1',
    PROPOSAL_LENGTH_IN_DAYS: 7, // TODO this is only approximate, it's actually based on blocks
    NetworkContextName: 'NETWORK',
    INITIAL_ALLOWED_SLIPPAGE: 50, // default allowed slippage, in bips
    DEFAULT_DEADLINE_FROM_NOW: 60 * 20, // 20 minutes, denominated in seconds
    BIG_INT_ZERO: JSBI.BigInt(0),
    ONE_BIPS: new Percent(JSBI.BigInt(1), JSBI.BigInt(10000)), // one basis point
    BIPS_BASE: JSBI.BigInt(10000),
    // used to ensure the user doesn't send so much ETH so they end up with <.01
    MIN_ETH: JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)), // .01 ETH
    BETTER_TRADE_LINK_THRESHOLD: new Percent(
      JSBI.BigInt(75),
      JSBI.BigInt(10000),
    ),
    // the Uniswap Default token list lives here
    // we add '' to remove the possibility of nulls
    DEFAULT_TOKEN_LIST_URL: process.env.REACT_APP_TOKEN_LIST_DEFAULT_URL + '',
    DEFAULT_LP_FARMS_LIST_URL:
      process.env.REACT_APP_STAKING_LIST_DEFAULT_URL + '',
    DEFAULT_DUAL_FARMS_LIST_URL:
      process.env.REACT_APP_DUAL_STAKING_LIST_DEFAULT_URL + '',
    DEFAULT_SYRUP_LIST_URL: process.env.REACT_APP_SYRUP_LIST_DEFAULT_URL + '',
    ANALYTICS_TOKENS_COUNT: 200,
    ANALYTICS_PAIRS_COUNT: 400,
  },
  analyticChart: {
    ONE_MONTH_CHART: 1,
    THREE_MONTH_CHART: 2,
    SIX_MONTH_CHART: 3,
    ONE_YEAR_CHART: 4,
    ALL_CHART: 5,
    CHART_COUNT: 60, //limit analytics chart items not more than 60
  },
  farmIndex: {
    LPFARM_INDEX: 0,
    DUALFARM_INDEX: 1,
  },
  walletName: {
    METAMASK: 'Metamask',
    CYPHERD: 'CypherD',
    BLOCKWALLET: 'BlockWallet',
    BITKEEP: 'BitKeep',
    INJECTED: 'Injected',
    SAFE_APP: 'Gnosis Safe App',
    ARKANE_CONNECT: 'Venly',
    Portis: 'Portis',
    WALLET_LINK: 'Coinbase Wallet',
    WALLET_CONNECT: 'WalletConnect',
  },
};

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  CYPHERD: {
    connector: injected,
    name: GlobalConst.walletName.CYPHERD,
    iconName: cypherDIcon,
    description: 'CypherD browser extension.',
    href: null,
    color: '#E8831D',
  },
  METAMASK: {
    connector: injected,
    name: GlobalConst.walletName.METAMASK,
    iconName: MetamaskIcon,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  BLOCKWALLET: {
    connector: injected,
    name: GlobalConst.walletName.BLOCKWALLET,
    iconName: BlockWalletIcon,
    description: 'BlockWallet browser extension.',
    href: null,
    color: '#1673ff',
  },
  BITKEEP: {
    connector: injected,
    name: GlobalConst.walletName.BITKEEP,
    iconName: BitKeepIcon,
    description: 'BitKeep browser extension.',
    href: null,
    color: '#E8831D',
  },
  INJECTED: {
    connector: injected,
    name: GlobalConst.walletName.INJECTED,
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  SAFE_APP: {
    connector: safeApp,
    name: GlobalConst.walletName.SAFE_APP,
    iconName: GnosisIcon,
    description: 'Login using gnosis safe app',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  ARKANE_CONNECT: {
    connector: arkaneconnect,
    name: GlobalConst.walletName.ARKANE_CONNECT,
    iconName: VenlyIcon,
    description: 'Login using Venly hosted wallet.',
    href: null,
    color: '#4196FC',
  },
  Portis: {
    connector: portis,
    name: GlobalConst.walletName.Portis,
    iconName: PortisIcon,
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: GlobalConst.walletName.WALLET_LINK,
    iconName: CoinbaseWalletIcon,
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: GlobalConst.walletName.WALLET_CONNECT,
    iconName: WalletConnectIcon,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
};

export const GlobalValue = {
  percents: {
    ALLOWED_PRICE_IMPACT_LOW: new Percent( // used for warning states
      JSBI.BigInt(100),
      GlobalConst.utils.BIPS_BASE,
    ), // 1%
    ALLOWED_PRICE_IMPACT_MEDIUM: new Percent(
      JSBI.BigInt(300),
      GlobalConst.utils.BIPS_BASE,
    ), // 3%
    ALLOWED_PRICE_IMPACT_HIGH: new Percent(
      JSBI.BigInt(500),
      GlobalConst.utils.BIPS_BASE,
    ), // 5%
    PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: new Percent( // if the price slippage exceeds this number, force the user to type 'confirm' to execute
      JSBI.BigInt(1000),
      GlobalConst.utils.BIPS_BASE,
    ), // 10%
    BLOCKED_PRICE_IMPACT_NON_EXPERT: new Percent( // for non expert mode disable swaps above this
      JSBI.BigInt(1500),
      GlobalConst.utils.BIPS_BASE,
    ), // 15%
  },
  tokens: {
    wwDOGE: WETH[ChainId.MAINNET],
    COMMON: {
      EMPTY: new Token(
        ChainId.MAINNET,
        '0x0000000000000000000000000000000000000000',
        0,
        'EMPTY',
        'EMPTY',
      ),
      USDC: new Token(
        ChainId.MAINNET,
        '0x765277EebeCA2e31912C9946eAe1021199B39C61',
        6,
        'USDC',
        'USDC',
      ),
      USDT: new Token(
        ChainId.MAINNET,
        '0x42fDB358e6a8526CD0ACaB47D72CaFFc6D95DD2f',
        6,
        'USDT',
        'Tether USD',
      ),
      OLD_QUICK: new Token(
        ChainId.MAINNET,
        GlobalConst.addresses.QUICK_ADDRESS,
        18,
        'QUICK(OLD)',
        'Quickswap(OLD)',
      ),
      NEW_QUICK: new Token(
        ChainId.MAINNET,
        GlobalConst.addresses.NEW_QUICK_ADDRESS,
        18,
        'QUICK(NEW)',
        'QuickSwap(NEW)',
      ),
      OLD_DQUICK: new Token(
        ChainId.MAINNET,
        '0x42fDB358e6a8526CD0ACaB47D72CaFFc6D95DD2f',
        18,
        'dQUICK',
        'Dragon QUICK',
      ),
      NEW_DQUICK: new Token(
        ChainId.MAINNET,
        '0x42fDB358e6a8526CD0ACaB47D72CaFFc6D95DD2f',
        18,
        'dQUICK',
        'Dragon QUICK',
      ),
      WBTC: new Token(
        ChainId.MAINNET,
        '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
        8,
        'wBTC',
        'Wrapped Bitcoin',
      ),
      DAI: new Token(
        ChainId.MAINNET,
        '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
        18,
        'DAI',
        'Dai Stablecoin',
      ),
      ETHER: new Token(
        ChainId.MAINNET,
        '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
        18,
        'ETH',
        'Ether',
      ),
      CXETH: new Token(
        ChainId.MAINNET,
        '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
        18,
        'cxETH',
        'CelsiusX Wrapped ETH',
      ),
    },
  },
};

export const GlobalData = {
  bases: {
    // used to construct intermediary pairs for trading
    BASES_TO_CHECK_TRADES_AGAINST: {
      ...WETH_ONLY,
      [ChainId.MAINNET]: [
        ...WETH_ONLY[ChainId.MAINNET],
        GlobalValue.tokens.COMMON.USDC,
        GlobalValue.tokens.COMMON.USDT,
        GlobalValue.tokens.COMMON.OLD_QUICK,
        GlobalValue.tokens.COMMON.NEW_QUICK,
        GlobalValue.tokens.COMMON.ETHER,
        GlobalValue.tokens.COMMON.WBTC,
        GlobalValue.tokens.COMMON.DAI,
      ],
    },
    // Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these tokens.
    CUSTOM_BASES: {
      [ChainId.MAINNET]: undefined,
      [ChainId.TESTNET]: undefined,
    },
    // used for display in the default list when adding liquidity
    SUGGESTED_BASES: {
      ...WETH_ONLY,
      [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET]],
    },
    // used to construct the list of all pairs we consider by default in the frontend
    BASES_TO_TRACK_LIQUIDITY_FOR: {
      ...WETH_ONLY,
      [ChainId.MAINNET]: [
        ...WETH_ONLY[ChainId.MAINNET],
        GlobalValue.tokens.COMMON.DAI,
        GlobalValue.tokens.COMMON.USDC,
        GlobalValue.tokens.COMMON.USDT,
        GlobalValue.tokens.COMMON.OLD_QUICK,
        GlobalValue.tokens.COMMON.NEW_QUICK,
        GlobalValue.tokens.COMMON.ETHER,
        GlobalValue.tokens.COMMON.WBTC,
      ],
    },
  },
  pairs: {
    PINNED_PAIRS: {
      [ChainId.MAINNET]: [
        [GlobalValue.tokens.COMMON.USDC, GlobalValue.tokens.COMMON.USDT],
        [GlobalValue.tokens.COMMON.USDC, GlobalValue.tokens.COMMON.DAI],
        [GlobalValue.tokens.COMMON.ETHER, GlobalValue.tokens.COMMON.USDC],
        [GlobalValue.tokens.COMMON.WBTC, GlobalValue.tokens.COMMON.ETHER],
        [WETH[ChainId.MAINNET], GlobalValue.tokens.COMMON.USDT],
        [WETH[ChainId.MAINNET], GlobalValue.tokens.COMMON.USDC],
        [WETH[ChainId.MAINNET], GlobalValue.tokens.COMMON.ETHER],
        [GlobalValue.tokens.COMMON.ETHER, GlobalValue.tokens.COMMON.OLD_QUICK],
      ],
      [ChainId.TESTNET]: undefined,
    },
  },
  analytics: {
    CHART_DURATIONS: [
      GlobalConst.analyticChart.ONE_MONTH_CHART,
      GlobalConst.analyticChart.THREE_MONTH_CHART,
      GlobalConst.analyticChart.SIX_MONTH_CHART,
      GlobalConst.analyticChart.ONE_YEAR_CHART,
      GlobalConst.analyticChart.ALL_CHART,
    ],
    CHART_DURATION_TEXTS: ['1M', '3M', '6M', '1Y', 'All'],
  },
};

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}
