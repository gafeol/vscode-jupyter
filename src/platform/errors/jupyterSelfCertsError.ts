// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseError } from './types';

/**
 * Error thrown when a jupyter server is using an self signed certificate. This can be expected and we should ask if they want to allow it anyway.
 *
 * Cause:
 * User is connecting to a server that is using a self signed certificate that is not trusted. Detected by looking for a specific error message when connecting.
 *
 * Handled by:
 * The URI entry box when picking a server. It should ask the user if they want to allow it anyway.
 */
export class JupyterSelfCertsError extends BaseError {
    constructor(message: string) {
        super('jupyterselfcert', message);
    }
    public static isSelfCertsError(err: unknown) {
        const message = (err as undefined | { message: string })?.message ?? '';
        return (
            message.indexOf('reason: self signed certificate') >= 0 ||
            // https://github.com/microsoft/vscode-jupyter-hub/issues/36#issuecomment-1854097594
            message.indexOf('reason: unable to verify the first certificate') >= 0 ||
            // https://github.com/microsoft/vscode-jupyter-hub/issues/36#issuecomment-1761234981
            message.indexOf('reason: unable to get issuer certificate') >= 0 ||
            // https://github.com/microsoft/vscode-jupyter/issues/7558#issuecomment-993054968
            message.indexOf("is not in the cert's list") >= 0
        );
    }
}
