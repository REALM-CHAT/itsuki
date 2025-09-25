# iOS Webview Support for Interactive Messages

This implementation adds iOS-compatible webview functionality to Baileys interactive messages. The webview functionality works on Android by default, but requires specific message structure for iOS devices.

## Problem

The `open_webview` functionality works on Android but not on iOS. iOS requires a specific message structure with additional parameters to properly handle webview interactions.

## Solution

We've implemented iOS-compatible webview support by:

1. **Enhanced Button Processing**: Automatically adds iOS-required parameters to `cta_url` buttons
2. **Message Parameters Generation**: Creates the required `messageParamsJson` structure for iOS webview handling
3. **Helper Functions**: Provides easy-to-use helper functions for creating iOS-compatible messages

## Key Features

### Automatic iOS Compatibility

When using `interactiveButtons` with `cta_url` buttons, the system now automatically:

- Adds `webview_presentation`, `webview_interaction`, and `payment_link_preview` parameters
- Generates the required `messageParamsJson` with tap target configuration
- Includes `dataSharingContext` in contextInfo

### Required iOS Parameters

For iOS webview functionality, buttons need these parameters:

```json
{
  "display_text": "Button Text",
  "url": "https://example.com",
  "webview_presentation": null,
  "payment_link_preview": false,
  "landing_page_url": "https://example.com",
  "webview_interaction": true
}
```

### Message Parameters Structure

iOS requires a `messageParamsJson` with this structure:

```json
{
  "bottom_sheet": {
    "in_thread_buttons_limit": 3,
    "divider_indices": []
  },
  "tap_target_configuration": {
    "canonical_url": "https://example.com",
    "url_type": "STATIC",
    "button_index": 0,
    "tap_target_format": 1
  },
  "tap_target_list": [
    {
      "canonical_url": "https://example.com",
      "url_type": "STATIC",
      "button_index": 0,
      "tap_target_format": 1
    }
  ]
}
```

## Usage Examples

### Method 1: Using Helper Functions (Recommended)

```javascript
const { createIOSWebviewMessage, createWebviewButton } = require('@whiskeysockets/baileys');

// Create a webview button
const webviewButton = createWebviewButton({
    text: "Open Website",
    url: "https://example.com",
    landingPageUrl: "https://example.com",
    webviewInteraction: true,
    paymentLinkPreview: false
});

// Create the complete message
const message = createIOSWebviewMessage({
    bodyText: "Click the button below to open the website",
    footerText: "Footer text here",
    buttons: [webviewButton]
});

// Send the message
await sock.sendMessage('recipient@s.whatsapp.net', message);
```

### Method 2: Traditional interactiveButtons (Now iOS-Compatible)

```javascript
const message = {
    text: "Your message text here",
    footer: "Footer text",
    interactiveButtons: [
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "Open Website",
                url: "https://example.com",
                webview_presentation: null,
                payment_link_preview: false,
                landing_page_url: "https://example.com",
                webview_interaction: true
            })
        }
    ]
    // messageParamsJson will be automatically generated
};

await sock.sendMessage('recipient@s.whatsapp.net', message);
```

### Method 3: Complete Manual Structure

```javascript
const message = {
    interactiveMessage: {
        header: {
            hasMediaAttachment: false
        },
        body: {
            text: "Your message text here"
        },
        footer: {
            text: "Footer text"
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Open Website",
                        url: "https://example.com",
                        webview_presentation: null,
                        payment_link_preview: false,
                        landing_page_url: "https://example.com",
                        webview_interaction: true
                    })
                }
            ],
            messageParamsJson: JSON.stringify({
                bottom_sheet: {
                    in_thread_buttons_limit: 3,
                    divider_indices: []
                },
                tap_target_configuration: {
                    canonical_url: "https://example.com",
                    url_type: "STATIC",
                    button_index: 0,
                    tap_target_format: 1
                },
                tap_target_list: [{
                    canonical_url: "https://example.com",
                    url_type: "STATIC",
                    button_index: 0,
                    tap_target_format: 1
                }]
            })
        },
        contextInfo: {
            dataSharingContext: {
                showMmDisclosure: false
            }
        }
    }
};

await sock.sendMessage('recipient@s.whatsapp.net', message);
```

## API Reference

### createWebviewButton(options)

Creates an iOS-compatible webview button configuration.

**Parameters:**
- `options.text` (string): Button display text
- `options.url` (string): Target URL
- `options.landingPageUrl` (string, optional): Landing page URL (defaults to url)
- `options.webviewInteraction` (boolean, optional): Enable webview interaction (default: true)
- `options.paymentLinkPreview` (boolean, optional): Show payment link preview (default: false)
- `options.webviewPresentation` (string|null, optional): Webview presentation type (default: null)

### createIOSWebviewMessage(options)

Creates a complete iOS-compatible interactive message with webview functionality.

**Parameters:**
- `options.bodyText` (string): Main message text
- `options.footerText` (string, optional): Footer text
- `options.title` (string, optional): Header title
- `options.subtitle` (string, optional): Header subtitle
- `options.imageMessage` (object, optional): Image message object for header
- `options.buttons` (array): Array of button objects
- `options.contextInfo` (object, optional): Context information

## Backward Compatibility

This implementation is fully backward compatible. Existing code using `interactiveButtons` will continue to work and will automatically gain iOS webview support.

## Testing

To test the iOS webview functionality:

1. Send a message using any of the methods above
2. Test on both Android and iOS devices
3. Verify that the webview opens correctly on both platforms
4. Check that the landing page loads properly

## Troubleshooting

### Webview Not Opening on iOS

- Ensure `webview_interaction` is set to `true`
- Verify the URL is accessible and valid
- Check that `messageParamsJson` is properly formatted

### Button Not Displaying

- Verify the button structure matches the required format
- Check that `buttonParamsJson` is valid JSON
- Ensure the message structure includes all required fields

### Landing Page Issues

- Verify `landing_page_url` is set correctly
- Check that the target website supports webview embedding
- Ensure the URL is accessible from mobile devices