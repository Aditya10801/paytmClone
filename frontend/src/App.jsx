import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'; // 1. Imported the Landing page
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';

function App() {
  return (
   <BrowserRouter>
        <Routes>
          {/* 2. Added root route for the Landing page */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;