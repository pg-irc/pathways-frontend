// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { APIClient, APIResponse, MaybeLocation } from './api_client';
export { APIClient };
import { Id } from '../stores/tasks';

// TODO this is really a namespace with a global variable in it
export class API {

    private static apiClient: APIClient = undefined;

    static configure(url: string): void {
        console.log(`Using URL: ${url}`);
        this.apiClient = new APIClient(url);
    }

    static async getServerVersion(): Promise<APIResponse> {
        return await this.client().serverVersion();
    }

    static async findRelatedServices(taskId: Id, location: MaybeLocation): Promise<APIResponse> {
        return await this.client().findRelatedServices(taskId, location);
    }

    private static client(): APIClient {
        if (this.apiClient === undefined) {
            throw new Error('APIClient initialized, API.configure(...) must be called first');
        }
        return this.apiClient;
    }

}