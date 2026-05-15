import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function SendMoney() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 1. Dynamic URL Parameter Extraction
  const id = searchParams.get("id");
  const name = searchParams.get("name") || "Registered User";

  // 2. React Form State Management
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Parse name strings cleanly to generate profile monogram initials
  const initials = name
    .trim()
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // 3. Secure Transaction Ledger Submission Logic
  async function handleTransfer(e) {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid transfer amount.");
      return;
    }

    setIsProcessing(true);
    const token = localStorage.getItem("token");

    try {
      // Axios request routed securely to your transactional API architecture
      await axios.post(
        `${API_BASE}/account/transfer`,
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Successfully transferred ₹${Number(amount).toFixed(2)} to ${name}!`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Transfer transaction declined:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Transaction declined. Please verify your liquid wallet balance.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div 
      /* Hardcoding the universal premium sans-serif typography stack */
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 sm:p-6 lg:p-8 relative overflow-hidden"
    >
      {/* Decorative Premium Light Leaks */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        
        {/* Component Header Block */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Send Money
          </h2>
          <p className="mt-1.5 text-sm text-slate-500 font-medium">
            Execute a real-time peer-to-peer settlement
          </p>
        </div>

        {/* Core Card Container */}
        <div className="bg-white/80 backdrop-blur-md px-6 py-8 shadow-xl shadow-slate-200/50 border border-slate-200/60 rounded-3xl sm:px-10">
          
          {/* Target Recipient Detail Row */}
          <div className="mb-8 p-4 bg-gradient-to-r from-slate-50 to-slate-100/40 rounded-2xl border border-slate-200/50 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-black text-base shadow-2xs">
              {initials || "U"}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recipient Profile</p>
              <p className="text-lg font-black text-slate-900 mt-0.5 leading-none">{name}</p>
              <p className="text-[11px] font-mono text-slate-400 mt-2 bg-slate-200/60 px-2 py-0.5 rounded border border-slate-300/30 w-fit select-all">
                ID: {id ? id.toUpperCase() : "---------"}
              </p>
            </div>
          </div>

          <form onSubmit={handleTransfer} className="space-y-6">
            
            {/* Amount Field Input Unit */}
            <div>
              <label htmlFor="amount" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Amount to Transfer
              </label>
              <div className="relative mt-2.5 rounded-2xl shadow-xs">
                {/* Indian Rupee Icon Prefix matching your Dashboard Currency */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-slate-400 text-xl font-bold">₹</span>
                </div>
                
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="1"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-9 pr-14 text-slate-900 text-2xl font-black placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                  placeholder="0.00"
                  required
                  disabled={isProcessing}
                />
                
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-slate-400 text-xs font-bold tracking-wider">INR</span>
                </div>
              </div>
            </div>

            {/* Form Actions Clustered Footers */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className={`flex w-full justify-center text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-xl text-sm px-5 py-3.5 text-center shadow-md shadow-blue-500/10 transition-all cursor-pointer ${
                  isProcessing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? "Processing Ledger Settlement..." : "Confirm & Pay"}
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                disabled={isProcessing}
                className="flex w-full justify-center text-slate-500 bg-transparent hover:bg-slate-100/60 font-semibold rounded-xl text-sm px-5 py-2.5 text-center transition-all cursor-pointer border border-transparent hover:border-slate-200/50"
              >
                Cancel & Go Back
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}