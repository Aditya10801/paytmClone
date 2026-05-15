import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div 
      /* Hardcoded geometric sans-serif font stack */
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 text-slate-900 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[45rem] h-[45rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Navigation bar */}
      <header className="w-full z-50 bg-white/40 backdrop-blur-md border-b border-slate-200/60 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              P
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">PayTM</span>
          </div>

          {/* Nav Links Cluster */}
          <div className="flex items-center gap-4">
            <Link 
              to="/signin" 
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl px-4 py-2.5 shadow-sm transition-all active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Content Framework Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center z-10 flex-grow flex flex-col justify-center items-center">
        
        {/* Decorative Top Pill Tag */}
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 mb-6 shadow-2xs">
          🚀 Next-Generation Financial System
        </div>

        {/* Primary Catchy Value Proposition Statement */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-none max-w-2xl">
          The simpler way to send and manage <span className="text-blue-600">liquid funds.</span>
        </h1>
        
        <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-xl font-medium leading-relaxed">
          Experience instant digital wallet payments with real-time peer ledger settlements, zero hidden overheads, and bank-grade system security.
        </p>

        {/* Call To Action Interactivity Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            to="/signup"
            className="w-full sm:w-auto text-center text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] font-bold rounded-xl text-base px-8 py-4 shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
          >
            Open Free Wallet
          </Link>
          <Link
            to="/signin"
            className="w-full sm:w-auto text-center text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.99] font-bold rounded-xl text-base px-8 py-4 shadow-xs transition-all cursor-pointer"
          >
            Access Dashboard
          </Link>
        </div>

        {/* Minimal High-End Feature Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-24 max-w-3xl">
          <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 text-left shadow-2xs">
            <div className="text-xl mb-2">⚡</div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Instant Settlement</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Funds route globally across secure database ledgers instantly.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 text-left shadow-2xs">
            <div className="text-xl mb-2">🔒</div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Cryptographic Security</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Every transfer session is authorized using rigid token architectures.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 text-left shadow-2xs">
            <div className="text-xl mb-2">💰</div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">Starter Balance</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Get initialized instantly with dynamic randomized wallet credits on signup.</p>
          </div>
        </div>

      </main>

      {/* Footer Branding Row */}
      <footer className="w-full border-t border-slate-100 py-6 bg-white/20 z-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-slate-400 font-semibold tracking-wide uppercase">
          © PayTM Digital Network System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}