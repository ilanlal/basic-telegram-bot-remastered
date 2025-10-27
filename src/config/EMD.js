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
            widgets: [{
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
            }, {
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
            }, {
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
            }]
        }]
    }
};

EMD.Environment = {
    entityName: 'Environment',
    displayName: 'Environment',
    pluralDisplayName: 'Environments',
    cardMeta: {
        name: 'environmentCard',
        header: {
            title: 'Environment',
            subTitle: 'Manage your environments variables here',
            imageUrl: EMD.DEFAULT_IMAGE_URL,
            imageStyle: CardService.ImageStyle.SQUARE,
            imageAltText: 'Environment Image'
        },
        sections: [{
            header: 'Environment Details',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: [{
                TextInput: {
                    label: 'Bot API Token',
                    name: 'bot_token',
                    placeholder: 'Enter bot API token',
                    value: '{bot_token}'
                }
            }, {
                TextInput: {
                    label: 'Deployment ID',
                    name: 'deployment_id',
                    placeholder: 'Enter deployment ID',
                    value: '{deployment_id}'
                }
            }, {
                TextInput: {
                    label: 'Admin Chat ID',
                    name: 'admin_chat_id',
                    placeholder: 'Enter admin chat ID',
                    value: '{admin_chat_id}'
                }
            }, {
                TextInput: {
                    label: 'Default language',
                    name: 'default_language',
                    placeholder: 'Enter default language',
                    value: '{default_language}'
                }
            }]
        }]
    }
};

