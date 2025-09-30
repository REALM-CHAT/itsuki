const { Baileys, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { createIOSWebviewMessage, createWebviewButton } = require('../lib/Utils/ios-webview-helper');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    const sock = Baileys({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    return sock;
}

async function sendIOSWebviewMessage() {
    const sock = await connectToWhatsApp();
    
    // Example 1: Using the helper function (recommended)
    const webviewButton = createWebviewButton({
        text: "Senarai Produk",
        url: "https://w.meta.me/s/23c4yBaHWk9qSVV",
        landingPageUrl: "https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true",
        webviewInteraction: true,
        paymentLinkPreview: false
    });

    const message = createIOSWebviewMessage({
        bodyText: "⏰ *3X Ganjaran Menanti Anda Hari Ini!* 🥳✨\n\nHai hassanfuad96, \n\n*Hari Puncak Sep 25 Jualan Hari Gaji* kami sudah pun tiba & inilah peluang anda untuk memaksimumkan ganjaran dari *YouTube Shopping*!\n\n✅ Komisen dinaikkan dari 4% ke 10% \n✅ Baucar pembeli: Diskaun sehingga RM200 (*Kuantiti ditingkatkan pada Hari Puncak!)\n✅ Ganjaran tunai sehingga RM10,000\n\n🚀 *Langkah seterusnya*:\n\n1. Pilih & tag produk Shopee dalam konten anda\n2. Promosikan bersama baucar diskaun pembeli\n\nKlik pautan di bawah untuk pilih produk terbaik untuk dikongsi. ⬇️",
        footerText: "Balas \"Unsub\" untuk menarik diri.",
        buttons: [webviewButton],
        contextInfo: {
            dataSharingContext: {
                showMmDisclosure: false
            }
        }
    });

    await sock.sendMessage('YOUR_PHONE_NUMBER@s.whatsapp.net', message);

    // Example 2: Using the traditional interactiveButtons approach (now iOS-compatible)
    const traditionalMessage = {
        text: "This is a test message with iOS-compatible webview button",
        footer: "Footer text here",
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
        ],
        // This will be automatically generated if not provided
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
    };

    await sock.sendMessage('YOUR_PHONE_NUMBER@s.whatsapp.net', traditionalMessage);
}

// Run the example
sendIOSWebviewMessage().catch(console.error);