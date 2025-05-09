// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IWebviewPanel, IWebviewPanelMessageListener } from '../../../platform/common/application/types';

/* eslint-disable @typescript-eslint/no-explicit-any */

// This class listens to messages that come from the local Data Explorer window
export class DataViewerMessageListener implements IWebviewPanelMessageListener {
    private disposedCallback: () => void;
    private callback: (message: string, payload: any) => void;
    private viewChanged: (panel: IWebviewPanel) => void;

    constructor(
        callback: (message: string, payload: any) => void,
        viewChanged: (panel: IWebviewPanel) => void,
        disposed: () => void
    ) {
        // Save our dispose callback so we remove our interactive window
        this.disposedCallback = disposed;

        // Save our local callback so we can handle the non broadcast case(s)
        this.callback = callback;

        // Save view changed so we can forward view change events.
        this.viewChanged = viewChanged;
    }

    public dispose() {
        this.disposedCallback();
    }

    public onMessage(message: string, payload: any) {
        // Send to just our local callback.
        this.callback(message, payload);
    }

    public onChangeViewState(panel: IWebviewPanel) {
        // Forward this onto our callback
        this.viewChanged(panel);
    }
}
