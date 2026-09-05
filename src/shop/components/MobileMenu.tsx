import { Link, useParams } from 'react-router';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { useAuthStore } from '@/auth/store/auth.store';

const navItems = [
  { to: '/', label: 'All Products' },
  { to: '/gender/men', label: 'Men' },
  { to: '/gender/women', label: 'Women' },
  { to: '/gender/kid', label: 'Kids' },
];

export const MobileMenu = () => {
  const { gender } = useParams();
  const { authStatus, isAdmin, logout } = useAuthStore();

  const isActive = (to: string) => {
    if (to === '/') return !gender;
    return gender === to.replace('/gender/', '');
  };

  return (
    <SheetContent side='left' className='gap-0 p-0'>
      <SheetHeader className='border-b p-4'>
        <CustomLogo />
        <SheetTitle className='sr-only'>Menu</SheetTitle>
      </SheetHeader>

      <nav className='flex-1 overflow-y-auto p-4'>
        <ul className='space-y-1'>
          {navItems.map((item) => (
            <li key={item.to}>
              <SheetClose asChild>
                <Link
                  to={item.to}
                  className={cn(
                    'flex items-center border-l-2 px-4 py-3 text-base font-medium transition-colors',
                    isActive(item.to)
                      ? 'border-primary font-semibold text-primary'
                      : 'border-transparent text-foreground hover:text-primary',
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </nav>

      <SheetFooter className='border-t p-4'>
        {authStatus === 'not-authenticated' ? (
          <SheetClose asChild>
            <Link
              to='/auth/login'
              className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
            >
              Login
            </Link>
          </SheetClose>
        ) : (
          <SheetClose asChild>
            <Button variant='outline' className='w-full' onClick={logout}>
              Logout
            </Button>
          </SheetClose>
        )}

        {isAdmin() && (
          <SheetClose asChild>
            <Link
              to='/admin'
              className={cn(buttonVariants({ variant: 'destructive' }), 'w-full')}
            >
              Admin
            </Link>
          </SheetClose>
        )}
      </SheetFooter>
    </SheetContent>
  );
};