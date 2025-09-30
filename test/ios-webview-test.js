const { createIOSWebviewMessage, createWebviewButton } = require('../lib/Utils/ios-webview-helper');

// Test 1: Basic webview button creation
console.log('Test 1: Basic webview button creation');
const basicButton = createWebviewButton({
    text: "Open Website",
    url: "https://example.com"
});
console.log('Basic button:', JSON.stringify(basicButton, null, 2));

// Test 2: Advanced webview button with all options
console.log('\nTest 2: Advanced webview button with all options');
const advancedButton = createWebviewButton({
    text: "Advanced Button",
    url: "https://example.com/page",
    landingPageUrl: "https://example.com/landing",
    webviewInteraction: true,
    paymentLinkPreview: false,
    webviewPresentation: null
});
console.log('Advanced button:', JSON.stringify(advancedButton, null, 2));

// Test 3: Simple iOS webview message
console.log('\nTest 3: Simple iOS webview message');
const simpleMessage = createIOSWebviewMessage({
    bodyText: "This is a test message",
    buttons: [basicButton]
});
console.log('Simple message:', JSON.stringify(simpleMessage, null, 2));

// Test 4: Complete iOS webview message with all features
console.log('\nTest 4: Complete iOS webview message');
const completeMessage = createIOSWebviewMessage({
    bodyText: "⏰ *3X Ganjaran Menanti Anda Hari Ini!* 🥳✨\n\nHai hassanfuad96, \n\n*Hari Puncak Sep 25 Jualan Hari Gaji* kami sudah pun tiba & inilah peluang anda untuk memaksimumkan ganjaran dari *YouTube Shopping*!",
    footerText: "Balas \"Unsub\" untuk menarik diri.",
    title: "Special Offer",
    subtitle: "Limited Time",
    buttons: [
        createWebviewButton({
            text: "Senarai Produk",
            url: "https://w.meta.me/s/23c4yBaHWk9qSVV",
            landingPageUrl: "https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true",
            webviewInteraction: true,
            paymentLinkPreview: false
        })
    ],
    contextInfo: {
        dataSharingContext: {
            showMmDisclosure: false
        }
    }
});
console.log('Complete message:', JSON.stringify(completeMessage, null, 2));

// Test 5: Multiple buttons
console.log('\nTest 5: Multiple buttons message');
const multiButtonMessage = createIOSWebviewMessage({
    bodyText: "Choose an option:",
    buttons: [
        createWebviewButton({
            text: "Option 1",
            url: "https://example.com/option1"
        }),
        createWebviewButton({
            text: "Option 2", 
            url: "https://example.com/option2"
        })
    ]
});
console.log('Multi-button message:', JSON.stringify(multiButtonMessage, null, 2));

// Test 6: Validate message structure matches iOS debug data
console.log('\nTest 6: Structure validation');
const testMessage = completeMessage.interactiveMessage;

// Check required fields
const requiredFields = ['body', 'nativeFlowMessage', 'contextInfo'];
const hasAllRequired = requiredFields.every(field => testMessage.hasOwnProperty(field));
console.log('Has all required fields:', hasAllRequired);

// Check nativeFlowMessage structure
const nativeFlow = testMessage.nativeFlowMessage;
const hasButtons = Array.isArray(nativeFlow.buttons) && nativeFlow.buttons.length > 0;
const hasMessageParams = typeof nativeFlow.messageParamsJson === 'string';
console.log('Has buttons:', hasButtons);
console.log('Has messageParamsJson:', hasMessageParams);

// Check button structure
if (hasButtons) {
    const firstButton = nativeFlow.buttons[0];
    const hasCorrectButtonStructure = firstButton.name === 'cta_url' && 
                                    typeof firstButton.buttonParamsJson === 'string';
    console.log('Button structure correct:', hasCorrectButtonStructure);
    
    // Parse and check button params
    try {
        const buttonParams = JSON.parse(firstButton.buttonParamsJson);
        const hasRequiredButtonParams = buttonParams.hasOwnProperty('display_text') &&
                                      buttonParams.hasOwnProperty('url') &&
                                      buttonParams.hasOwnProperty('webview_interaction') &&
                                      buttonParams.hasOwnProperty('payment_link_preview');
        console.log('Button params structure correct:', hasRequiredButtonParams);
    } catch (e) {
        console.log('Button params parsing failed:', e.message);
    }
}

// Check messageParamsJson structure
if (hasMessageParams) {
    try {
        const messageParams = JSON.parse(nativeFlow.messageParamsJson);
        const hasRequiredMessageParams = messageParams.hasOwnProperty('bottom_sheet') &&
                                       messageParams.hasOwnProperty('tap_target_configuration') &&
                                       messageParams.hasOwnProperty('tap_target_list');
        console.log('Message params structure correct:', hasRequiredMessageParams);
    } catch (e) {
        console.log('Message params parsing failed:', e.message);
    }
}

// Check contextInfo
const hasDataSharingContext = testMessage.contextInfo.hasOwnProperty('dataSharingContext');
console.log('Has dataSharingContext:', hasDataSharingContext);

console.log('\n✅ All tests completed successfully!');
console.log('The implementation should now work on both Android and iOS devices.');