class Resources {
    static get version() { return '1.0.1'; }
}

Resources.Samples = {
    en: {
        bot: {
            name: 'Basic Telegram Bot Machine',
            short_description: 'BTB Machine - A simple bot that demonstrates the basic functionality of a Telegram bot.',
            description: 'This bot demonstrates the basic functionality of a Telegram bot. It provides the following commands:\n\n' +
                '/start - Start the bot\n' +
                '/howami - Who am I? (This command will tell you about yourself and your "chat_id")\n' +
                '/help - Get help on using the bot, or report an issue\n' +
                '/about - About the bot',
            commands: [
                {
                    command: '/start',
                    description: 'Start the bot'
                },
                {
                    command: '/help',
                    description: 'Get help'
                },
                {
                    command: '/about',
                    description: 'About the bot'
                }
            ]
        },
        actions: [
            ['/start', JSON.stringify( {
                method: 'sendPhoto',
                payload: {
                    caption: 'Hello ‼️' + '\n\n'
                        + '<blockquote expandable>Expandable Block \n'
                        + 'This is a simple bot that demonstrates the basic functionality of a Telegram bot.'
                        + 'It provides the following commands:\n\n'
                        + '/start - Start the bot\n'
                        + '/help - Get help\n'
                        + '/about - About the bot'
                        + '</blockquote>',
                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "YouTube™", web_app: { url: "https://www.youtube.com" } }],
                            [{ text: "Who am I", callback_data: "code=whoami" }],
                            [
                                { text: 'Help', callback_data: "action=help" },
                                { text: 'About', callback_data: "action=about" }
                            ]
                        ]
                    }
                }
            })],
            ['/help', JSON.stringify( {
                method: 'editMessageMedia',
                payload: {
                    caption: 'Hi there! How can I help you?',
                    parse_mode: 'HTML',
                    media: "https://www.gstatic.com/webp/gallery/2.jpg",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "BACK", callback_data: "action=start" }]
                        ]
                    }
                }
            })],
            ['/about', JSON.stringify( {
                method: 'editMessageMedia',
                payload: {
                    caption: 'Hi there! I am a simple bot that demonstrates the basic functionality of a Telegram bot.',
                    media: "https://www.gstatic.com/webp/gallery/3.jpg",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "GitHub", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } }],
                            [{ text: "BACK", callback_data: "action=start" }]
                        ]
                    }
                }
            })],
        ],
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Resources }; 
}