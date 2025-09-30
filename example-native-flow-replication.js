const { makeWASocket, DisconnectReason, useMultiFileAuthState } = require('./lib');

async function replicateNativeFlowMessage() {
    // Your auth state setup
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                replicateNativeFlowMessage();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
            sendNativeFlowMessage();
        }
    });

    async function sendNativeFlowMessage() {
        const recipientJid = '60162995172@s.whatsapp.net'; // Replace with actual recipient
        
        // This structure will be automatically converted to iOS-compatible format
        const interactiveMessage = {
            header: {
                title: '⏰ *3X Ganjaran Menanti Anda Hari Ini!* 🥳✨',
                subtitle: '',
                hasMediaAttachment: false
            },
            body: {
                text: `Hai hassanfuad96, 

*Hari Puncak Sep 25 Jualan Hari Gaji* kami sudah pun tiba & inilah peluang anda untuk memaksimumkan ganjaran dari *YouTube Shopping*!

✅ Komisen dinaikkan dari 4% ke 10% 
✅ Baucar pembeli: Diskaun sehingga RM200 (*Kuantiti ditingkatkan pada Hari Puncak!)
✅ Ganjaran tunai sehingga RM10,000

🚀 *Langkah seterusnya*:

1. Pilih & tag produk Shopee dalam konten anda
2. Promosikan bersama baucar diskaun pembeli

Klik pautan di bawah untuk pilih produk terbaik untuk dikongsi. ⬇️`
            },
            footer: {
                text: 'Balas "Unsub" untuk menarik diri.'
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: 'Senarai Produk',
                            url: 'https://w.meta.me/s/23c4yBaHWk9qSVV',
                            webview_presentation: null,
                            payment_link_preview: false,
                            landing_page_url: 'https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w',
                            webview_interaction: true
                        })
                    }
                ]
            }
        };

        try {
            const result = await sock.sendMessage(recipientJid, {
                interactiveMessage: interactiveMessage
            });
            
            console.log('✅ Native flow message sent successfully!');
            console.log('Message ID:', result.key.id);
            
            // The library will automatically:
            // 1. Generate proper messageParamsJson with tap_target_configuration
            // 2. Use landing_page_url in tap targets for iOS compatibility
            // 3. Set webview_interaction: true for iOS webview support
            // 4. Create proper tap_target_list structure
            
        } catch (error) {
            console.error('❌ Error sending message:', error);
        }
    }
}

// Alternative: Using the simplified approach with open_webview (auto-converted to cta_url)
async function sendOpenWebviewMessage() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');
    const sock = makeWASocket({ auth: state });

    const interactiveMessage = {
        body: { text: 'Your message text here...' },
        footer: { text: 'Footer text' },
        nativeFlowMessage: {
            buttons: [
                {
                    name: 'open_webview',  // This will be auto-converted to cta_url for iOS
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Senarai Produk',
                        url: 'https://shopee.com.my/m/youtube-shopping?smtt=9&utm_campaign=YTShoppingPDUpsize&is_retargeting=true&fbclid=IwAR66DCd_1DB1sRAbjSRH6JgGBVeX7uBsxLgjcHnWI477talO-Y6pZRT_9fD9Sg_wapm_z8FrX592RTaJGzRD8F0HBA_waaem_Va9nUa6a0nkZ_PxD4rrO5w'
                    })
                }
            ]
        }
    };

    await sock.sendMessage('60162995172@s.whatsapp.net', {
        interactiveMessage: interactiveMessage
    });
}

// Run the example
replicateNativeFlowMessage().catch(console.error);