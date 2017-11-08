import ServiceProvidersStore from 'stores/remote/ServiceProvidersStore';
import PathwaysStore from 'stores/remote/PathwaysStore';

const serviceProvidersStore = new ServiceProvidersStore();
const pathwaysStore = new PathwaysStore();

export default {
    serviceProvidersStore,
    pathwaysStore
};
