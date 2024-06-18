import React, { createContext, useState, useContext } from 'react';

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null); // Initialize avatar state

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export default AvatarContext;
