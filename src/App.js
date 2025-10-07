import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddressForm from './components/AddressForm';
import MainLayout from './MainLayout';
import './App.css';

const App = () => {
  return (
    <Routes>
     <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/address" element={<AddressForm />} />
      </Route>
     </Routes>
    
  );
};

export default App;
