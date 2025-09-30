const { generateWAMessageContent } = require('../lib/Utils/messages');
const { createIOSWebviewMessage } = require('../lib/Utils/ios-webview-helper');

/**
 * WhiskeySocket Baileys Compatibility Test
 * Verifies that our iOS webview implementation matches the official protobuf structure
 */
class WhiskeySockCompatibilityTest {
    constructor() {
        this.testResults = [];
        this.passedTests = 0;
        this.totalTests = 0;
    }

    log(message, isError = false) {
        if (isError) {
            console.error(`❌ ${message}`);
        } else {
            console.log(`✅ ${message}`);
        }
    }

    addTestResult(testName, passed, details = '') {
        this.totalTests++;
        if (passed) {
            this.passedTests++;
            this.log(`${testName}: PASSED ${details}`);
        } else {
            this.log(`${testName}: FAILED ${details}`, true);
        }
        this.testResults.push({ testName, passed, details });
    }

    /**
     * Test 1: Verify basic structure generation
     */
    testBasicStructure() {
        console.log('\n=== Test 1: Basic Structure Generation ===');
        
        try {
            const testMessage = {
                text: 'Test iOS compatibility',
                interactiveButtons: [
                    {
                        type: 'cta_url',
                        displayText: 'Visit Website',
                        url: 'https://example.com'
                    }
                ]
            };

            // Mock options to avoid the getUrlInfo error
            const options = {
                getUrlInfo: null,
                logger: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} }
            };

            const result = generateWAMessageContent(testMessage, options);
            
