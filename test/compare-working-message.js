const { generateWAMessageContent } = require('../lib/Utils/messages');

/**
 * Analyze the working iOS message structure from another number
 * and compare it with our generated messages
 */
async function analyzeWorkingIOSMessage() {
    console.log('🔍 Analyzing Working iOS Message Structure\n');

    // The working message structure from another number (iOS compatible)
    const workingIOSMessage = {
        "interactiveMessage": {
            "header": {
                "imageMessage": {
                    "url": "https://mmg.whatsapp.net/v/t62.7118-24/553561817_1270088531582412_5399490495501014210_n.enc?ccb=11-4&oh=01_Q5Aa2gHU27BgTX_PDOAAk5Z5uPM28C6aqzeJDl9_i83OvPpDKA&oe=68FC69E2&_nc_sid=5e03e0&mms3=true",
                    "mimetype": "image/jpeg",
                    "fileSha256": "mHOCJepgcIW/CPaQgb6ybcU70Crahi9MvrNwZyW+1Ms=",
                    "fileLength": "43284",
                    "height": 400,
                    "width": 750,
                    "mediaKey": "5Qe/8EjcQ42WLihnv19cQMWW+pS7jH5Qf4cXxmAU/fQ=",
                    "fileEncSha256": "wy9xLC/8Aqne8Wohoe7F9QMrRN77UUrBcfGRzB9CWp8=",
                    "directPath": "/v/t62.7118-24/553561817_1270088531582412_5399490495501014210_n.enc?ccb=11-4&oh=01_Q5Aa2gHU27BgTX_PDOAAk5Z5uPM28C6aqzeJDl9_i83OvPpDKA&oe=68FC69E2&_nc_sid=5e03e0",
                    "mediaKeyTimestamp": "1758791107",
                    "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAAmAEgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBzRRAkDPTOc1AVHZhTaKk3SHALzlsfhRhf736U2ikUOIA6HNAUscCjC7M55z0pSGQj0PegL2FEbYztOKaQR1FXULBcHHtUEwLFmYgY4AptEqetiCipGVBECDlqKRadxEIC8+vpmnAgen/fNRA4o3H2pkWJQVz2/wC+aNy+o/75qHNFAWHNgvx09hUyFSgGB6c1CjbXBxnFLu/e7tvfOKBSv0LuAaqbh096nFxGR1IqqgLyAL1NN6kK6EYEHkYoqWWN8FyQQOKKk1TuQ0cUUUwCiiigAooopAFKjlHDDqKKKAHvOWQrtABooooC1j//2Q==",
                    "thumbnailDirectPath": "/v/t62.35850-24/553466321_806174451863657_492237013295838280_n.enc?ccb=11-4&oh=01_Q5Aa2gED938cJKKYvnsJBBpggGuZnwcx5PWi2_S_em42Ke7jhA&oe=68FC8EA1&_nc_sid=5e03e0",
                    "thumbnailSha256": "xVf/5D1//CCzA8axT1elLynl46ciLenf1wkPaV0rXcE=",
                    "thumbnailEncSha256": "FRo1h957T19R34xS+P6f51Mlhjvj+sHwUO4oTGAsuaM="
                },
                "hasMediaAttachment": true
            },
            "body": {
                "text": "⏰ *3X Ganjaran Menanti Anda Hari Ini!* 🥳✨\n\nHai hassanfuad96, \n\n*Hari Puncak Sep 25 Jualan Hari Gaji* kami sudah pun tiba & inilah peluang anda untuk memaksimumkan ganjaran dari *YouTube Shopping*!\n\n✅ Komisen dinaikkan dari 4% ke 10% \n✅ Baucar pembeli: Diskaun sehingga RM200 (*Kuantiti ditingkatkan pada Hari Puncak!)\n✅ Ganjaran tunai sehingga RM10,000\n\n🚀 *Langkah seterusnya*:\n\n1. Pilih & tag produk Shopee dalam konten anda\n2. Promosikan bersama baucar diskaun pembeli\n\nKlik pautan di bawah untuk pilih produk terbaik untuk dikongsi. ⬇️"
            },
            "footer": {
                "text": "Balas \"Unsub\" untuk menarik diri."
            },
            "nativeFlowMessage": {
                "buttons": [
                    {
                        "name": "cta_url",
                        "buttonParamsJson": "{\"display_text\":\"Senarai Produk\",\"url\":\"https:\\/\\/w.meta.me\\/s\\/23c4yBaHWk9qSVV\",\"webview_presentation\":null,\"payment_link_preview\":false,\"landing_page_url\":\"https:\\/\\/shopee.com.my\\/m\\/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w\",\"webview_interaction\":true}"
                    }
                ],
                "messageParamsJson": "{\"bottom_sheet\":{\"in_thread_buttons_limit\":3,\"divider_indices\":[]},\"tap_target_configuration\":{\"canonical_url\":\"https:\\/\\/shopee.com.my\\/m\\/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w\",\"url_type\":\"STATIC\",\"button_index\":0,\"tap_target_format\":1},\"tap_target_list\":[{\"canonical_url\":\"https:\\/\\/shopee.com.my\\/m\\/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w\",\"url_type\":\"STATIC\",\"button_index\":0,\"tap_target_format\":1}]}"
            },
            "contextInfo": {
                "dataSharingContext": {
                    "showMmDisclosure": false
                }
            }
        }
    };

    console.log('📱 Analyzing Working iOS Message Structure:');
    console.log('==========================================');

    // Analyze the working button
    const workingButton = workingIOSMessage.interactiveMessage.nativeFlowMessage.buttons[0];
    console.log('✅ Working Button Analysis:');
    console.log(`   • Button Type: ${workingButton.name}`);
    
    try {
        const workingParams = JSON.parse(workingButton.buttonParamsJson);
        console.log('   • Button Parameters:');
        console.log(`     - display_text: "${workingParams.display_text}"`);
        console.log(`     - url: "${workingParams.url}"`);
        console.log(`     - webview_presentation: ${workingParams.webview_presentation}`);
        console.log(`     - payment_link_preview: ${workingParams.payment_link_preview}`);
        console.log(`     - landing_page_url: "${workingParams.landing_page_url}"`);
        console.log(`     - webview_interaction: ${workingParams.webview_interaction}`);
        console.log(`     - merchant_url: ${workingParams.merchant_url || 'NOT PRESENT'}`);
    } catch (e) {
        console.log('   ❌ Error parsing working button parameters');
    }

    // Analyze messageParamsJson
    console.log('\n✅ Working messageParamsJson Analysis:');
    try {
        const workingMessageParams = JSON.parse(workingIOSMessage.interactiveMessage.nativeFlowMessage.messageParamsJson);
        console.log('   • tap_target_configuration:');
        if (workingMessageParams.tap_target_configuration) {
            console.log(`     - canonical_url: "${workingMessageParams.tap_target_configuration.canonical_url}"`);
            console.log(`     - url_type: "${workingMessageParams.tap_target_configuration.url_type}"`);
            console.log(`     - button_index: ${workingMessageParams.tap_target_configuration.button_index}`);
            console.log(`     - tap_target_format: ${workingMessageParams.tap_target_configuration.tap_target_format}`);
        }
        console.log(`   • tap_target_list: ${workingMessageParams.tap_target_list ? workingMessageParams.tap_target_list.length + ' entries' : 'NOT PRESENT'}`);
        if (workingMessageParams.tap_target_list && workingMessageParams.tap_target_list.length > 0) {
            console.log(`     - First entry canonical_url: "${workingMessageParams.tap_target_list[0].canonical_url}"`);
        }
    } catch (e) {
        console.log('   ❌ Error parsing working messageParamsJson');
    }

    console.log('\n🔄 Now generating our equivalent message for comparison...\n');

    // Generate our equivalent message
    const ourMessage = {
        text: "⏰ *3X Ganjaran Menanti Anda Hari Ini!* 🥳✨\n\nHai hassanfuad96, \n\n*Hari Puncak Sep 25 Jualan Hari Gaji* kami sudah pun tiba & inilah peluang anda untuk memaksimumkan ganjaran dari *YouTube Shopping*!\n\n✅ Komisen dinaikkan dari 4% ke 10% \n✅ Baucar pembeli: Diskaun sehingga RM200 (*Kuantiti ditingkatkan pada Hari Puncak!)\n✅ Ganjaran tunai sehingga RM10,000\n\n🚀 *Langkah seterusnya*:\n\n1. Pilih & tag produk Shopee dalam konten anda\n2. Promosikan bersama baucar diskaun pembeli\n\nKlik pautan di bawah untuk pilih produk terbaik untuk dikongsi. ⬇️",
        footer: "Balas \"Unsub\" untuk menarik diri.",
        interactiveButtons: [
            {
                "name": "cta_url",
                "buttonParamsJson": "{\"display_text\":\"Senarai Produk\",\"url\":\"https:\\/\\/w.meta.me\\/s\\/23c4yBaHWk9qSVV\",\"webview_presentation\":null,\"payment_link_preview\":false,\"landing_page_url\":\"https:\\/\\/shopee.com.my\\/m\\/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w\",\"webview_interaction\":true}"
            }
        ]
    };

    try {
        const ourResult = await generateWAMessageContent(ourMessage);
        const ourButton = ourResult.interactiveMessage.nativeFlowMessage.buttons[0];

        console.log('🔧 Our Generated Message Analysis:');
        console.log('==================================');
        console.log(`✅ Our Button Type: ${ourButton.name}`);
        
        try {
            const ourParams = JSON.parse(ourButton.buttonParamsJson);
            console.log('✅ Our Button Parameters:');
            console.log(`   - display_text: "${ourParams.display_text}"`);
            console.log(`   - url: "${ourParams.url}"`);
            console.log(`   - webview_presentation: ${ourParams.webview_presentation}`);
            console.log(`   - payment_link_preview: ${ourParams.payment_link_preview}`);
            console.log(`   - landing_page_url: "${ourParams.landing_page_url}"`);
            console.log(`   - webview_interaction: ${ourParams.webview_interaction}`);
            console.log(`   - merchant_url: ${ourParams.merchant_url || 'NOT PRESENT'}`);
        } catch (e) {
            console.log('❌ Error parsing our button parameters');
        }

        // Compare messageParamsJson
        console.log('\n✅ Our messageParamsJson Analysis:');
        if (ourResult.interactiveMessage.nativeFlowMessage.messageParamsJson) {
            try {
                const ourMessageParams = JSON.parse(ourResult.interactiveMessage.nativeFlowMessage.messageParamsJson);
                console.log('   • tap_target_configuration:');
                if (ourMessageParams.tap_target_configuration) {
                    console.log(`     - canonical_url: "${ourMessageParams.tap_target_configuration.canonical_url}"`);
                    console.log(`     - url_type: "${ourMessageParams.tap_target_configuration.url_type}"`);
                    console.log(`     - button_index: ${ourMessageParams.tap_target_configuration.button_index}`);
                    console.log(`     - tap_target_format: ${ourMessageParams.tap_target_configuration.tap_target_format}`);
                }
                console.log(`   • tap_target_list: ${ourMessageParams.tap_target_list ? ourMessageParams.tap_target_list.length + ' entries' : 'NOT PRESENT'}`);
                if (ourMessageParams.tap_target_list && ourMessageParams.tap_target_list.length > 0) {
                    console.log(`     - First entry canonical_url: "${ourMessageParams.tap_target_list[0].canonical_url}"`);
                }

                console.log('\n🔍 KEY DIFFERENCES ANALYSIS:');
                console.log('============================');

                // Compare tap_target_configuration URLs
                const workingMessageParams = JSON.parse(workingIOSMessage.interactiveMessage.nativeFlowMessage.messageParamsJson);
                
                if (workingMessageParams.tap_target_configuration && ourMessageParams.tap_target_configuration) {
                    const workingUrl = workingMessageParams.tap_target_configuration.canonical_url;
                    const ourUrl = ourMessageParams.tap_target_configuration.canonical_url;
                    
                    if (workingUrl !== ourUrl) {
                        console.log('⚠️  DIFFERENCE FOUND: tap_target_configuration URLs differ');
                        console.log(`   Working URL: "${workingUrl}"`);
                        console.log(`   Our URL: "${ourUrl}"`);
                        
                        // Check if working message uses landing_page_url in tap_target_configuration
                        const workingButtonParams = JSON.parse(workingButton.buttonParamsJson);
                        if (workingUrl === workingButtonParams.landing_page_url) {
                            console.log('🎯 INSIGHT: Working message uses landing_page_url in tap_target_configuration');
                            console.log('   Our message uses the main URL instead');
                        }
                    } else {
                        console.log('✅ tap_target_configuration URLs match');
                    }
                }

                // Compare tap_target_list URLs
                if (workingMessageParams.tap_target_list && ourMessageParams.tap_target_list) {
                    const workingListUrl = workingMessageParams.tap_target_list[0].canonical_url;
                    const ourListUrl = ourMessageParams.tap_target_list[0].canonical_url;
                    
                    if (workingListUrl !== ourListUrl) {
                        console.log('⚠️  DIFFERENCE FOUND: tap_target_list URLs differ');
                        console.log(`   Working URL: "${workingListUrl}"`);
                        console.log(`   Our URL: "${ourListUrl}"`);
                    } else {
                        console.log('✅ tap_target_list URLs match');
                    }
                }

            } catch (e) {
                console.log('❌ Error parsing our messageParamsJson');
            }
        } else {
            console.log('❌ Our message does not have messageParamsJson');
        }

    } catch (error) {
        console.error('❌ Error generating our message:', error);
    }
}

// Run the analysis
if (require.main === module) {
    analyzeWorkingIOSMessage().then(() => {
        console.log('\n🏁 Analysis completed');
    }).catch(error => {
        console.error('❌ Analysis failed:', error);
        process.exit(1);
    });
}

module.exports = { analyzeWorkingIOSMessage };