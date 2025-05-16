import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';

function Docs() {
  return (
    <div className='xl:mx-12'>
      <div className='mx-auto flex max-w-7xl'>
        <Sidebar />
        <div className='h-fit min-h-screen w-full max-w-fit border-black-light-2 bg-black-light py-16 lg:border-x'>
          <div className='mx-auto w-[85%] md:w-[80%] lg:w-[75%]'>
            <Outlet />
            <Footer />
          </div>
        </div>
        <TableOfContents />
      </div>
    </div>
  );
}

export default Docs;
