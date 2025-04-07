export interface OperatorData {
  operatorId: number;
  operatorName: string;
  publicKey: string;
  role: string;
  currencies: Record<string, any>;
  players: number;
  channels: Record<string, any>;
  bet: number;
  win: number;
  active: boolean;
  accountEnv: string;
  products: Record<string, any>;
  tokens: { token: string }[];
  password: string;
  bannedGames: any[];
  bannedProducts: any[];
  promos: Record<string, any>;
}

