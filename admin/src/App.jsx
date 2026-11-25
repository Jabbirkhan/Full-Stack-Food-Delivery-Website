import React, { useContext, lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Context } from './context/context';
import Login from './pages/login';
import Loader from './components/loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from './components/errorBoundary';

const Home = lazy(()=>import('./pages/home'))
const AddProduct = lazy(() => import('./pages/addProduct'));
const Products = lazy(() => import('./pages/products'));
const Orders = lazy(() => import('./pages/orders'));
const UpdateProduct = lazy(() => import('./pages/updateProduct'));
const AdminForgetPassword = lazy(() => import('./pages/adminForgetPassword'));
const NotFound = lazy(() => import('./pages/notFound'));

const App = () => {

  const { authState } = useContext(Context);
  const location = useLocation();

  if (authState === 'checking') {
    return <Loader />
  }

  if (authState === 'unauthenticated' && location.pathname !== '/login' && location.pathname !== '/admin-forget-password') {
    return <Navigate to='/login' replace />
  }

  return (
    <div>
      <ToastContainer />
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => window.location.reload()}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route index element={<AddProduct />} />
              <Route path='products' element={<Products />} />
              <Route path='updateproduct/:id' element={<UpdateProduct />} />
              <Route path='orders' element={<Orders />} />
              <Route path='login' element={authState !== 'authenticated' ? <Login /> : <Navigate to='/' replace />} />
              <Route path='*' element={<NotFound />} />
              <Route path='admin-forget-password' element={<AdminForgetPassword />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
