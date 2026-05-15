import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Dashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [userInfo, setuserInfo] = useState({});
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/signin");
                return;
            }
            try {
                const accountBalance = await axios.get(`${API_BASE}/account/balance`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log("Account Balance:", accountBalance.data.balance);
                setBalance(accountBalance.data.balance);

                const userInfo = await axios.get(`${API_BASE}/user/profile`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log("User Info:", userInfo.data);
                setuserInfo(userInfo.data);

                const contacts = await axios.get(`${API_BASE}/user/bulk`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log("Contacts:", contacts.data.user);
                setContacts(contacts.data.user);
            } catch (err) {
                console.error("Dashboard data fetch failed:", err);
            }
        }

        checkAuth();
    }, [navigate]);

  return (
    <div 
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden"
    >
      {/* Dynamic Ambient Background Vector Lighting */}
      <div className="absolute top-[-20%] right-[-10%] w-[55rem] h-[55rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navigation Header */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo Group */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
                P
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">PayTM</span>
            </div>
            
            {/* User Profile Right Controls */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  {userInfo.firstName || ""} {userInfo.lastName || ""}
                </p>
                <p className="text-[11px] font-semibold text-slate-400 mt-1 tracking-wide uppercase">
                  {userInfo.username ? userInfo.username.split('@')[0] : "Account"}
                </p>
              </div>
              
              {/* Monogram Badge */}
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200/40 text-slate-800 flex items-center justify-center border border-slate-200 font-bold shadow-xs">
                <span className="tracking-wider text-xs">
                  {userInfo.firstName?.charAt(0) || "U"}
                  {userInfo.lastName?.charAt(0) || ""}
                </span>
              </div>

              {/* Logout Button */}
              <button 
                onClick={() => { localStorage.removeItem("token"); navigate("/signin"); }}
                className="h-8 w-8 rounded-lg bg-slate-100/60 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200/60 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Primary Layout Frame */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10 relative">
        
        {/* Modern Welcome Header Banner */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Hello, {userInfo.firstName || "Welcome"}
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Simplify your transactions and check real-time account settlements.</p>
          </div>
          
          <div className="inline-flex h-fit w-fit items-center gap-1.5 bg-emerald-50/60 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-700 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Network Online
          </div>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Mesh Wallet Card Structure */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-7 text-white shadow-xl shadow-slate-950/20 border border-slate-800 relative overflow-hidden h-[260px] flex flex-col justify-between group">
            <div className="absolute right-[-10%] bottom-[-10%] w-56 h-56 bg-gradient-to-tr from-blue-600/20 to-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-80">Available Liquid Balance</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-bold text-slate-300">₹</span>
                  <span className="text-4xl font-black tracking-tight">
                    {typeof balance === 'number' ? balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                  </span>
                </div>
              </div>
              <div className="h-9 w-14 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center font-bold text-[10px] tracking-wider text-slate-300 uppercase">
                Primary
              </div>
            </div>

            <div className="flex justify-between items-end z-10 border-t border-white/5 pt-4">
              <div className="w-full">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Account Identification Hash</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs font-mono text-slate-300 tracking-wide select-all">
                    {userInfo._id ? `PAYTM-${userInfo._id.slice(-8).toUpperCase()}` : "initializing..."}
                  </p>
                  <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 font-mono">
                    MERN-V1
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Interface Contacts Section */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/30">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Instant Money Transfer</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Select a peer contact below to configure safe instant ledger routing.</p>
            </div>

            {/* Contacts Loop */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {contacts.length === 0 ? (
                <div className="text-center py-12 text-sm text-slate-400 font-medium border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <span className="text-2xl block mb-2">👥</span>
                  No registered peer contacts linked yet
                </div>
              ) : (
                contacts.map((contact) => {
                  return (
                    <div 
                      key={contact._id} 
                      className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/80 hover:border-slate-200 hover:shadow-xs transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm uppercase shadow-2xs group-hover:scale-105 transition-transform">
                          {contact.firstName?.charAt(0) || "U"}{contact.lastName?.charAt(0) || ""}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {contact.firstName} {contact.lastName}
                          </p>
                          <p className="text-xs font-semibold text-slate-400 mt-0.5">
                            {contact.username || "System Peer"}
                          </p>
                        </div>
                      </div>

                      {/* WIRED BUTTON: Passes the context values right to your SendMoney route path parameters */}
                      <button
                        type="button"
                        onClick={() => navigate(`/send?id=${contact._id}&name=${contact.firstName} ${contact.lastName}`)}
                        className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white active:scale-95 border border-transparent rounded-xl px-4 py-3 transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer shadow-2xs"
                      >
                        Send Funds
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}