import { GRAPH_CONFIG } from "./Constants";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export const callMsGraph = async(accessToken: string) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(GRAPH_CONFIG.GRAPH_ME_ENDPT, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}