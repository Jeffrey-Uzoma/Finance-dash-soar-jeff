import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AiFillHome } from "react-icons/ai";
import Transaction_img from "../assets/transaction img.png";
import Profile_logo from "../assets/profile logo.png";
import Company_logo from "../assets/company logo.png";
import Invest_logo from "../assets/invest logo.png";
import Credit_card from "../assets/credit card.png";
import Loans from "../assets/loan.png";
import Privileges from "../assets/my privileges.png";
import Settings_icon1 from "../assets/settings.png";
import Services from "../assets/service.png";
import Search_icon from "../assets/search icon.png";
import Settings_icon2 from "../assets/settings 1.png";
import Notification from "../assets/notification icon.png";
import Click_rectangle from "../assets/click.png";
import CreditCard from "../components/CreditCard";
import TransactionList from "../components/TransactionList";
import ActivityChart from "../components/ActivityChart";
import ExpenseChart from "../components/ExpenseChart";
import QuickTransfer from "../components/QuickTransfer";
import BalanceHistory from "../components/BalanceHistory";
import DP from "../assets/dp.png";

export interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  type: "deposit" | "withdrawal";
}

const mockTransactions = [
  { id: 1, name: "Deposit from my Card", date: "28 January 2021", amount: 850, type: "withdrawal" },
  { id: 2, name: "Deposit Paypal", date: "25 January 2021", amount: 2500, type: "deposit" },
  { id: 3, name: "Jemi Wilson", date: "21 January 2021", amount: 5400, type: "deposit" },
];

const mockActivityData = [
  { day: "Sat", deposit: 250, withdraw: 500 },
  { day: "Sun", deposit: 150, withdraw: 450 },
  { day: "Mon", deposit: 260, withdraw: 320 },
  { day: "Tue", deposit: 370, withdraw: 480 },
  { day: "Wed", deposit: 250, withdraw: 150 },
  { day: "Thu", deposit: 250, withdraw: 400 },
  { day: "Fri", deposit: 340, withdraw: 400 },
];

const mockExpenseData = [
  { name: "Entertainment", value: 30, color: "#334155" },
  { name: "Bill Expense", value: 15, color: "#f97316" },
  { name: "Investment", value: 20, color: "#2563eb" },
  { name: "Others", value: 35, color: "#1f2937" },
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const navigationLinks = [
    { path: "/", icon: <AiFillHome className="w-6 h-6" />, label: "Dashboard" },
    { path: "/transaction", icon: <img src={Transaction_img} className="w-6 h-6" alt="Transaction" />, label: "Transaction" },
    { path: "/profile", icon: <img src={Profile_logo} className="w-6 h-6" alt="Profile" />, label: "Profile" },
    { path: "/investment", icon: <img src={Invest_logo} className="w-6 h-6" alt="Investment" />, label: "Investment" },
    { path: "/cards", icon: <img src={Credit_card} className="w-6 h-6" alt="Credit Cards" />, label: "Credit Cards" },
    { path: "/loans", icon: <img src={Loans} className="w-6 h-6" alt="Loans" />, label: "Loans" },
    { path: "/services", icon: <img src={Services} className="w-6 h-6" alt="Services" />, label: "Services" },
    { path: "/myprivileges", icon: <img src={Privileges} className="w-6 h-6" alt="Privileges" />, label: "Privileges" },
    { path: "/settings", icon: <img src={Settings_icon1} className="w-6 h-6" alt="Settings" />, label: "Settings" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-10 md:z-0 md:static md:block`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img src={Company_logo} className="pt-4" alt="Company Logo" />
            <h1 className="text-xl font-bold pt-4">Sour Task</h1>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
              <Bars3Icon className="w-6 h-6 md:hidden mt-5" />
            </button>
          </div>
        </div>
        <nav className="p-4">
          {navigationLinks.map((link) => (
            <div key={link.path} className="relative">
              {activeLink === link.path && (
                <div className="absolute left-0 top-0 h-full flex items-center" style={{ transform: 'translateX(-16px)' }}>
                  <img
                    src={Click_rectangle}
                    alt=""
                    className="h-8 w-1"
                  />
                </div>
              )}
              <Link
                to={link.path}
                className={`flex items-center p-2 rounded-lg mb-6 gap-5 ${
                  activeLink === link.path ? 'text-slate-900' : 'text-slate-400'
                }`}
                onClick={() => setActiveLink(link.path)}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        {/* Mobile Header */}
        <div className="flex justify-between items-center bg-white py-4 px-6 md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Overview</h1>
          <img src={DP} alt="DP" className="w-8 h-8 rounded-full" />
        </div>

        {/* Search Bar */}
        <div className="bg-white py-4 px-6 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for something"
              className="focus:outline-none rounded-3xl p-3 bg-slate-100 pl-11 text-sm w-full"
            />
            <img src={Search_icon} alt="Search Icon" className="absolute left-4 top-3 w-5 h-5" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center bg-white py-4 px-6">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for something"
                className="focus:outline-none rounded-3xl p-2 bg-slate-100 pl-11 text-sm pt-2.5 pb-2.5"
              />
              <img src={Search_icon} alt="Search Icon" className="absolute left-4 top-2.5 w-5 h-5" />
            </div>
            <div className="p-2 bg-slate-100 rounded-3xl">
              <img src={Settings_icon2} alt="" />
            </div>
            <div className="p-2 bg-slate-100 rounded-3xl">
              <img src={Notification} alt="" />
            </div>
            <img src={DP} alt="DP" className="w-12 h-12 rounded-full" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8 grid grid-cols-1 gap-8">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              <CreditCard
                balance="5,756"
                cardHolder="Eddy Cusuma"
                cardNumber="3778 **** **** 1234"
                validThru="12/22"
              />
            </div>
            <div className="col-span-1">
              <TransactionList transactions={mockTransactions} />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              <ActivityChart data={mockActivityData} />
            </div>
            <div className="col-span-1">
              <ExpenseChart data={mockExpenseData} />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuickTransfer />
            <BalanceHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;