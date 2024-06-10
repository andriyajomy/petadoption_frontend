import { Routes,Route } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';
// import PetList from './Pages/PetList';
import Admin_pets from './Pages/Admin_pets';
import User_pet from './Pages/User_pet';
import WishList from './Pages/WishList';
import Cart from './Pages/Cart';
import PageNotFound from './Pages/PageNotFound';
import AllBookings from './Pages/AllBookings';



function App() {
  return (
    <div className="App">
   
   <Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/login' element={<Register/>}/>
<Route path='/register' element={<Register register/>}/>
{/* <Route path='/petlist' element={<PetList/>}/> */}
<Route path='/admin' element={<Admin_pets/>}/>
<Route path ='/user' element={<User_pet/>}/>
<Route path='/wishlist' element={<WishList/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='*' element={<PageNotFound/>}/>
<Route path='/bookings' element={<AllBookings/>}/>
   </Routes>
   
   
   
    </div>
  );
}

export default App;
