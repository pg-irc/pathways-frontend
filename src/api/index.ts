// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { APIClient, ServiceData } from './api_client';

export { APIClient };

export class API {

    private static instance: APIClient;

    static configure(url: string): void {
        this.instance = new APIClient(url);
    }

    static async searchServices(query: string): Promise<ReadonlyArray<ServiceData>> {
        return this.client.searchServices(query);
    }

    private static get client(): APIClient {
        if (this.instance === undefined) {
            throw new Error('APIClient initialized, API.configure(...) must be called first');
        }
        return this.instance;
    }

}

export class APIError extends Error {}