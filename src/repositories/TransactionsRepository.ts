import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const finalBalance = this.transactions.reduce((acc, curr) => {
      return {
        income: curr.type === 'income' ? curr.value + acc.income : acc.income,
        outcome:
          curr.type === 'outcome' ? curr.value + acc.outcome : acc.outcome,
        total: 0,
      };
    }, balance);

    finalBalance.total = finalBalance.income - finalBalance.outcome;
    return finalBalance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
