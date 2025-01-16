import { useState } from 'react'
import Lavia from '../assets/livia.png'
import Randy from '../assets/randy.png'
import Workman from '../assets/workman.png'
import SendArrow from '../assets/send arrow.png'
import QuickArrow from '../assets/quick arrow.png'

const QuickTransfer = () => {
  const [inputValue, setInputValue] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSend = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a number!');
    } else {
      setStatusMessage('Sent!');
    }
  };
  return (
    <div className="min-w-[25em]">
      <h2 className="text-xl font-semibold mb-4">Quick Transfer</h2>
      <div className='bg-white rounded-xl p-6 max-w-[32em]'>
      <div className=" flex space-x-4 mb-6 gap-6 overflow-x-auto">
        {/* Contact 1 */}
        <div className="flex flex-col items-center min-w-[80px]">
          <img src={Lavia} alt="Person 1" className="w-20 h-20 rounded-full" />
          <p className="text-sm mt-2 font-extrabold">Livia Bator</p>
          <p className="text-xs text-gray-500 font-extrabold">CEO</p>
        </div>
        {/* Contact 2 */}
        <div className="flex flex-col items-center min-w-[80px]">
          <img src={Randy} alt="Person 2" className="w-20 h-20 rounded-full" />
          <p className="text-sm mt-2">Randy Press</p>
          <p className="text-xs text-gray-500">Director</p>
        </div>
        {/* Contact 3 */}
        <div className="flex flex-col items-center min-w-[80px]">
          <img src={Workman} alt="Person 3" className="w-20 h-20 rounded-full" />
          <p className="text-sm mt-2">Workman</p>
          <p className="text-xs text-gray-500">Designer</p>
        </div>
        <img src={QuickArrow} className='items-center transform scale-x-120 acale-y-20'/>
      </div>
      <div className="flex space-x-4 items-center mt-4 mb-3">
        <label htmlFor="">Write Amount</label>
        <div className='relative flex'>
          <input
            type="number"
            placeholder="$525.50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-3xl bg-slate-200 outline-none pr-24 max-w-[13em] appearance-none"
          />
          <div className=''>
            <button onClick={handleSend} className="px-6 py-3 bg-zinc-800 text-white rounded-3xl flex-1 items-center absolute inset-x-32 pr-24 hover:bg-slate-400">
              Send
            </button>
            <img src={SendArrow} alt="" className='flex absolute top-3 -right-[7%] ml-5'/>
          </div>
          {statusMessage && <p className="mt-6 ml-64 absolute text-green-500">{statusMessage}</p>}
        </div>
        
      </div>
      </div>
      
    </div>
  );
};

export default QuickTransfer;