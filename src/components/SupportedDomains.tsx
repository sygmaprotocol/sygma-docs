import React from 'react';
import { useConfig } from './ConfigContext';
import { capName } from '../utils';

const SupportedDomains: React.FC = () => {
  const { config, loading } = useConfig();

  if (loading || !config || !config.environment) {
    return <div>Loading domains...</div>;
  }

  return (
      <table>
        <thead>
        <tr>
          <th>Network Name</th>
          <th>Type</th>
          <th>Sygma Domain ID</th>
          <th>Chain ID</th>
        </tr>
        </thead>
        <tbody>
        {config.environment.domains.map((domain, index) => (
            <tr key={index}>
              <td>{capName(domain.name)}</td>
              <td>{domain.type.toUpperCase()}</td>
              <td>{domain.id}</td>
              <td>{domain.chainId}</td>
            </tr>
        ))}
        </tbody>
      </table>
  );
};

export default SupportedDomains;
