// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { APIClient, APIResponse } from './api_client';
export { APIClient };
import { Id } from '../stores/tasks';

export class API {

    private static apiClient: APIClient = undefined;

    static configure(url: string): void {
        this.apiClient = new APIClient(url);
    }

    static async searchServices(taskId: Id): Promise<APIResponse> {
        return await this.client.searchServices(taskId);
    }

    private static get client(): APIClient {
        if (this.apiClient === undefined) {
            throw new Error('APIClient initialized, API.configure(...) must be called first');
        }
        return this.apiClient;
    }

}