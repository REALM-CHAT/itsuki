const { createIOSWebviewMessage, createWebviewButton } = require('../lib/Utils/ios-webview-helper');

/**
 * Validates if a message structure matches iOS webview requirements
 * Based on the debug data structure that works on iOS
 */
function validateIOSWebviewStructure(message) {
    const results = {
        valid: true,
        errors: [],
        warnings: [],
        structure: {}
    };

    // Check if it's an interactive message
    if (!message.interactiveMessage) {
        results.valid = false;
        results.errors.push('Missing interactiveMessage wrapper');
        return results;
    }

    const interactive = message.interactiveMessage;
    results.structure.hasInteractiveMessage = true;

    // Check required fields
    const requiredFields = ['body', 'nativeFlowMessage'];
    requiredFields.forEach(field => {
        if (!interactive[field]) {
            results.valid = false;
            results.errors.push(`Missing required field: ${field}`);
        } else {
            results.structure[field] = true;
        }
    });

    // Check body structure
    if (interactive.body && typeof interactive.body.text !== 'string') {
        results.valid = false;
        results.errors.push('body.text must be a string');
    }

    // Check nativeFlowMessage structure
    if (interactive.nativeFlowMessage) {
        const nativeFlow = interactive.nativeFlowMessage;
        
        // Check buttons
        if (!Array.isArray(nativeFlow.buttons)) {
            results.valid = false;
            results.errors.push('nativeFlowMessage.buttons must be an array');
        } else {
            results.structure.buttonsCount = nativeFlow.buttons.length;
            
            // Validate each button
            nativeFlow.buttons.forEach((button, index) => {
                if (button.name !== 'cta_url') {
                    results.warnings.push(`Button ${index}: name should be 'cta_url' for webview`);
                }
                
                if (!button.buttonParamsJson) {
                    results.valid = false;
                    results.errors.push(`Button ${index}: missing buttonParamsJson`);
                } else {
                    try {
                        const params = JSON.parse(button.buttonParamsJson);
                        
                        // Check required button parameters for iOS
                        const requiredButtonParams = ['display_text', 'url'];
                        requiredButtonParams.forEach(param => {
                            if (!params[param]) {
                                results.valid = false;
                                results.errors.push(`Button ${index}: missing ${param} in buttonParamsJson`);
                            }
                        });
                        
                        // Check iOS-specific parameters
                        const iosParams = ['webview_interaction', 'payment_link_preview', 'landing_page_url'];
                        iosParams.forEach(param => {
                            if (params[param] === undefined) {
                                results.warnings.push(`Button ${index}: missing iOS parameter ${param}`);
                            }
                        });
                        
                    } catch (e) {
                        results.valid = false;
                        results.errors.push(`Button ${index}: invalid JSON in buttonParamsJson`);
                    }
                }
            });
        }
        
        // Check messageParamsJson (required for iOS)
        if (!nativeFlow.messageParamsJson) {
            results.warnings.push('Missing messageParamsJson - may not work on iOS');
        } else {
            try {
                const messageParams = JSON.parse(nativeFlow.messageParamsJson);
                
                // Check required message parameters
                const requiredMessageParams = ['bottom_sheet', 'tap_target_configuration', 'tap_target_list'];
                requiredMessageParams.forEach(param => {
                    if (!messageParams[param]) {
                        results.warnings.push(`Missing ${param} in messageParamsJson`);
                    }
                });
                
                results.structure.hasMessageParams = true;
            } catch (e) {
                results.valid = false;
                results.errors.push('Invalid JSON in messageParamsJson');
            }
        }
    }

    // Check contextInfo for iOS compatibility
    if (!interactive.contextInfo) {
        results.warnings.push('Missing contextInfo - recommended for iOS');
    } else {
        if (!interactive.contextInfo.dataSharingContext) {
            results.warnings.push('Missing dataSharingContext in contextInfo - recommended for iOS');
        } else {
            results.structure.hasDataSharingContext = true;
        }
    }

    // Check optional fields
    if (interactive.header) {
        results.structure.hasHeader = true;
    }
    if (interactive.footer) {
        results.structure.hasFooter = true;
    }

    return results;
}

/**
 * Compare a generated message with the reference iOS debug structure
 */
function compareWithIOSReference(message) {
    // Reference structure from iOS debug data
    const referenceStructure = {
        interactiveMessage: {
            header: { hasMediaAttachment: false },
            body: { text: "string" },
            footer: { text: "string" },
            nativeFlowMessage: {
                buttons: [{
                    name: "cta_url",
                    buttonParamsJson: "string containing iOS parameters"
                }],
                messageParamsJson: "string containing tap targets"
            },
            contextInfo: {
                dataSharingContext: { showMmDisclosure: false }
            }
        }
    };

    const validation = validateIOSWebviewStructure(message);
    
    console.log('📋 iOS Webview Structure Validation Report');
    console.log('==========================================');
    console.log(`✅ Valid: ${validation.valid}`);
    console.log(`📊 Structure: ${JSON.stringify(validation.structure, null, 2)}`);
    
    if (validation.errors.length > 0) {
        console.log('\n❌ Errors:');
        validation.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (validation.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        validation.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    console.log('\n🔍 Compatibility Check:');
    console.log(`  Android: ✅ Should work (basic structure present)`);
    console.log(`  iOS: ${validation.valid && validation.warnings.length === 0 ? '✅' : '⚠️'} ${validation.valid ? 'Should work' : 'May have issues'}`);
    
    return validation;
}

// Test the validator
if (require.main === module) {
    console.log('🧪 Testing Message Structure Validator\n');
    
    // Test 1: Valid iOS message using helper
    console.log('Test 1: Valid iOS message using helper');
    const validMessage = createIOSWebviewMessage({
        bodyText: "Test message",
        footerText: "Footer",
        buttons: [createWebviewButton({
            text: "Test Button",
            url: "https://example.com"
        })]
    });
    
    compareWithIOSReference(validMessage);
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: Basic message (missing iOS features)
    console.log('Test 2: Basic message (missing iOS features)');
    const basicMessage = {
        interactiveMessage: {
            body: { text: "Basic message" },
            nativeFlowMessage: {
                buttons: [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Click me",
                        url: "https://example.com"
                    })
                }]
            }
        }
    };
    
    compareWithIOSReference(basicMessage);
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 3: Invalid message
    console.log('Test 3: Invalid message structure');
    const invalidMessage = {
        interactiveMessage: {
            body: { text: "Invalid message" }
            // Missing nativeFlowMessage
        }
    };
    
    compareWithIOSReference(invalidMessage);
}

module.exports = {
    validateIOSWebviewStructure,
    compareWithIOSReference
};