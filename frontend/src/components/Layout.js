import { Outlet, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <Toaster/>
      <div className="bg-oscuro min-h-screen flex justify-center">
        <div>
            <div className="flex justify-center m-3">
            <Link className="m-2 font-mono text-white" to="/"><AiFillHome size={30}/></Link>
            </div>
        <Outlet />
        </div>
    </div>
    </>
  )
};

export default Layout;
