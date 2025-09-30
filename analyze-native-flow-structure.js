// Analysis of the Native Flow Message Structure from your example

const originalMessage = {
    "interactiveMessage": {
        "header": {
            "imageMessage": {
                // Image details omitted for brevity
                "hasMediaAttachment": true
            }
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

// Parsed buttonParamsJson for better understanding
const buttonParams = {
    "display_text": "Senarai Produk",
    "url": "https://w.meta.me/s/23c4yBaHWk9qSVV",
    "webview_presentation": null,
    "payment_link_preview": false,
    "landing_page_url": "https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w",
    "webview_interaction": true
};

// Parsed messageParamsJson for better understanding
const messageParams = {
    "bottom_sheet": {
        "in_thread_buttons_limit": 3,
        "divider_indices": []
    },
    "tap_target_configuration": {
        "canonical_url": "https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w",
        "url_type": "STATIC",
        "button_index": 0,
        "tap_target_format": 1
    },
    "tap_target_list": [
        {
            "canonical_url": "https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w",
            "url_type": "STATIC",
            "button_index": 0,
            "tap_target_format": 1
        }
    ]
};

console.log('🔍 ANALYSIS OF YOUR NATIVE FLOW MESSAGE:');
console.log('==========================================');

console.log('\n📋 KEY COMPONENTS:');
console.log('1. Button Type: cta_url (iOS compatible)');
console.log('2. Main URL:', buttonParams.url);
console.log('3. Landing Page URL:', buttonParams.landing_page_url);
console.log('4. Webview Interaction:', buttonParams.webview_interaction);

console.log('\n🎯 TAP TARGET CONFIGURATION:');
console.log('- Uses landing_page_url as canonical_url');
console.log('- URL Type: STATIC');
console.log('- Button Index: 0');
console.log('- Tap Target Format: 1');

console.log('\n✅ WHAT MAKES THIS iOS COMPATIBLE:');
console.log('1. Uses cta_url button type');
console.log('2. Has webview_interaction: true');
console.log('3. Uses landing_page_url in tap targets');
console.log('4. Proper messageParamsJson structure');

console.log('\n🚀 HOW TO REPLICATE WITH BAILEYS:');
console.log('The updated Baileys library will automatically generate this structure when you use:');
console.log('- cta_url buttons with landing_page_url');
console.log('- open_webview buttons (auto-converted to cta_url)');

module.exports = {
    originalMessage,
    buttonParams,
    messageParams
};