EMD.Bot = {
    entityName: 'Bot',
    displayName: 'Bot',
    pluralDisplayName: 'Bots',
    sheetMeta: {
        name: 'Bots',
        columns: ['Parameter', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
        sample_data: [
            ['name', 'Sample Bot', 'Bot de Ejemplo', 'Bot d\'exemple', 'بوت تجريبي', 'Beispiel-Bot', 'Bot di esempio', 'Bot de Exemplo', 'Пример бота', '示例机器人', 'サンプルボット', '샘플 봇', 'בוט לדוגמה'],
            ['short_description', 'This is a sample bot.', 'Este es un bot de ejemplo.', 'Ceci est un bot d\'exemple.', 'هذا بوت تجريبي.', 'Dies ist ein Beispiel-Bot.', 'Questo è un bot di esempio.', 'Este é um bot de exemplo.', 'Это пример бота.', '这是一个示例机器人。', 'これはサンプルボットです。', '이것은 샘플 봇입니다.', 'זהו בוט לדוגמה.'],
            ['description', 'This bot demonstrates basic functionality.', 'Este bot demuestra funcionalidad básica.', 'Ce bot démontre une fonctionnalité de base.', 'هذا البوت يوضح الوظائف الأساسية.', 'Dieser Bot demonstriert grundlegende Funktionen.', 'Questo bot dimostra la funzionalità di base.', 'Este bot demonstra funcionalidade básica.', 'Этот бот демонстрирует базовый функционал.', '该机器人演示了基本功能。', 'このボットは基本的な機能を示しています。', '이 봇은 기본 기능을 보여줍니다.', 'בוט זה מדגים פונקציונליות בסיסית.']
            ['commands', JSON.stringify(
                [
                    {
                        command: '/start',
                        description: 'Start the bot'
                    }, {
                        command: '/home',
                        description: 'Home (This command will show you main menu, home page)'
                    }, {
                        command: '/howami',
                        description: 'Who am I? (This command will tell you about yourself and your "chat_id")'
                    }, {
                        command: '/whoru',
                        description: 'Who are you? (This command will tell you about the bot)'
                    }, {
                        command: '/help',
                        description: 'Get help on using the bot, or report an issue'
                    }, {
                        command: '/about',
                        description: 'About the bot'
                    }
                ])]
        ]
    },
    cardMeta: {
        name: 'bot_dashboard_Card',
        header: {
            title: '🤖 - [YOUR_BOT_API_TOKEN]',
            subTitle: 'Control panel for your bot.',
            imageUrl: EMD.DEFAULT_IMAGE_URL,
            imageStyle: CardService.ImageStyle.SQUARE,
            imageAltText: 'Bot Image'
        },
        sections:
            [
                {
                    header: 'Verify Bot Identity',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {
                            DecoratedText: {
                                text: '{🔘}',
                                topLabel: 'call api/getMe',
                                bottomLabel: 'Retrieve bot information',
                                wrapText: true,
                                textButton: {
                                    text: 'Call API',
                                    onClick: {
                                        action: 'EventHandler.Addon.callApi',
                                        parameters: {
                                            api: 'getMe'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    header: 'Webhook Management',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {
                            DecoratedText: {
                                text: '{🔔}',
                                topLabel: 'call api/setWebhook',
                                bottomLabel: 'Set webhook for the bot',
                                wrapText: true,
                                textButton: {
                                    text: 'Call API',
                                    onClick: {
                                        action: 'EventHandler.Addon.callApi',
                                        parameters: {
                                            api: 'setWebhook'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
        fixedFooter: {
            primaryButton: {
                textButton: {
                    text: '💫 Bind row data',
                    functionName: 'EventHandler.Addon.onBindData',
                    parameters: {
                        action: 'bindData'
                    }
                }
            }
        }
    }
};


EMD.Automation = {
    entityName: 'Automation',
    displayName: 'Automation',
    pluralDisplayName: 'Automations',
    sheetMeta: {
        name: 'Automations',
        columns: ['ID', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
        sample_data:
            [
                ['_not_found_',
                    // default (en)
                    JSON.stringify([{
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
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '¡Vaya! Comando no encontrado. Por favor, usa /help para ver la lista de comandos disponibles.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Inicio", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '¡Vaya! Comando no encontrado. Por favor, usa /help para ver la lista de comandos disponibles.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "L'accueil", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'عذرًا! الأمر غير موجود. يرجى استخدام /help لرؤية قائمة الأوامر المتاحة.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "الصفحة الرئيسية", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Hoppla! Befehl nicht gefunden. Bitte benutze /help, um die Liste der verfügbaren Befehle zu sehen.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Home", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Oops! Comando non trovato. Per favore usa /help per vedere la lista dei comandi disponibili.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Inizio", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Ops! Comando não encontrado. Por favor, use /help para ver a lista de comandos disponíveis.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Início", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Упс! Команда не найдена. Пожалуйста, используйте /help, чтобы увидеть список доступных команд.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Главная", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '哎呀！未找到命令。请使用 /help 查看可用命令列表。',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "主页", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'おっと！コマンドが見つかりません。利用可能なコマンドのリストを見るには /help を使用してください。',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "ホーム", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '이런! 명령을 찾을 수 없습니다. 사용 가능한 명령 목록을 보려면 /help를 사용하세요.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "홈", callback_data: "/home" }]
                                ]
                            }
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'אופס! הפקודה לא נמצאה. אנא השתמש ב-/help כדי לראות את רשימת הפקודות הזמינות.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "בית", callback_data: "/home" }]
                                ]
                            }
                        }
                    }])],
                ["/start",
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Hello ‼️' + '\n\n'
                                + '<b>Welcome to <b>Bot Machine</b>! 🤖' + '\n\n'
                                + 'By selecting "Accept All", you agree to our:\n\n'
                                + '<a href="https://example.com/terms">Terms of Service</a> and <a href="https://example.com/privacy">Privacy Policy</a>.' + '\n'

                                + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "Accept All", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }])],
                ['/home',
                    // default (en)
                    JSON.stringify([{
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
                ['/help',
                    // default (en)
                    JSON.stringify([{
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
                ['/about',
                    // default (en)
                    JSON.stringify([{
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
                ['store',
                    // default (en)
                    JSON.stringify([{
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
                ['browseProducts',
                    // default (en)
                    JSON.stringify([{
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
                ['apiFeatures',
                    // default (en)
                    JSON.stringify([{
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
                ['sendMessage',
                    // default (en)
                    JSON.stringify([{
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
                ['sendPhoto',
                    // default (en)
                    JSON.stringify([{
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
                ['sendMediaGroup',
                    // default (en)
                    JSON.stringify([{
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
                ['inlineKeyboard',
                    // default (en)
                    JSON.stringify([{
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