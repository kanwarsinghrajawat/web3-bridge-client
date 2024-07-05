export interface Token {
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
}

export interface SupportedChain {
  chainId: number;
  name: string;
}