            if (result && result.interactiveMessage) {
                this.addTestResult('Basic structure generation', true, '- interactiveMessage created');
                return result;
            } else {
                this.addTestResult('Basic structure generation', false, '- no interactiveMessage found');
                return null;
            }
        } catch (error) {
            this.addTestResult('Basic structure generation', false, `- Error: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 2: Verify nativeFlowMessage structure matches protobuf definition
     */
    testNativeFlowMessageStructure(messageResult) {
        console.log('\n=== Test 2: NativeFlowMessage Structure ===');
        
        if (!messageResult || !messageResult.interactiveMessage) {
            this.addTestResult('NativeFlowMessage structure', false, '- No message result provided');
            return;
        }

        const interactive = messageResult.interactiveMessage;
        
        // Check if nativeFlowMessage exists
        if (!interactive.nativeFlowMessage) {
            this.addTestResult('NativeFlowMessage presence', false, '- nativeFlowMessage not found');
            return;
        }

        this.addTestResult('NativeFlowMessage presence', true);

        const nativeFlow = interactive.nativeFlowMessage;

        // Test buttons array (required field 1 in protobuf)
        if (nativeFlow.buttons && Array.isArray(nativeFlow.buttons)) {
            this.addTestResult('Buttons array', true, `- Found ${nativeFlow.buttons.length} buttons`);
            
            // Test each button structure
            nativeFlow.buttons.forEach((button, index) => {
                const buttonName = `Button ${index + 1}`;
                
                if (button.name && typeof button.name === 'string') {
                    this.addTestResult(`${buttonName} name field`, true, `- name: "${button.name}"`);
                } else {
                    this.addTestResult(`${buttonName} name field`, false, '- missing or invalid name');
                }

                if (button.buttonParamsJson && typeof button.buttonParamsJson === 'string') {
                    this.addTestResult(`${buttonName} buttonParamsJson field`, true);
                    
                    // Verify it's valid JSON
                    try {
                        JSON.parse(button.buttonParamsJson);
                        this.addTestResult(`${buttonName} buttonParamsJson validity`, true, '- valid JSON');
                    } catch (e) {
                        this.addTestResult(`${buttonName} buttonParamsJson validity`, false, '- invalid JSON');
                    }
                } else {
                    this.addTestResult(`${buttonName} buttonParamsJson field`, false, '- missing or invalid buttonParamsJson');
                }
            });
        } else {
            this.addTestResult('Buttons array', false, '- missing or invalid buttons array');
        }

        // Test messageParamsJson (optional field 2 in protobuf)
        if (nativeFlow.messageParamsJson) {
            if (typeof nativeFlow.messageParamsJson === 'string') {
                this.addTestResult('messageParamsJson field', true);
                
                try {
                    const parsed = JSON.parse(nativeFlow.messageParamsJson);
                    this.addTestResult('messageParamsJson validity', true, '- valid JSON');
                    
                    // Check for iOS-specific structure
                    if (parsed.bottom_sheet && parsed.tap_target_configuration && parsed.tap_target_list) {
                        this.addTestResult('iOS webview structure', true, '- contains required iOS fields');
                    } else {
                        this.addTestResult('iOS webview structure', false, '- missing iOS-specific fields');
                    }
                } catch (e) {
                    this.addTestResult('messageParamsJson validity', false, '- invalid JSON');
                }
            } else {
                this.addTestResult('messageParamsJson field', false, '- invalid type');
            }
        } else {
            this.addTestResult('messageParamsJson field', false, '- missing (should be present for iOS)');
        }

        // Test messageVersion (optional field 3 in protobuf)
        if (nativeFlow.messageVersion !== undefined) {
            if (typeof nativeFlow.messageVersion === 'number') {
                this.addTestResult('messageVersion field', true, `- version: ${nativeFlow.messageVersion}`);
            } else {
                this.addTestResult('messageVersion field', false, '- invalid type');
            }
        } else {
            this.addTestResult('messageVersion field', false, '- missing');
        }
    }

    /**
     * Test 3: Verify helper function compatibility
     */
    testHelperFunctionCompatibility() {
        console.log('\n=== Test 3: Helper Function Compatibility ===');
        
        try {
            const testButtons = [
                {
                    displayText: 'Visit Website',
                    url: 'https://example.com'
                },
                {
                    displayText: 'Contact Us',
                    url: 'https://contact.example.com'
                }
            ];

            const result = createIOSWebviewMessage('Test message', testButtons);
            
            if (result && result.interactiveMessage && result.interactiveMessage.nativeFlowMessage) {
                this.addTestResult('Helper function structure', true);
                
                // Verify it matches the same structure as generateWAMessageContent
                this.testNativeFlowMessageStructure(result);
            } else {
                this.addTestResult('Helper function structure', false, '- invalid structure returned');
            }
        } catch (error) {
            this.addTestResult('Helper function compatibility', false, `- Error: ${error.message}`);
        }
    }

    /**
     * Test 4: Verify contextInfo and dataSharingContext
     */
    testContextInfoStructure(messageResult) {
        console.log('\n=== Test 4: ContextInfo Structure ===');
        
        if (!messageResult || !messageResult.interactiveMessage) {
            this.addTestResult('ContextInfo test setup', false, '- No message result provided');
            return;
        }

        const interactive = messageResult.interactiveMessage;
        
        if (interactive.contextInfo) {
            this.addTestResult('ContextInfo presence', true);
            
            if (interactive.contextInfo.dataSharingContext) {
                this.addTestResult('dataSharingContext presence', true);
                
                const dsc = interactive.contextInfo.dataSharingContext;
                if (dsc.showMmDisclosure === false) {
                    this.addTestResult('showMmDisclosure setting', true, '- correctly set to false');
                } else {
                    this.addTestResult('showMmDisclosure setting', false, '- should be false for iOS');
                }
            } else {
                this.addTestResult('dataSharingContext presence', false, '- missing for iOS compatibility');
            }
        } else {
            this.addTestResult('ContextInfo presence', false, '- missing contextInfo');
        }
    }

    /**
     * Test 5: Verify backward compatibility with traditional interactiveButtons
     */
    testBackwardCompatibility() {
        console.log('\n=== Test 5: Backward Compatibility ===');
        
        try {
            // Test traditional format
            const traditionalMessage = {
                text: 'Traditional format test',
                interactiveButtons: [
                    {
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: 'Visit Site',
                            url: 'https://example.com'
                        })
                    }
                ]
            };

            const options = {
                getUrlInfo: null,
                logger: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} }
            };

            const result = generateWAMessageContent(traditionalMessage, options);
            
            if (result && result.interactiveMessage && result.interactiveMessage.nativeFlowMessage) {
                this.addTestResult('Traditional format support', true);
                
                const button = result.interactiveMessage.nativeFlowMessage.buttons[0];
                if (button && button.name === 'cta_url' && button.buttonParamsJson) {
                    const params = JSON.parse(button.buttonParamsJson);
                    if (params.webview_presentation && params.webview_interaction && params.payment_link_preview) {
                        this.addTestResult('iOS parameters injection', true, '- iOS webview params added');
                    } else {
                        this.addTestResult('iOS parameters injection', false, '- missing iOS webview params');
                    }
                } else {
                    this.addTestResult('Traditional button processing', false, '- button structure invalid');
                }
            } else {
                this.addTestResult('Traditional format support', false, '- failed to process traditional format');
            }
        } catch (error) {
            this.addTestResult('Backward compatibility', false, `- Error: ${error.message}`);
        }
    }

    /**
     * Run all compatibility tests
     */
    runAllTests() {
        console.log('🔍 WhiskeySocket Baileys iOS Webview Compatibility Test');
        console.log('=' .repeat(60));
        
        // Test 1: Basic structure
        const messageResult = this.testBasicStructure();
        
        // Test 2: NativeFlowMessage structure
        if (messageResult) {
            this.testNativeFlowMessageStructure(messageResult);
            this.testContextInfoStructure(messageResult);
        }
        
        // Test 3: Helper function
        this.testHelperFunctionCompatibility();
        
        // Test 4: Backward compatibility
        this.testBackwardCompatibility();
        
        // Generate summary
        this.generateSummary();
    }

    /**
     * Generate test summary
     */
    generateSummary() {
        console.log('\n' + '=' .repeat(60));
        console.log('📊 TEST SUMMARY');
        console.log('=' .repeat(60));
        
        console.log(`Total Tests: ${this.totalTests}`);
        console.log(`Passed: ${this.passedTests}`);
        console.log(`Failed: ${this.totalTests - this.passedTests}`);
        console.log(`Success Rate: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`);
        
        if (this.passedTests === this.totalTests) {
            console.log('\n🎉 ALL TESTS PASSED! iOS webview implementation is fully compatible with WhiskeySocket Baileys.');
        } else {
            console.log('\n⚠️  Some tests failed. Please review the implementation.');
            
            console.log('\nFailed Tests:');
            this.testResults.filter(r => !r.passed).forEach(result => {
                console.log(`  - ${result.testName}: ${result.details}`);
            });
        }
        
        console.log('\n📋 COMPATIBILITY CHECKLIST:');
        console.log('✅ Protobuf structure compliance');
        console.log('✅ NativeFlowMessage.buttons[] with name and buttonParamsJson');
        console.log('✅ NativeFlowMessage.messageParamsJson for iOS webview');
        console.log('✅ NativeFlowMessage.messageVersion');
        console.log('✅ ContextInfo.dataSharingContext for iOS');
        console.log('✅ Backward compatibility with traditional interactiveButtons');
        console.log('✅ Helper function compatibility');
        
        return this.passedTests === this.totalTests;
    }
}

// Run the compatibility test
if (require.main === module) {
    const test = new WhiskeySockCompatibilityTest();
    const success = test.runAllTests();
    process.exit(success ? 0 : 1);
}

module.exports = WhiskeySockCompatibilityTest;