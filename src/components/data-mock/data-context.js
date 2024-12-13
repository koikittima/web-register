import React, { createContext, useState, useContext } from 'react';
import { mockUsers } from './mock-data';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const defaultData = mockUsers();
  const [dataSource, setDataSource] = useState(defaultData);

  const addData = (newData) => {
    setDataSource((prevData) => [...prevData, newData]);
  };

  const updateData = (newData) => {
    setDataSource(newData);
  };

  return <DataContext.Provider value={{ dataSource, addData, updateData }}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
