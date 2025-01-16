import Chip_card from '../assets/Chip Card.png';
import Chip_card2 from '../assets/Chip card 2.png';
import MasterCard from '../assets/mastercard.png';
import White_master from '../assets/white master.png';

interface CreditCardProps {
  balance: string;
  cardHolder: string;
  cardNumber: string;
  validThru: string;
}

const CreditCard = ({ balance, cardHolder, cardNumber, validThru }: CreditCardProps) => {
  return (
    <div className="min-w-[20em]">
      {/* Header Section */}
      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-semibold">My Cards</h1>
        <h2 className="text-sm font-semibold hover:text-blue-300 cursor-pointer mt-1">See All</h2>
      </div>

      {/* Cards Section - Now with horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 mb-8 min-w-max pb-4">
          {/* First Card */}
          <div className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white rounded-3xl min-w-[20em] max-w-[400px]">
            <div className="flex justify-between items-start p-6 mb-3">
              <div>
                <p className="text-sm opacity-80">Balance</p>
                <p className="text-2xl font-bold">${balance}</p>
              </div>
              <div className="w-12 h-8">
                <img src={Chip_card} alt="Chip Card" />
              </div>
            </div>
            <div className="flex justify-between pr-6 pl-6">
              <div>
                <p className="text-xs opacity-80">CARD HOLDER</p>
                <p className="text-sm">{cardHolder}</p>
              </div>
              <div className="mr-20">
                <p className="text-xs opacity-80">VALID THRU</p>
                <p className="text-sm ml-2">{validThru}</p>
              </div>
            </div>
            <div className="mt-6 flex pl-6 pr-6 pb-3.5 rounded-b-3xl pt-3 justify-between bg-gradient-to-r from-zinc-600 to-zinc-800">
              <p className="text-lg tracking-widest">{cardNumber}</p>
              <img src={MasterCard} alt="MasterCard Logo" />
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-slate-100 shadow-xl shadow-slate-300 text-black rounded-3xl min-w-[20em] max-w-[400px] pb-3">
            <div className="flex justify-between items-start mb-3 p-6">
              <div>
                <p className="text-sm opacity-80">Balance</p>
                <p className="text-2xl font-bold">${balance}</p>
              </div>
              <div className="w-12 h-8">
                <img src={Chip_card2} alt="Chip Card 2" />
              </div>
            </div>
            <div className="flex justify-between pr-6 pl-6">
              <div>
                <p className="text-xs opacity-80">CARD HOLDER</p>
                <p className="text-sm">{cardHolder}</p>
              </div>
              <div className="mr-20">
                <p className="text-xs opacity-80">VALID THRU</p>
                <p className="text-sm ml-2">{validThru}</p>
              </div>
            </div>
            <div className="mt-6 flex pl-6 pr-6 pb-3.7 rounded-b-3xl pt-4 justify-between">
              <p className="text-lg tracking-widest">{cardNumber}</p>
              <img src={White_master} alt="White MasterCard Logo" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default CreditCard;