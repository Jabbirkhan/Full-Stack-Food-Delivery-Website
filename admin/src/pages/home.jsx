import SideBar from '../components/sidebar'
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {

  const location = useLocation();

  return (
    <div className='flex justify-between items-start gap-2 bg-[#fff8f7]'>
          <div>
              <SideBar />
          </div>
          <div className={`flex-1 ${location.pathname === '/login' || location.pathname === '/admin-forget-password' ? 'sm:w-0' : 'sm:ml-52'} min-h-screen`}>
              <Outlet />
          </div>
    </div>
  )
}

export default Home
