import React, { createContext, useContext, useState } from 'react';
import { Message, Container } from 'rsuite';

const MessageContext = createContext(undefined);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      <Container>
        {children}
        {message && (
          <Message type={message.type} closable showIcon>
            {message.content}
          </Message>
        )}
      </Container>
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
