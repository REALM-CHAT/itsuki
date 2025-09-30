const { generateWAMessageContent } = require('../lib/Utils/messages');

/**
 * Test the user's exact button configurations to reproduce the iOS visibility issue
 */
async function testUserIssue() {
    console.log('🔍 Testing User\'s Exact Button Configurations...\n');

    // User's working cta_url button (visible on iOS)
    const workingButton = {
        "name": "cta_url", 
        "buttonParamsJson": "{\"display_text\":\"Senarai Produk 2\",\"url\":\"https:\\/\\/w.meta.me\\/s\\/23c4yBaHWk9qSVV\",\"webview_presentation\":null,\"payment_link_preview\":false,\"landing_page_url\":\"https:\\/\\/shopee.com.my\\/m\\/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w\",\"webview_interaction\":true}"
    };

    // User's problematic open_webview button (not visible on iOS)
    const problematicButton = {
        "name": "open_webview", 
        "buttonParamsJson": "{\"display_text\":\"Senarai Produk\",\"url\":\"https:\\/\\/w.meta.me\\/s\\/23c4yBaHWk9qSVV\",\"webview_presentation\":null,\"payment_link_preview\":false,\"landing_page_url\":\"https:\\/\\/shopee.com.my\\/m\\/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w\",\"webview_interaction\":true}"
    };

    console.log('📱 Testing Working cta_url Button:');
    try {
        const workingMessage = {
            text: "Test working button",
            interactiveButtons: [workingButton]
        };
        
        const result1 = await generateWAMessageContent(workingMessage);
        const processedButton1 = result1.interactiveMessage.nativeFlowMessage.buttons[0];
        
        console.log('✅ Working button processed successfully');
        console.log('Button name:', processedButton1.name);
        console.log('Button params:', processedButton1.buttonParamsJson);
        
    } catch (error) {
        console.error('❌ Working button test failed:', error.message);
    }

    console.log('\n🚫 Testing Problematic open_webview Button:');
    try {
        const problematicMessage = {
            text: "Test problematic button",
            interactiveButtons: [problematicButton]
        };
        
        const result2 = await generateWAMessageContent(problematicMessage);
        const processedButton2 = result2.interactiveMessage.nativeFlowMessage.buttons[0];
        
        console.log('Button name:', processedButton2.name);
        console.log('Button params:', processedButton2.buttonParamsJson);
        
        // Check if it was properly converted
        if (processedButton2.name === 'cta_url') {
            console.log('✅ open_webview converted to cta_url');
            
            // Parse and check the parameters
            try {
                const params = JSON.parse(processedButton2.buttonParamsJson);
                console.log('Converted parameters:');
                console.log('  - display_text:', params.display_text);
                console.log('  - url:', params.url);
                console.log('  - webview_interaction:', params.webview_interaction);
                console.log('  - merchant_url:', params.merchant_url);
                console.log('  - landing_page_url:', params.landing_page_url);
                
                // Check if all required iOS parameters are present
                const hasRequiredParams = params.display_text && params.url && 
                                         params.webview_interaction !== undefined &&
                                         params.merchant_url;
                
                if (hasRequiredParams) {
                    console.log('✅ All required iOS parameters present');
                } else {
                    console.log('⚠️  Missing some iOS parameters');
                }
                
            } catch (e) {
                console.log('❌ Error parsing converted button parameters');
            }
        } else {
            console.log('❌ open_webview was NOT converted to cta_url');
        }
        
    } catch (error) {
        console.error('❌ Problematic button test failed:', error.message);
    }

    console.log('\n🔄 Testing Both Buttons Together:');
    try {
        const combinedMessage = {
            text: "Test both buttons",
            interactiveButtons: [workingButton, problematicButton]
        };
        
        const result3 = await generateWAMessageContent(combinedMessage);
        const buttons = result3.interactiveMessage.nativeFlowMessage.buttons;
        
        console.log(`✅ Combined message processed with ${buttons.length} buttons`);
        buttons.forEach((btn, index) => {
            console.log(`Button ${index + 1}: ${btn.name}`);
        });
        
        // Check messageParamsJson for tap targets
        if (result3.interactiveMessage.nativeFlowMessage.messageParamsJson) {
            try {
                const messageParams = JSON.parse(result3.interactiveMessage.nativeFlowMessage.messageParamsJson);
                if (messageParams.tap_target_list) {
                    console.log(`✅ Tap target list created with ${messageParams.tap_target_list.length} entries`);
                }
            } catch (e) {
                console.log('⚠️  Error parsing messageParamsJson');
            }
        }
        
    } catch (error) {
        console.error('❌ Combined button test failed:', error.message);
    }
}

// Run the test
if (require.main === module) {
    testUserIssue().then(() => {
        console.log('\n🏁 User issue test completed');
    }).catch(error => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });
}

module.exports = { testUserIssue };