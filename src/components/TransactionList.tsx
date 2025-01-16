import Depo_client from '../assets/deposite withdraw.png'
import Depo_pal from '../assets/deposit paypal.png'
import Jemi from '../assets/jemi.png'

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div className="relative min-w-[340px] max-w-[460px] pr-2 ml-[-0.1em]">
      <h2 className="text-xl font-semibold mb-9">Recent Transactions</h2>
      <div className="space-y-4 bg-white rounded-xl p-6">
        {transactions.map((transaction) => {
          let imageSrc;
          if (transaction.name === 'Deposit from my Card') {
            imageSrc = Depo_client; // Image for deposit with card
          } else if (transaction.name === 'Deposit Paypal') {
            imageSrc = Depo_pal; // Image for deposit with PayPal
          } else if (transaction.name === 'Jemi Wilson') {
            imageSrc = Jemi; // Image for Jemi Wilson
          }

          return (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={imageSrc} className="w-10 h-10" alt={transaction.name} />
                <div className="ml-3">
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <span className={`font-medium ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.type === 'deposit' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;