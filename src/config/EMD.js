// Entity Metadata Configuration Class
class EMD {
    constructor() {
    }
}

EMD.DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png';

EMD.Home = {
    entityName: 'Home',
    displayName: 'Home',
    pluralDisplayName: 'Homes',
    cardMeta: {
        name: 'homeCard',
        header: {
            title: 'Home',
            subTitle: 'Welcome to your home',
            imageUrl: EMD.DEFAULT_IMAGE_URL,
            imageStyle: CardService.ImageStyle.SQUARE,
            imageAltText: 'Home Image'
        },
        sections: [{
            header: 'Section 1',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: [
                {
                    DecoratedText: {
                        text: 'Environment management',
                        topLabel: 'Environment',
                        bottomLabel: '{state}',
                        wrapText: true,
                        textButton: {
                            text: '⚙️',
                            functionName: 'EventHandler.Addon.environment',
                            parameters: { action: 'manageEnvironments' }
                        }
                    }
                },
                {
                    DecoratedText: {
                        text: 'Bots management',
                        topLabel: 'Bots {total}',
                        bottomLabel: 'Manage your bots here',
                        wrapText: true,
                        textButton: {
                            disabled: false,
                            text: '🤖',
                            functionName: 'EventHandler.Addon.bots',
                            parameters: { action: 'manageBots' }
                        }
                    }
                },
                {
                    DecoratedText: {
                        text: 'Automations management',
                        topLabel: 'Automations {total}',
                        bottomLabel: 'Manage your automations here',
                        wrapText: true,
                        textButton: {
                            text: '⚡',
                            functionName: 'EventHandler.Addon.automation',
                            parameters: { action: 'manageAutomations' }
                        }
                    }
                }
            ]
        }]
    }
};

EMD.Environment = {
    entityName: 'Environment',
    displayName: 'Environment',
    pluralDisplayName: 'Environments',
    sheetMeta: {
        name: 'Environments',
        columns: ['Parameter', 'Value', 'Description', 'CreatedAt', 'UpdatedAt'],
        sample_data: [
            ['TELEGRAM_BOT_API_URL', 'https://api.telegram.org', 'Base URL for Telegram Bot API'],
            ['DEFAULT_LANGUAGE', 'en', 'Default language for the bot responses'],
            ['LOG_LEVEL', 'INFO', 'Logging level for the application']
        ]
    }
};

EMD.Bot = {
    entityName: 'Bot',
    displayName: 'Bot',
    pluralDisplayName: 'Bots',
    sheetMeta: {
        name: 'Bots',
        columns: ['Token', 'Deployment ID', 'Admin Chat ID', 'Debug Mode', 'API Resource Object'],
        sample_data: [
            ['123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11', 'deploy_001', '987654321', 'true', '{"id": "123456", "name": "Sample Bot"}']
        ]
    },
    cardMeta: {
        name: 'botIndexCard',
        header: {
            title: 'Bots',
            subTitle: 'List of all bots',
            imageUrl: EMD.DEFAULT_IMAGE_URL,
            imageStyle: CardService.ImageStyle.SQUARE,
            imageAltText: 'Bot Image'
        },
        sections: [{
            header: 'Section 1',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: []
        }],
        fixedFooter: {
            primaryButton: {
                textButton: {
                    text: 'Add Bot',
                    functionName: 'EventHandler.Addon.onAddBot',
                    parameters: {
                        action: 'addBot'
                    }
                }
            }
        }
    },
    sampleBotInfo: {
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
    }
};

