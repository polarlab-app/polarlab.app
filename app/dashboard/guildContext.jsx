'use client';
import { createContext, useContext, useState } from 'react';

const GuildContext = createContext();

export const useGuild = () => useContext(GuildContext);

export const GuildProvider = ({ children }) => {
    const [selectedGuild, setSelectedGuild] = useState(null);

    return <GuildContext.Provider value={{ selectedGuild, setSelectedGuild }}>{children}</GuildContext.Provider>;
};
