import React, { createContext, useState, useContext } from 'react';
import { useMessage } from '../widget/message';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showMessage } = useMessage();

  const login = (username) => {
    const checkUsers = {
      admin: { password: 'admin', rowAction: 'admin' },
      user: { password: 'user', rowAction: 'user' },
    };
    const userDetails = checkUsers[username.user_name];

    if (userDetails && username.password === userDetails.password) {
      username.rowAction = userDetails.rowAction;
      setUser(username);
      setIsLoggedIn(true);
      showMessage('success', 'เข้าสู่ระบบสําเร็จ');
    } else {
      setUser(null);
      setIsLoggedIn(false);
      showMessage('error', 'กรุณาระบุ ชื่อผู้ใช้ และรหัสผ่าน ให้ถูกต้อง');
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
