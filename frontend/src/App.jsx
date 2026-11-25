import React, { useContext, lazy, Suspense } from 'react'
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Context } from './context/context';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Loader from './components/loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from './components/errorBoundary';
import UserForgetPassword from './pages/userForgetPassword';

const Home = lazy(() => import('./pages/home'));
const Products = lazy(() => import('./pages/products'));
const Order = lazy(() => import('./pages/order'));
const Cart = lazy(() => import('./pages/cart'));
const Detail = lazy(() => import('./pages/detail'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const Checkout = lazy(() => import('./pages/checkout'));
const Verify = lazy(() => import('./pages/verify'));
const VerifyEmail = lazy(() => import('./pages/verifyEmail'));
const PrivacyPolicy = lazy(() => import('./pages/privacyPolicy'));
const TermsOfService = lazy(() => import('./pages/termsOfService'));
const NotFound = lazy(() => import('./pages/notFound'));


const App = () => {

  const { authState } = useContext(Context);
  const location = useLocation();

  if (authState === 'checking') {
    return <Loader />
  }

  if (authState === 'unauthenticated' && location.pathname !== '/login' && location.pathname !== '/user-forget-password' && location.pathname !== '/privacy-policy' && location.pathname !== '/terms-of-service') {
    return <Navigate to='/login' replace />
  }

  return (
    <section aria-label='main-body' className='bg-[#fff8f7]'>
      <Navbar />
      <ToastContainer />
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => window.location.reload()}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/order' element={<Order />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={authState !== 'authenticated' ? <Login /> : <Navigate to='/' replace />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/user-forget-password' element={<UserForgetPassword />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </section>
  )
}

export default App
