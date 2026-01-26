import { ROUTE_PATH } from '@/app/routes/Router';
import { Button } from '@/shared/components/shadcn/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Help', href: '#help' },
];

const LandingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const MobileMenu = (
    <div className="md:hidden absolute top-full left-0 w-full bg-gray-100 shadow-md flex flex-col items-center py-4 space-y-4 px-6">
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={() => handleNavClick(item.href)}
          className="text-gray-700 hover:text-boost-blue text-lg transition w-full"
        >
          {item.label}
        </button>
      ))}

      <Button
        onClick={() => {
          navigate(ROUTE_PATH.LOGIN);
          setIsOpen(false);
        }}
        variant="defaultBoost"
        className="w-full"
      >
        Sign In
      </Button>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-screen bg-gray-100 shadow-sm z-50">
      <div className="px-4 sm:px-6 xl:px-0 max-w-7xl mx-auto flex items-center justify-between py-3">
        <button
          className="text-xl font-bold text-boost-blue cursor-pointer"
          onClick={() => handleNavClick('#home')}
        >
          BOOST
        </button>

        <div className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-gray-700 hover:text-boost-blue transition cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            onClick={() => navigate(ROUTE_PATH.LOGIN)}
            variant="defaultBoost"
            className="rounded-full"
          >
            Sign In
          </Button>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && MobileMenu}
    </nav>
  );
};

export default LandingNavigation;
