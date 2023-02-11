import { PublicClientApplication, SilentRequest, AuthenticationResult, Configuration, LogLevel, AccountInfo, InteractionRequiredAuthError, RedirectRequest, PopupRequest, EndSessionRequest, SsoSilentRequest } from "@azure/msal-browser";
// import { UIManager } from "../bk/UIManager";

declare var AZURE_TENANT_ID: string
declare var AZURE_FRONTEND_CLIENT_ID: string
declare var AZURE_PROFILE_API_CLIENT_ID: string
declare var AZURE_PROFILE_API_ENDPOINT: string
declare var AZURE_ATTENDANCE_API_ENDPOINT: string

export const config =  {
    AZURE_TENANT_ID: process.env.AZURE_TENANT_ID || "",
    AZURE_FRONTEND_CLIENT_ID: process.env.AZURE_FRONTEND_CLIENT_ID || "",
    AZURE_PROFILE_API_CLIENT_ID: process.env.AZURE_PROFILE_API_CLIENT_ID || "",
    AZURE_PROFILE_API_ENDPOINT: process.env.AZURE_PROFILE_API_ENDPOINT || "",
    AZURE_ATTENDANCE_API_ENDPOINT: process.env.AZURE_ATTENDANCE_API_ENDPOINT || ""
    // AZURE_TENANT_ID: AZURE_TENANT_ID,
    // AZURE_FRONTEND_CLIENT_ID: AZURE_FRONTEND_CLIENT_ID,
    // AZURE_PROFILE_API_CLIENT_ID: AZURE_PROFILE_API_CLIENT_ID,
    // AZURE_PROFILE_API_ENDPOINT: AZURE_PROFILE_API_ENDPOINT,
    // AZURE_ATTENDANCE_API_ENDPOINT: AZURE_ATTENDANCE_API_ENDPOINT
}

/**
 * Configuration class for @azure/msal-browser:
 * https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_config_configuration_.html
 */
export const MSAL_CONFIG: Configuration = {
    auth: {
        clientId: config.AZURE_FRONTEND_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${config.AZURE_TENANT_ID}`
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const loginRequest = {
    scopes: ["openid"]
};
