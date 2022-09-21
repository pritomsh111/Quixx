import { Routes, Route } from 'react-router-dom';

import Form from './assets/components/Form/Form';
import PasswordShow from './assets/components/PasswordShow/PasswordShow';
import Training from './assets/components/Training/Training';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/passwordShow" element={<PasswordShow />} />
      <Route path="/training" element={<Training />} />
    </Routes>
  );
}

export default App;