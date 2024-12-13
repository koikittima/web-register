import React from 'react';
import { Navbar, Nav, Text } from 'rsuite';
import OffIcon from '@rsuite/icons/Off';
import AdminIcon from '@rsuite/icons/Admin';
import { useAuth } from '../auth/auth-context';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { logout, user, isLoggedIn } = useAuth();

  const onSubmit = () => {
    navigate('/login');
    logout();
  };

  return (
    <Navbar
      className="xs:px-0 md:px-20 bg-gradient-to-r from-blue-900 to-[#3aa6a3] sticky top-0 z-50"
      appearance="subtle"
    >
      <Navbar.Brand className="!flex items-center">
        <img src="/icons/website.png" alt="website" className="w-[35px] mr-2" />
        <Text size="lg" className="!font-Prompt !text-white">
          WEB REGISTRATION SYSTEM
        </Text>
      </Navbar.Brand>
      {isLoggedIn && (
        <Nav pullRight>
          <Nav.Item icon={<AdminIcon />} className="!text-white text-base !cursor-default" disabled>
            สวัสดี, {user?.user_name}
          </Nav.Item>
          <Nav.Item icon={<OffIcon />} className="!text-white text-base" onClick={() => onSubmit()}>
            ออกจากระบบ
          </Nav.Item>
        </Nav>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
