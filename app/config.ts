import dotenv from "dotenv"
dotenv.config()

export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN
export const RPC_URL = process.env.RPC_URL;

export const FORTUNE_TELLER_ABI = process.env.FORTUNE_TELLER_ABI
export const FORTUNE_TELLER_ADDRESS_SEPOLIA = process.env.FORTUNE_TELLER_ADDRESS_SEPOLIA
export const FORTUNE_TELLER_ADDRESS_OP_SEPOLIA = process.env.FORTUNE_TELLER_ADDRESS_OP_SEPOLIA
export const FORTUNE_TELLER_ADDRESS = FORTUNE_TELLER_ADDRESS_OP_SEPOLIA

export const OP_SEPOLIA_CHAIN_ID = '11155420';
export const SEPOLIA_CHAIN_ID = '11155111';
export const CHAIN_ID = OP_SEPOLIA_CHAIN_ID;

export const EXPLORERS = {
  '11155420' : 'https://sepolia-optimism.etherscan.io/',
  '11155111' : 'https://sepolia.etherscan.io/',
}