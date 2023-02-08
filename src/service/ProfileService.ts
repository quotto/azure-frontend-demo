import { useMsal } from "@azure/msal-react";
import { callEndpoint } from "../repository/FetchManager";
import { AccountInfo, IPublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { config } from "../AuthModule";
import { UserInfo } from "../model/GraphReponseTypes";

export const getMyProfile = async(instance: IPublicClientApplication, accounts: AccountInfo[]): Promise<UserInfo | null>=>{
    const silentRequest = {
            scopes: [`api://${config.AZURE_PROFILE_API_CLIENT_ID}/User.Read`],
            forceRefresh: false
    }
    try {
        console.log(JSON.stringify(silentRequest))
        const tokenRequestResponse = await instance.acquireTokenSilent({...silentRequest, account: accounts[0]});
        const response = await callEndpoint(
            {
                endpoint: `${config.AZURE_PROFILE_API_ENDPOINT}/api/me`,
                method: "GET",
                token: tokenRequestResponse.accessToken
            }
        )

        const responseData = await response.json();

        return responseData.data as UserInfo;
    } catch (e) {
        console.log("silent token acquisition fails.");
        if (e instanceof InteractionRequiredAuthError) {
            console.log("acquiring token using redirect");
            instance.acquireTokenRedirect(silentRequest).catch(console.error);
        } else {
            console.error(e);
        }
    }

    return null;
}


export const getTenantUsers = async(instance: IPublicClientApplication, accounts: AccountInfo[]): Promise<UserInfo[] | null> =>{
    const silentRequest = {
        scopes: [`api://${config.AZURE_PROFILE_API_CLIENT_ID}/user_impersonation`],
        forceRefresh: false
    }
    try {
        console.log(JSON.stringify(silentRequest))
        const tokenRequestResponse = await instance.acquireTokenSilent({...silentRequest, account: accounts[0]});
        const response = await callEndpoint(
            {
                endpoint: `${config.AZURE_PROFILE_API_ENDPOINT}/api/users`,
                method: "GET",
                token: tokenRequestResponse.accessToken
            }
        )

        const responseData = await response.json();

        return responseData.data.value;
    } catch (e) {
        console.log("silent token acquisition fails.");
        if (e instanceof InteractionRequiredAuthError) {
            console.log("acquiring token using redirect");
            instance.acquireTokenRedirect(silentRequest).catch(console.error);
        } else {
            console.error(e);
        }
    }

    return null;
}