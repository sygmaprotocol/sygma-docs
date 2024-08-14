import React, { ReactNode } from 'react';
import { ConfigProvider } from './ConfigContext';
import { Environment } from '@buildwithsygma/sygma-sdk-core';

type EnvironmentComponentProps = {
    environment: Environment;
    children: ReactNode;
};

const EnvironmentComponent: React.FC<EnvironmentComponentProps> = ({ children, environment }) => {
    return (
        <ConfigProvider environment={environment}>
            {children}
        </ConfigProvider>
    );
};

export default EnvironmentComponent;
