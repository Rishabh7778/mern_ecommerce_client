import AuthLayout from './components/auth/layout';
import { Routes, Route } from 'react-router-dom';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingHome from './pages/shopping-view/home';
import CheckAuth from './components/common/checkauth';
import { checkAuth } from './store/auth-slice';
import UnAuthPage from './pages/unauth-page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import SearchProducts from './pages/shopping-view/search';


function App() {
  const { user, isAuthenticated, isLoading} = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>} 
          />

       


        {/* Auth Routes */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping Route */}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
        
          <Route path='account' element={<ShoppingAccount/>}/>
          <Route path='checkout' element={<ShoppingCheckout/>}/>
          <Route path='listing' element={<ShoppingListing/>}/>
          <Route path='home' element={<ShoppingHome/>}/>
          <Route path='search' element={<SearchProducts/>}/>


        </Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/unauth-page' element={<UnAuthPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
