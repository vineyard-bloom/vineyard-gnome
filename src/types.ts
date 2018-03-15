export interface Address {
 address: string
}

export interface EthereumTransaction {
 to?: number
 from?: number
}

export interface TokenTransferRecord {
 any: any
}

export interface AddressHistory {
 transactions: EthereumTransaction[]
 tokenTransactions: TokenTransferRecord[]
}

export interface AddressResponse {
 differences: any[],
 same: any[],
 onlyFirst: any[],
 onlySecond: any[],
}
