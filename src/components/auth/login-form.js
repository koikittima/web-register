import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth-context';
import { Form, Text, Button, Schema } from 'rsuite';
import TextField from '../custom-form/text-field';

const LoginForm = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef();
  const [username, setUsername] = useState({
    user_name: '',
    password: '',
  });
  const { StringType } = Schema.Types;

  const model = Schema.Model({
    user_name: StringType().isRequired('กรุณาระบุชื่อผู้ใช้'),
    password: StringType().isRequired('กรุณาระบุรหัสผ่าน'),
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      setUsername({
        user_name: '',
        password: '',
      });
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = () => {
    if (!formRef.current.check()) {
      return;
    } else {
      login(username);
    }
  };

  return (
    <div>
      {!isLoggedIn && (
        <div className="flex justify-center items-center h-screen w-full">
          <div className="grid grid-cols-2 gap-4  border-solid border-1 border-blue-950 shadow-md rounded-md p-5">
            <div className="xs:col-span-2 sm:col-span-2 md:col-span-1">
              <Text size="lg" className="font-bold  !font-Prompt !mb-2.5 ">
                Login
              </Text>
              <Form ref={formRef} formValue={username} onChange={(value) => setUsername(value)} model={model}>
                <TextField name="user_name" label="Username" placeholder="ระบุชื่อผู้ใช้" isRequired />
                <TextField
                  name="password"
                  label="Password"
                  placeholder="ระบุรหัสผ่าน"
                  type="password"
                  autoComplete="off"
                  isRequired
                />
              </Form>
              <Button appearance="primary" className="!mt-5" onClick={() => onSubmit()}>
                เข้าสู่ระบบ
              </Button>
            </div>
            <div className="xs:col-span-2 sm:col-span-2 md:col-span-1">
              <img src="/icons/website.png" alt="website" className="w-[250px]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
