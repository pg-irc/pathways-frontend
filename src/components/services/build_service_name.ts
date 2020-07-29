export const buildServiceName = (organizationName: string, serviceName: string): string => (
    serviceName === organizationName ? serviceName : `${organizationName} - ${serviceName}`
);
