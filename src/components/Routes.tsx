import React, { useEffect, useState } from 'react';
import { useConfig } from './ConfigContext';
import { Resource, ResourceType } from '@buildwithsygma/sygma-sdk-core';
import {capLongName} from "@site/src/utils";

type Route = {
    fromDomainId: number;
    toDomainId: number;
    resourceId: string;
    type: string;
};

type Domain = {
    id: string;
    name: string;
};

type DomainMetadata = {
    [key: number]: {
        url: string;
    };
};

const RoutesByDomain: React.FC = () => {
    const { config, loading: configLoading } = useConfig();
    const [selectedDomain, setSelectedDomain] = useState<string>('');
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [metadata, setMetadata] = useState<DomainMetadata>({});
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await fetch('https://api.test.buildwithsygma.com/api/domains/metadata', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    },
                });
                const data = await response.json();
                setMetadata(data);
            } catch (error) {
                console.error('Error fetching metadata: ', error);
            }
        };

        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchRoutes = async (domainId: string) => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.test.buildwithsygma.com/api/routes/from/${domainId}?resourceType=any`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    },
                });
                const data = await response.json();
                setRoutes(data.routes);
            } catch (error) {
                console.error('Error fetching routes: ', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchResources = async (domainID: string) => {
            if (config) {
                console.log(config)
                const resources = config.getDomainConfig(Number(domainID)).resources;
                console.log(resources)
                setResources(resources);
            }
        };

        if (selectedDomain) {
            fetchRoutes(selectedDomain);
            fetchResources(selectedDomain);
        }
    }, [selectedDomain, config]);

    if (configLoading || !config) {
        return <div>Loading domains...</div>;
    }

    const domains: Domain[] = config.environment.domains.map((domain) => ({
        id: domain.id.toString(),
        name: domain.name,
    } as Domain));

    const groupedRoutes = routes.reduce((acc, route) => {
        if (!acc[route.resourceId]) {
            acc[route.resourceId] = [];
        }
        acc[route.resourceId].push(route);
        return acc;
    }, {} as { [key: string]: Route[] });

    const getResourceById = (resourceId: string): Resource => {
        return resources.find((resource) => resource.resourceId === resourceId);
    };

    const getDomainImg = (domainID: number): string => {
        const dom = config.getDomainConfig(Number(domainID))
        console.log(domainID)
        console.log(metadata)
        return metadata[domainID]?.url

    }

    return (
        <div>
            <label htmlFor="domain-select">Select Domain:</label>
            <select
                id="domain-select"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
            >
                <option value="">--Select a domain--</option>
                {domains.map((domain) => (
                    <option key={domain.id} value={domain.id}>
                        {capLongName(domain.name)}
                    </option>
                ))}
            </select>
            {selectedDomain!="" ?
            <img src={metadata[config.chainId]?.url} alt={`${selectedDomain} icon`}
                 width="20" height="20"/> : <span></span>}
    {
        loading ? (
            <div>Loading routes...</div>
        ) : (
            <table>
                <thead>
                <tr>
                    <th>Resource ID</th>
                    <th>Symbol</th>
                        <th>Number of Routes</th>
                        <th>Type</th>
                        <th>Routes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(groupedRoutes).map((resourceId) => {
                        const resource = getResourceById(resourceId);
                        return (
                            <React.Fragment key={resourceId}>
                                <tr>
                                    <td>{resourceId}</td>
                                    <td>{resource?.symbol.toUpperCase() || 'N/A'}</td>
                                    <td>{groupedRoutes[resourceId].length}</td>
                                    <td>{resource?.type}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>From Domain ID</th>
                                                <th>To Domain</th>
                                                <th>To Domain ID</th>
                                                <th>Type</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {groupedRoutes[resourceId].map((route, index) => (
                                                <tr key={index}>
                                                    <td>{route.fromDomainId}</td>
                                                    <td><img src={getDomainImg(route.toDomainId)}
                                                             alt={`${route.toDomainId} icon`}
                                                             width="20" height="20"/></td>
                                                    <td>{route.toDomainId}</td>
                                                    <td>{route.type.toUpperCase()}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RoutesByDomain;
