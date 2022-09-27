import { RequestUpdateIntegrationInstallation } from '@gitbook/api';

import { RuntimeCallback } from './context';

export interface OAuthConfig {
    /**
     * Redirect URL to use. When the OAuth identity provider only accept a static one.
     */
    redirectURL?: string;

    /**
     * ID of the client application in the OAuth provider.
     */
    clientId: string;

    /**
     * Secret of the client application in the OAuth provider.
     */
    clientSecret: string;

    /**
     * URL to redirect the user to, for authrorization.
     */
    authorizeURL: string;

    /**
     * URL to exchange the OAuth code for an access token.
     */
    accessTokenURL: string;

    /**
     * Extract the credentials from the code exchange response.
     */
    extractCredentials?: (
        response: object
    ) => RequestUpdateIntegrationInstallation | Promise<RequestUpdateIntegrationInstallation>;
}

/**
 * Create a fetch request handler to handle an OAuth authentication flow.
 * The credentials are stored in the installation configuration as `installationCredentialsKey`.
 *
 * When using this handler, you must configure `https://integrations.gitbook.com/integrations/{name}/` as a redirect URI.
 */
export function createOAuthHandler(
    config: OAuthConfig
): RuntimeCallback<[Request], Promise<Response>> {
    const {
        extractCredentials = (response) => ({
            configuration: {
                oauth_credentials: { access_token: response.access_token },
            },
        }),
    } = config;

    return async (request, { api, environment }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');

        let redirectUri = config.redirectURL;
        if (!redirectUri) {
            const redirectUriObj = new URL(request.url);
            redirectUriObj.search = '';
            redirectUri = redirectUriObj.toString();
        }

        //
        // Redirect to authorization
        //
        if (!code) {
            const redirectTo = new URL(config.authorizeURL);
            redirectTo.searchParams.set('client_id', config.clientId);
            redirectTo.searchParams.set('redirect_uri', redirectUri);
            redirectTo.searchParams.set('response_type', 'code');
            redirectTo.searchParams.set('state', environment.installation.id);

            return Response.redirect(redirectTo.toString());
        }

        //
        // Exchange the code for an access token
        //
        else {
            const installationId = url.searchParams.get('state');

            const params = new URLSearchParams();
            params.set('client_id', config.clientId);
            params.set('client_secret', config.clientSecret);
            params.set('code', code);
            params.set('redirect_uri', redirectUri);
            params.set('grant_type', 'authorization_code');

            const response = await fetch(config.accessTokenURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            if (!response.ok) {
                throw new Error('Failed to exchange code for access token');
            }
            const json = await response.json();

            if (!json.ok) {
                throw new Error(`Failed to exchange code for access token ${JSON.stringify(json)}`);
            }

            // Store the credentials in the installation configuration
            await api.integrations.updateIntegrationInstallation(
                environment.integration.name,
                installationId,
                await extractCredentials(json)
            );

            return new Response(
                `
                <p>You can close this window now.</p>
                <script>
                    window.close();
                </script>
                `,
                {
                    headers: {
                        'Content-Type': 'text/html',
                    },
                }
            );
        }
    };
}
