import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { Outlet, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

//export const SearchContext = React.createContext();
function App() {
  //const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/cart' element={<Cart />}/>
              <Route path='/pizza/:id' element={<FullPizza />}/>
              <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
