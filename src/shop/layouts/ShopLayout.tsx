import { Outlet } from 'react-router';

import { CustomHeader } from '../components/CustomHeader';
import { CustomFooter } from '../components/CustomFooter';
import { ScrollToTop } from '@/components/custom/ScrollToTop';

export const ShopLayout = () => {
  return (
    <div className='min-h-screen bg-background'>
      <ScrollToTop />
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </div>
  );
};
