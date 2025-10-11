class Resources {
    static get version() { return '1.0.1'; }
    static get build() { return '20251011.183400'; }
    static get author() { return '<Ilan Lal>(https://github.com/ilanlal)'; }
    static get license() { return 'MIT'; }
    static get repository() { return 'https://github.com/ilanlal/basic-telegram-bot-remastered'; }
    static getVersion() { return Resources.version; }
    static getBuild() { return Resources.build; }
    static getAuthor() { return Resources.author; }
    static getLicense() { return Resources.license; }
    static getRepository() { return Resources.repository; }
}

Resources.Samples = {
    default: {
        bot: {
            name: 'Bot Machine',
            short_description: 'BotMac - Open Source Telegram Bot Framework.',
            description: 'This bot demonstrates the basic functionality of a Telegram bot. It provides the following commands:\n\n' +
                '/start - Start the bot\n' +
                '/home - Home (This command will show you main menu, home page)\n' +
                '/howami - Who am I? (This command will tell you about yourself and your "chat_id")\n' +
                '/whoru - Who are you? (This command will tell you about the bot)\n' +
                '/help - Get help on using the bot, or report an issue\n' +
                '/about - About the bot',
            commands: [
                {
                    command: '/start',
                    description: 'Start the bot'
                },
                {
                    command: '/home',
                    description: 'Home (This command will show you main menu, home page)'
                },
                {
                    command: '/howami',
                    description: 'Who am I? (This command will tell you about yourself and your "chat_id")'
                },
                {
                    command: '/whoru',
                    description: 'Who are you? (This command will tell you about the bot)'
                },
                {
                    command: '/help',
                    description: 'Get help on using the bot, or report an issue'
                },
                {
                    command: '/about',
                    description: 'About the bot'
                }
            ]
        },
        actions: [
            ['/start', JSON.stringify({
                method: 'sendMessage',
                payload: {
                    text: 'Hello ‼️' + '\n\n'
                        + '<blockquote>\n'
                        + 'This is a simple bot that demonstrates the basic functionality of a Telegram bot.'
                        + 'It provides the following commands:\n\n'
                        + '/home - Home (This command will show you main menu, home page)\n'
                        + '/howami - Who am I? (This command will tell you about yourself and your "chat_id")\n'
                        + '/whoru - Who are you? (This command will tell you about the bot)\n'
                        + '/help - Get help\n'
                        + '/about - About the bot\n'
                        + '</blockquote>' + '\n\n'
                        + 'You can interact with me using the buttons below or by typing commands.'
                        + '\n'
                        + 'Feel free to explore and interact with the bot!'
                        + '\n'
                        + 'For any issues or suggestions, please visit our GitHub repository.\n'
                        + '\n'
                        + 'Happy chatting! 😊'
                        + '\n',
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Home", callback_data: "/home" }
                            ]
                        ]
                    }
                }
            })],
            ['/home', JSON.stringify({
                method: 'sendPhoto',
                payload: {
                    caption: 'Welcome to Bot Machine! \n\n'
                        + '<blockquote expandable>Sample Expandable Block: \n'
                        + 'This is a simple bot that demonstrates the basic functionality of a Telegram bot.'
                        + 'It provides the following commands:\n\n'
                        + '</blockquote>',
                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "YouTube™", web_app: { url: "https://www.youtube.com" } }],
                            [{ text: "Send Message", callback_data: "sendMessage" }],
                            [{ text: "Send Photo", callback_data: "sendPhoto" }],
                            [{ text: "Send Media Group", callback_data: "sendMediaGroup" }],
                            [{ text: "How Am I?", callback_data: "/howami" }],
                            [{ text: "Who Are You?", callback_data: "/whoru" }],
                            // Two buttons in one row
                            [
                                { text: 'Help', callback_data: "action=help" },
                                { text: 'About', callback_data: "action=about" }
                            ]
                        ]
                    }
                }
            })],
            ['/help', JSON.stringify({
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
            ['/about', JSON.stringify({
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
            ['_not_found_', JSON.stringify({
                method: 'sendMessage',
                payload: {
                    text: 'Oops! Command not found. Please use /help to see the list of available commands.',
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Home", callback_data: "/home" }]
                        ]
                    }
                }
            })],
            ['sendMessage', JSON.stringify({
                method: 'sendMessage',
                payload: {
                    text: 'Hello! This is a sample message. You can customize this message as needed. \n\n'
                        + 'Feel free to explore and interact with the bot!'
                        + '\n\n'
                        + 'When "parse_mode" is set to HTML or Markdown, you can use the following formatting options:\n\n'
                        + '<b>Bold</b>, <strong>Bold</strong>\n'
                        + '<i>Italic</i>, <em>Italic</em>\n'
                        + '<u>Underline</u>\n'
                        + '<s>Strikethrough</s>\n'
                        + '<code>Code</code>\n'
                        + '<blockquote> Sample Blockquote: \n'
                        + 'This is a simple bot that demonstrates the basic functionality of a Telegram bot.'
                        + 'It provides the following commands:\n\n'
                        + '</blockquote>'
                        + '<blockquote expandable> Sample Expandable Block: \n'
                        + 'This is a simple bot that demonstrates the basic functionality of a Telegram bot.'
                        + 'It provides the following commands:\n\n'
                        + '</blockquote>',
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Home", callback_data: "/home" }]
                        ]
                    }
                }
            })],
            ['sendPhoto', JSON.stringify({
                method: 'sendPhoto',
                payload: {
                    caption: 'This is a sample photo. You can customize this caption as needed. \n\n'
                        + 'Feel free to explore and interact with the bot!'
                        + '\n\n'
                        + 'When "parse_mode" is set to HTML or Markdown, you can use the following formatting options:\n\n'
                        + '<b>Bold</b>, <strong>Bold</strong>\n'
                        + '<i>Italic</i>, <em>Italic</em>\n'
                        + '<u>Underline</u>\n'
                        + '<s>Strikethrough</s>\n'
                        + '<code>Code</code>\n',
                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Home", callback_data: "/home" }]
                        ]
                    }
                }
            })],
            ['sendMediaGroup', JSON.stringify({
                method: 'sendMediaGroup',
                payload: {
                    media: [
                        {
                            type: 'photo',
                            media: 'https://www.gstatic.com/webp/gallery/1.jpg',
                            caption: 'Photo 1 <b>Bold</b>, <strong>Bold</strong>\n<i>Italic</i>, <em>Italic</em>\n<u>Underline</u>\n<s>Strikethrough</s>\n<code>Code</code>'
                        },
                        {
                            type: 'photo',
                            media: 'https://www.gstatic.com/webp/gallery/2.jpg',
                            caption: 'Photo 2 <b>Bold</b>, <strong>Bold</strong>\n<i>Italic</i>, <em>Italic</em>\n<u>Underline</u>\n<s>Strikethrough</s>\n<code>Code</code>'
                        },
                        {
                            type: 'photo',
                            media: 'https://www.gstatic.com/webp/gallery/3.jpg',
                            caption: 'Photo 3 <b>Bold</b>, <strong>Bold</strong>\n<i>Italic</i>, <em>Italic</em>\n<u>Underline</u>\n<s>Strikethrough</s>\n<code>Code</code>'
                        }
                    ],
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Home", callback_data: "/home" }]
                        ]
                    }
                }
            })]
        ]
    }
};

Resources.Languages = {
    en: Resources.Samples.default
    // Add other languages here as needed
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Resources };
}