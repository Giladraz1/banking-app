export interface Transaction {
  senderAccountName?: string;
  receiverAccountNumber: string;
  amount: number;
  comment?: string;
}
