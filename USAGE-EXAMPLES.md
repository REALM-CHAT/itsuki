# 📱 iOS WebView Enhanced Baileys - Usage Examples

Complete guide for using `@hassanfuad/baileys-ios-webview` with iOS WebView interactive buttons.

## 🚀 Quick Start

### Installation

```bash
npm install @hassanfuad/baileys-ios-webview
```

### Basic Setup

```javascript
const makeWASocket = require('@hassanfuad/baileys-ios-webview').default;
const { DisconnectReason, useMultiFileAuthState } = require('@hassanfuad/baileys-ios-webview');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);
    
    // Your bot logic here
}

startBot();
```

## 📱 iOS WebView Interactive Messages

### Example 1: Basic Interactive Menu

```javascript
const createBasicMenu = () => {
    return {
        interactiveMessage: {
            body: { text: "Welcome! Choose an option:" },
            footer: { text: "Powered by iOS WebView" },
            header: { title: "🌟 Main Menu" },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "🌐 Visit Website",
                            url: "https://example.com",
                            merchant_url: "https://example.com"
                        })
                    },
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📞 Contact Us",
                            url: "https://example.com/contact",
                            merchant_url: "https://example.com"
                        })
                    }
                ],
                messageParamsJson: JSON.stringify({
                    tap_target_list: [
                        "https://example.com",
                        "https://example.com/contact"
                    ]
                }),
                messageVersion: 1
            }
        }
    };
};

// Send the message
await sock.sendMessage(jid, createBasicMenu());
```

### Example 2: E-commerce Store

```javascript
const createStoreMenu = () => {
    return {
        interactiveMessage: {
            body: { text: "🛍️ Welcome to our store! Check out our latest products." },
            footer: { text: "Secure shopping with iOS WebView" },
            header: { title: "🏪 Online Store" },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "🛒 Shop Now",
                            url: "https://store.example.com/products",
                            merchant_url: "https://store.example.com",
                            landing_page_url: "https://store.example.com/mobile",
                            webview_presentation: "full_screen",
                            webview_interaction: "enabled",
                            payment_link_preview: true
                        })
                    },
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "💳 Payment & Checkout",
                            url: "https://store.example.com/checkout",
                            merchant_url: "https://store.example.com",
                            payment_link_preview: true
                        })
                    },
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📦 Track Order",
                            url: "https://store.example.com/tracking",
                            merchant_url: "https://store.example.com"
                        })
                    }
                ],
                messageParamsJson: JSON.stringify({
                    tap_target_list: [
                        "https://store.example.com/products",
                        "https://store.example.com/checkout",
                        "https://store.example.com/tracking"
                    ]
                }),
                messageVersion: 1
            }
        }
    };
};
```

### Example 3: Service Booking

```javascript
const createBookingMenu = () => {
    return {
        interactiveMessage: {
            body: { text: "📅 Book your appointment with us!" },
            footer: { text: "Easy booking through iOS WebView" },
            header: { title: "🏥 Medical Center" },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📅 Book Appointment",
                            url: "https://clinic.example.com/booking",
                            merchant_url: "https://clinic.example.com",
                            landing_page_url: "https://clinic.example.com/mobile-booking",
                            webview_presentation: "compact",
                            webview_interaction: "enabled"
                        })
                    },
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "👨‍⚕️ Our Doctors",
                            url: "https://clinic.example.com/doctors",
                            merchant_url: "https://clinic.example.com"
                        })
                    }
                ],
                messageParamsJson: JSON.stringify({
                    tap_target_list: [
                        "https://clinic.example.com/booking",
                        "https://clinic.example.com/doctors"
                    ]
                }),
                messageVersion: 1
            }
        }
    };
};
```

## 🔧 Advanced Configuration

### iOS-Specific Parameters

```javascript
const buttonParamsJson = JSON.stringify({
    display_text: "Button Text",           // Required: Button display text
    url: "https://example.com",            // Required: Target URL
    merchant_url: "https://example.com",   // Required: Merchant URL
    
    // iOS WebView specific parameters
    landing_page_url: "https://example.com/mobile",  // iOS optimized landing page
    webview_presentation: "full_screen",             // "full_screen" | "compact"
    webview_interaction: "enabled",                  // "enabled" | "disabled"
    payment_link_preview: true                       // Enable payment preview
});
```

### Message Parameters

```javascript
const messageParamsJson = JSON.stringify({
    tap_target_list: [
        "https://example.com/page1",
        "https://example.com/page2"
    ]
});
```

## 🎯 Best Practices

### 1. Button Limits
- Maximum 3 buttons per message for optimal iOS display
- Use clear, action-oriented button text

### 2. URL Optimization
- Use HTTPS URLs only
- Ensure mobile-responsive landing pages
- Test URLs on iOS devices

### 3. WebView Presentation
- Use `"full_screen"` for complex interactions
- Use `"compact"` for simple forms or quick actions

### 4. Error Handling

```javascript
try {
    const message = createIOSWebViewMessage();
    await sock.sendMessage(jid, message);
    console.log('✅ iOS WebView message sent successfully');
} catch (error) {
    console.error('❌ Failed to send message:', error);
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Message not displaying buttons**
   - Ensure `messageVersion: 1` is set
   - Verify `buttonParamsJson` is valid JSON string

2. **WebView not opening**
   - Check URL accessibility
   - Ensure HTTPS protocol
   - Verify iOS compatibility

3. **Button parameters not working**
   - Validate JSON structure
   - Check required fields: `display_text`, `url`, `merchant_url`

### Debug Mode

```javascript
const { generateWAMessageContent } = require('@hassanfuad/baileys-ios-webview');

// Test message generation
const testMessage = {
    interactiveMessage: {
        // your message structure
    }
};

try {
    const result = generateWAMessageContent(testMessage, {});
    console.log('Generated message:', JSON.stringify(result, null, 2));
} catch (error) {
    console.error('Message generation failed:', error);
}
```

## 📚 Additional Resources

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [iOS WebView Guidelines](https://developer.apple.com/documentation/webkit/wkwebview)
- [Baileys Original Documentation](https://github.com/WhiskeySockets/Baileys)

## 🤝 Support

For iOS WebView specific issues:
- GitHub Issues: [hassanfuad/Baileys](https://github.com/hassanfuad/Baileys/issues)
- Package: `@hassanfuad/baileys-ios-webview`

---

**Note**: This package maintains 100% compatibility with WhiskeySocket's Baileys while adding enhanced iOS WebView support.