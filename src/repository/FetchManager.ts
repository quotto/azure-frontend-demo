export interface FetchParameter {
    endpoint: string,
    method: "GET" | "POST",
    headers?: ({[key: string]: string})
    token?: string,
    query?: ({[key: string]: string}),
    body?: object
}
/**
 * Makes an Authorization "Bearer"  request with the given accessToken to the given endpoint.
 * @param endpoint
 * @param accessToken
 */
export const callEndpoint = async (fetchParameter: FetchParameter): Promise<Response>=> {
    const headers = new Headers();
    if(fetchParameter.headers) {
        headers.forEach((value,key)=> {
            headers.append(key, value);
        });
    }
    if(fetchParameter.token) {
        const bearer = `Bearer ${fetchParameter.token}`;
        headers.append("Authorization", bearer);
    }

    let url = fetchParameter.endpoint;
    if(typeof(fetchParameter.query) != "undefined") {
        const query = Object.keys(fetchParameter.query).map(key=>{`${key}=${encodeURI(fetchParameter.query![key])}`})
        url = `${url}?${query.join("&")}`;
    }

    const options = {
        method: fetchParameter.method,
        headers: headers,
        body: JSON.stringify(fetchParameter.body)
    };

    console.log('request made at: ' + new Date().toString());

    const response = await fetch(url, options);
    return response;
}