const { Baileys, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { createIOSWebviewMessage, createWebviewButton } = require('../lib/Utils/ios-webview-helper');

async function testIOSWebviewOnRealDevice() {
    console.log('🚀 Starting iOS Webview Real Device Test...\n');
    
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    const sock = Baileys({
        auth: state,
        printQRInTerminal: true,
        logger: { level: 'silent' } // Reduce noise
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed:', lastDisconnect.error?.message);
            if (shouldReconnect) {
                console.log('Reconnecting...');
                testIOSWebviewOnRealDevice();
            }
        } else if (connection === 'open') {
            console.log('✅ Connected to WhatsApp!\n');
            runTests(sock);
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

async function runTests(sock) {
    // Replace with your test phone number
    const testNumber = 'YOUR_TEST_NUMBER@s.whatsapp.net'; // e.g., '1234567890@s.whatsapp.net'
    
    console.log('📱 Running iOS Webview Tests...\n');
    
    try {
        // Test 1: Simple webview button
        console.log('Test 1: Simple webview button');
        const simpleMessage = {
            text: "🧪 Test 1: Simple iOS Webview Button\n\nClick the button below to test webview functionality.",
            footer: "iOS Webview Test",
            interactiveButtons: [{
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Open Test Page",
                    url: "https://www.google.com",
                    webview_presentation: null,
                    payment_link_preview: false,
                    landing_page_url: "https://www.google.com",
                    webview_interaction: true
                })
            }]
        };
        
        await sock.sendMessage(testNumber, simpleMessage);
        console.log('✅ Test 1 sent\n');
        
        // Wait 2 seconds between tests
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test 2: Using helper function
        console.log('Test 2: Using helper function');
        const helperButton = createWebviewButton({
            text: "Helper Function Test",
            url: "https://github.com",
            landingPageUrl: "https://github.com",
            webviewInteraction: true,
            paymentLinkPreview: false
        });
        
        const helperMessage = createIOSWebviewMessage({
            bodyText: "🧪 Test 2: Helper Function\n\nThis message was created using the helper function.",
            footerText: "Helper Function Test",
            buttons: [helperButton]
        });
        
        await sock.sendMessage(testNumber, helperMessage);
        console.log('✅ Test 2 sent\n');
        
        // Wait 2 seconds between tests
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test 3: Multiple buttons
        console.log('Test 3: Multiple buttons');
        const multiButtonMessage = createIOSWebviewMessage({
            bodyText: "🧪 Test 3: Multiple Buttons\n\nTest multiple webview buttons:",
            footerText: "Multi-button Test",
            buttons: [
                createWebviewButton({
                    text: "Google",
                    url: "https://www.google.com"
                }),
                createWebviewButton({
                    text: "GitHub",
                    url: "https://github.com"
                })
            ]
        });
        
        await sock.sendMessage(testNumber, multiButtonMessage);
        console.log('✅ Test 3 sent\n');
        
        // Test 4: Your original Shopee example
        console.log('Test 4: Shopee example (from your debug data)');
        const shopeeMessage = createIOSWebviewMessage({
            bodyText: "🧪 Test 4: Shopee Example\n\n⏰ *3X Ganjaran Menanti Anda Hari Ini!* 🥳✨\n\nThis replicates your original iOS debug data structure.",
            footerText: "Balas \"Unsub\" untuk menarik diri.",
            buttons: [
                createWebviewButton({
                    text: "Senarai Produk",
                    url: "https://w.meta.me/s/23c4yBaHWk9qSVV",
                    landingPageUrl: "https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true",
                    webviewInteraction: true,
                    paymentLinkPreview: false
                })
            ]
        });
        
        await sock.sendMessage(testNumber, shopeeMessage);
        console.log('✅ Test 4 sent\n');
        
        console.log('🎉 All tests sent successfully!');
        console.log('\n📋 Testing Instructions:');
        console.log('1. Check your WhatsApp on both Android and iOS devices');
        console.log('2. Tap each button to test webview functionality');
        console.log('3. Verify that webviews open correctly on both platforms');
        console.log('4. Check that the landing pages load properly');
        console.log('\n⚠️  Note: Replace testNumber with your actual phone number');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
    
    // Keep connection alive for a bit
    setTimeout(() => {
        console.log('\n🔌 Disconnecting...');
        sock.end();
    }, 5000);
}

// Run the test
if (require.main === module) {
    console.log('⚠️  IMPORTANT: Update the testNumber variable with your phone number before running!');
    console.log('Example: const testNumber = "1234567890@s.whatsapp.net";\n');
    
    // Uncomment the line below after updating the phone number
    // testIOSWebviewOnRealDevice().catch(console.error);
    
    console.log('To run the test:');
    console.log('1. Update testNumber in the script');
    console.log('2. Uncomment the testIOSWebviewOnRealDevice() call');
    console.log('3. Run: node test/real-device-test.js');
}

module.exports = { testIOSWebviewOnRealDevice };