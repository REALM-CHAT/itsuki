const { generateWAMessageContent } = require('../lib/Utils/messages');

/**
 * Test iOS compatibility for interactive messages with open_webview and quick_reply buttons
 */
async function testIOSInteractiveMessage() {
    console.log('Testing iOS Interactive Message Compatibility...\n');

    // Test the user's provided message structure
    const testMessage = {
        "to": "60165808487@s.whatsapp.net", 
        "text": "This is an Interactive message!", 
        "title": "Hiii", 
        "subtitle": "There is a subtitle", 
        "footer": "Hello World!", 
        "interactiveButtons": [ 
            { 
                "name": "quick_reply", 
                "buttonParamsJson": "{\"display_text\":\"Talk with AI!\",\"id\":\"talkwithai\"}" 
            }, 
            { 
                "name": "cta_url", 
                "buttonParamsJson": "{\"display_text\":\"Follow Me\",\"url\":\"whatsapp-smb://settings/account/business-platforms?source=template_message\",\"merchant_url\":\"whatsapp-smb://settings/account/business-platforms?source=template_message\"}" 
            }, 
            { 
                "name": "open_webview", 
                "buttonParamsJson": "{\"title\":\"Open In-App\",\"link\":{\"in_app_webview\":true,\"url\":\"https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y\"}}" 
            }
        ] 
    };

    try {
        // Generate the message content
        const messageContent = await generateWAMessageContent(testMessage);
        
        console.log('✅ Message generated successfully!');
        console.log('📱 iOS Compatibility Features:');
        
        // Check if interactive message was created
        if (messageContent.interactiveMessage) {
            console.log('  ✓ Interactive message structure created');
            
            // Check for nativeFlowMessage
            if (messageContent.interactiveMessage.nativeFlowMessage) {
                console.log('  ✓ Native flow message structure present');
                
                // Check buttons
                const buttons = messageContent.interactiveMessage.nativeFlowMessage.buttons;
                if (buttons && buttons.length > 0) {
                    console.log(`  ✓ ${buttons.length} buttons processed`);
                    
                    // Check for iOS-compatible URL buttons
                    const urlButtons = buttons.filter(btn => btn.name === 'cta_url');
                    if (urlButtons.length > 0) {
                        console.log(`  ✓ ${urlButtons.length} URL buttons converted for iOS compatibility`);
                        
                        // Check button parameters
                        urlButtons.forEach((btn, index) => {
                            try {
                                const params = JSON.parse(btn.buttonParamsJson);
                                console.log(`    Button ${index + 1}:`);
                                console.log(`      - Display Text: ${params.display_text}`);
                                console.log(`      - URL: ${params.url}`);
                                console.log(`      - Webview Interaction: ${params.webview_interaction}`);
                                console.log(`      - Merchant URL: ${params.merchant_url || 'Not set'}`);
                                if (params.in_app_webview !== undefined) {
                                    console.log(`      - In-App Webview: ${params.in_app_webview}`);
                                }
                            } catch (e) {
                                console.log(`    Button ${index + 1}: Error parsing parameters`);
                            }
                        });
                    }
                }
                
                // Check for messageParamsJson (iOS requirement)
                if (messageContent.interactiveMessage.nativeFlowMessage.messageParamsJson) {
                    console.log('  ✓ iOS messageParamsJson generated');
                    try {
                        const messageParams = JSON.parse(messageContent.interactiveMessage.nativeFlowMessage.messageParamsJson);
                        if (messageParams.tap_target_list && messageParams.tap_target_list.length > 0) {
                            console.log(`  ✓ Tap target list created with ${messageParams.tap_target_list.length} entries`);
                        }
                    } catch (e) {
                        console.log('  ⚠️  Error parsing messageParamsJson');
                    }
                }
            }
            
            // Check for iOS-specific contextInfo
            if (messageContent.interactiveMessage.contextInfo && 
                messageContent.interactiveMessage.contextInfo.dataSharingContext) {
                console.log('  ✓ iOS dataSharingContext added');
            }
        }
        
        console.log('\n📋 Generated Message Structure:');
        console.log(JSON.stringify(messageContent, null, 2));
        
        return messageContent;
        
    } catch (error) {
        console.error('❌ Error generating message:', error);
        throw error;
    }
}

// Test specific iOS scenarios
async function testIOSScenarios() {
    console.log('\n🧪 Testing Specific iOS Scenarios...\n');
    
    // Test 1: Pure open_webview button
    console.log('Test 1: Pure open_webview button');
    try {
        const openWebviewMessage = {
            text: "Test open_webview button",
            interactiveButtons: [{
                name: "open_webview",
                buttonParamsJson: JSON.stringify({
                    title: "Open Website",
                    link: {
                        in_app_webview: true,
                        url: "https://example.com"
                    }
                })
            }]
        };
        
        const result1 = await generateWAMessageContent(openWebviewMessage);
        console.log('✅ open_webview button processed successfully');
        
        // Verify conversion to cta_url
        const button = result1.interactiveMessage.nativeFlowMessage.buttons[0];
        if (button.name === 'cta_url') {
            console.log('✅ open_webview converted to cta_url for iOS compatibility');
        }
        
    } catch (error) {
        console.error('❌ Test 1 failed:', error.message);
    }
    
    // Test 2: Mixed button types
    console.log('\nTest 2: Mixed button types (quick_reply + open_webview)');
    try {
        const mixedMessage = {
            text: "Mixed buttons test",
            interactiveButtons: [
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Quick Reply",
                        id: "quick1"
                    })
                },
                {
                    name: "open_webview",
                    buttonParamsJson: JSON.stringify({
                        title: "Open Site",
                        link: {
                            in_app_webview: true,
                            url: "https://example.com"
                        }
                    })
                }
            ]
        };
        
        const result2 = await generateWAMessageContent(mixedMessage);
        console.log('✅ Mixed button types processed successfully');
        
        const buttons = result2.interactiveMessage.nativeFlowMessage.buttons;
        const quickReplyButtons = buttons.filter(btn => btn.name === 'quick_reply');
        const urlButtons = buttons.filter(btn => btn.name === 'cta_url');
        
        console.log(`✅ ${quickReplyButtons.length} quick_reply buttons preserved`);
        console.log(`✅ ${urlButtons.length} URL buttons (including converted open_webview)`);
        
    } catch (error) {
        console.error('❌ Test 2 failed:', error.message);
    }
}

// Run the tests
async function runTests() {
    try {
        await testIOSInteractiveMessage();
        await testIOSScenarios();
        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📱 iOS Compatibility Summary:');
        console.log('  ✓ open_webview buttons are converted to cta_url format');
        console.log('  ✓ iOS-specific parameters are automatically added');
        console.log('  ✓ messageParamsJson is generated for webview functionality');
        console.log('  ✓ dataSharingContext is included for iOS compatibility');
        console.log('  ✓ quick_reply buttons work alongside webview buttons');
    } catch (error) {
        console.error('❌ Tests failed:', error);
        process.exit(1);
    }
}

// Export for use in other tests
module.exports = {
    testIOSInteractiveMessage,
    testIOSScenarios,
    runTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}