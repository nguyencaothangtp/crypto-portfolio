export interface RateInterface {
  tokens: TokenInterface[];
}

export interface TokenInterface {
  name: string;
  prices: PriceInterface[];
}

export interface PriceInterface {
  name: string;
  value: number;
}

