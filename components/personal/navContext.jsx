'use client';
import { createContext, useContext, useState } from 'react';

const NavContext = createContext();

export const useNav = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
    const [openStatus, setOpenStatus] = useState(null);

    return <NavContext.Provider value={{ openStatus, setOpenStatus }}>{children}</NavContext.Provider>;
};
