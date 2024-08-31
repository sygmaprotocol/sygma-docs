import React, { createContext, useContext, useEffect, useState } from 'react';
import { Config, Environment } from '@buildwithsygma/core';

type ConfigContextType = {
    config: Config | null;
    loading: boolean;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: any, environment: Environment }> = ({ children, environment }) => {
    const [config, setConfig] = useState<Config | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializeConfig = async () => {
            try {
                const config = new Config();
                await config.init(environment);
                setConfig(config);
            } catch (error) {
                console.error('Error initializing config: ', error);
            } finally {
                setLoading(false);
            }
        };

        initializeConfig();
    }, [environment]);

    return (
        <ConfigContext.Provider value={{ config, loading }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = (): ConfigContextType => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
