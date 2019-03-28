// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { APIClient, APIResponse, MaybeLocation } from './api_client';
import { isResponseError } from './is_response_error';
import { Id } from '../stores/topics';

export { APIClient, APIResponse };
export { isResponseError };

export class API {

    private static apiClient: APIClient = undefined;

    static configure(url: string): void {
        console.log(`Using URL: ${url}`);
        this.apiClient = new APIClient(url);
    }

    static async searchServices(topicId: Id, location: MaybeLocation): Promise<APIResponse> {
        return await this.client.searchServices(topicId, location);
    }

    private static get client(): APIClient {
        if (this.apiClient === undefined) {
            throw new Error('APIClient initialized, API.configure(...) must be called first');
        }
        return this.apiClient;
    }

}