EMD.Automation = {
    entityName: 'Automation',
    displayName: 'Automation',
    pluralDisplayName: 'Automations',
    sheetMeta: {
        name: 'Automations',
        columns: ['ID', '{language}'],
        sample_data: [
            ['_not_found_', JSON.stringify([{
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
            }])],
            ['/start', JSON.stringify([{
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
            }])],
            ['/home', JSON.stringify([{
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
                            ],
                            [{ text: "Keypad Samples", callback_data: "keypadSamples" }]
                        ]
                    }
                }
            }])],
            ['/help', JSON.stringify([{
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
            }])],
            ['/about', JSON.stringify([{
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
            }])],
            ['store', JSON.stringify([{
                method: 'sendPhoto',
                payload: {
                    caption: 'Welcome to the Store! Here you can find various products and services.',
                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Browse Products", callback_data: "browseProducts" }],
                            [{ text: "View Cart", callback_data: "viewCart" }],
                            [{ text: "Checkout", callback_data: "checkout" }],
                            [{ text: "BACK", callback_data: "action=start" }]
                        ]
                    }
                }
            }])],
            ['browseProducts', JSON.stringify([{
                method: 'sendPhoto',
                payload: {
                    caption: 'Product A: An amazing product that you will love! \n\n'
                        + '<b>Price:</b> $19.99\n'
                        + '<i>Description:</i> This product is made from high-quality materials and offers great value for money.\n\n'
                        + 'Click "Add to Cart" to purchase this product.',
                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "➕ Add to Cart", callback_data: "addToCart_productA" }],
                            [{ text: "👀 Watch price", callback_data: "watchPrice_productA" }]
                        ]
                    }
                }
            }, {
                method: 'sendPhoto',
                payload: {
                    caption: 'Product B: Another fantastic product that meets your needs! \n\n',
                    photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "➕ Add to Cart", callback_data: "addToCart_productB" }],
                            [{ text: "👀 Watch price", callback_data: "watchPrice_productB" }]
                        ]
                    }
                }
            }, {
                method: 'sendPhoto',
                payload: {
                    caption: 'Product C: A must-have item for everyone! \n\n',
                    photo: "https://www.gstatic.com/webp/gallery/3.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "➕ Add to Cart", callback_data: "addToCart_productC" }],
                            [{ text: "👀 Watch price", callback_data: "watchPrice_productC" }]
                        ]
                    }
                }
            }, {
                method: 'sendPhoto',
                payload: {
                    caption: 'Product C: A must-have item for everyone! \n\n',
                    photo: "https://www.gstatic.com/webp/gallery/3.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "➕ Add to Cart", callback_data: "addToCart_productC" }],
                            [{ text: "👀 Watch price", callback_data: "watchPrice_productC" }]
                        ]
                    }
                }
            }
            ])],
            ['apiFeatures', JSON.stringify([{
                method: 'sendMessage',
                payload: {
                    text: 'Here are some API features you can use:\n\n'
                        + '1. Send Messages\n'
                        + '2. Send Photos\n'
                        + '3. Send Media Groups\n'
                        + '4. Inline Keyboards\n\n'
                        + 'Feel free to explore and interact with the bot!',
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Message", callback_data: "sendMessage" }],
                            [{ text: "Photo", callback_data: "sendPhoto" }],
                            [{ text: "Media Group", callback_data: "sendMediaGroup" }],
                            [{ text: "Inline Keyboard", callback_data: "inlineKeyboard" }],
                            [{ text: "BACK", callback_data: "action=start" }]
                        ]
                    }
                }
            }])],
            ['sendMessage', JSON.stringify([{
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
            }])],
            ['sendPhoto', JSON.stringify([{
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
            }])],
            ['sendMediaGroup', JSON.stringify([{
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
            }])],
            ['inlineKeyboard', JSON.stringify([{
                method: 'sendMessage',
                payload: {
                    chat_id: 'user_chat_id',
                    text: 'Here are some sample inline keyboards you can use:',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "1x1 YouTube™", web_app: { url: "https://www.youtube.com" } }
                            ],
                            [
                                { text: "1x2", callback_data: "sample_keypad_1" },
                                { text: "1x2", callback_data: "sample_keypad_2" }
                            ],
                            [
                                { text: "1x3", callback_data: "sample_keypad_4" },
                                { text: "1x3", callback_data: "sample_keypad_5" },
                                { text: "1x3", callback_data: "sample_keypad_6" }
                            ],
                            [
                                { text: "1x4", callback_data: "sample_keypad_7" },
                                { text: "1x4", callback_data: "sample_keypad_8" },
                                { text: "1x4", callback_data: "sample_keypad_9" },
                                { text: "1x4", callback_data: "sample_keypad_10" }
                            ]
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            }])]
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}