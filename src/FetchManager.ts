import { UserInfo, MailInfo } from "./GraphReponseTypes";
export interface RestApiResponse {
    data: string,
    used_token: string
}

/**
 * Class that handles Bearer requests for data using Fetch.
 */
export class FetchManager {

    /**
     * Makes an Authorization "Bearer"  request with the given accessToken to the given endpoint.
     * @param endpoint
     * @param accessToken
     */
    async callEndpointWithToken(endpoint: string, accessToken: string): Promise<UserInfo | MailInfo | RestApiResponse> {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        console.log('request made at: ' + new Date().toString());

        const response = await fetch(endpoint, options);
        const result = response.status === 200 ? await response.json() : { used_token: "", data: {status: response.statusText, body: await response.text()}};
        return result as UserInfo | MailInfo | RestApiResponse;
    }

    async callEndpointWithoutToken(endpoint: string): Promise<UserInfo | MailInfo | RestApiResponse> {
        const options = {
            method: "GET",
        };

        console.log('request made at: ' + new Date().toString());

        const response = await fetch(endpoint, options);
        const result = response.status === 200 ? await response.json() : { used_token: "", data: {status: response.statusText, body: await response.text()}};
        return result as  RestApiResponse;
    }
}
