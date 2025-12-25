import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashBoard from './pages/DashBoard';
import Contact from './pages/Contact';
import About from './pages/About';
import SignUp from './pages/Signup';
import FooterComponent from './components/Footer';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}
