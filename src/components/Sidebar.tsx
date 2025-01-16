import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  Bars3Icon,
  CreditCardIcon,
  UserIcon,
  ChartBarIcon,
  CogIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/' },
    { icon: BanknotesIcon, label: 'Transactions', path: '/transactions' },
    { icon: UserIcon, label: 'Accounts', path: '/accounts' },
    { icon: ChartBarIcon, label: 'Investments', path: '/investments' },
    { icon: CreditCardIcon, label: 'Credit Cards', path: '/cards' },
    { icon: BuildingLibraryIcon, label: 'Loans', path: '/loans' },
    { icon: WrenchScrewdriverIcon, label: 'Services', path: '/services' },
    { icon: CogIcon, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 h-screen bg-white border-r`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`${!isOpen && 'hidden'} text-xl font-bold text-primary`}>Soar Task</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            <item.icon className="w-6 h-6" />
            <span className={`${!isOpen && 'hidden'} ml-4`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;