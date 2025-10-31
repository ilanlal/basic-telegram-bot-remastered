// Entity Metadata Configuration Class
class EMD {
    constructor(model = {}) {
        this.model = model;
    }
};

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
        sections: [
            {   // Get started section
                header: 'Get Started with Your Bot',
                collapsible: false,
                numUncollapsibleWidgets: 0,
                widgets: [
                    {   // Bot setup widget
                        id: 'bot_setup_widget',
                        DecoratedText: {
                            text: 'Click the button to setup your bot',
                            topLabel: 'Get started',
                            bottomLabel: '🤖',
                            wrapText: true,
                            textButton: {
                                disabled: false,
                                text: '🤖 Set me up',
                                onClick: {
                                    functionName: 'EventHandler.Addon.onBotSetupClick',
                                    parameters: { action: 'setupBot' }
                                }
                            }
                        }
                    },
                    {   // Webhook management widget
                        id: 'webhook_management_widget',
                        DecoratedText: {
                            text: 'Manage your webhooks',
                            topLabel: '🔗 Webhook Management',
                            bottomLabel: 'Click the button to manage your webhooks',
                            wrapText: true,
                            textButton: {
                                disabled: false,
                                text: '⚙️ Manage Webhooks',
                                onClick: {
                                    functionName: 'EventHandler.Addon.onWebhookManagementClick',
                                    parameters: { action: 'manageWebhooks' }
                                }
                            }
                        }
                    }
                ]
            },
            {   // Advanced Settings Section
                header: 'Advanced Settings',
                collapsible: true,
                numUncollapsibleWidgets: 1,
                widgets: [
                    {   // Automation management widget
                        id: 'automation_management_widget',
                        DecoratedText: {
                            text: 'Automation management',
                            topLabel: 'Automations {total}',
                            bottomLabel: 'Manage your automations here',
                            wrapText: true,
                            textButton: {
                                disabled: false,
                                text: '⚡',
                                onClick: {
                                    functionName: 'EventHandler.Addon.automation',
                                    parameters: { action: 'manageAutomations' }
                                }
                            }
                        }
                    },
                    {  // Contacts management widget
                        id: 'contacts_management_widget',
                        DecoratedText: {
                            text: 'Contacts management',
                            topLabel: 'Contacts {total}',
                            bottomLabel: 'Manage your contacts here',
                            wrapText: true,
                            textButton: {
                                disabled: false,
                                text: '👥',
                                onClick: {
                                    functionName: 'EventHandler.Addon.contacts',
                                    parameters: { action: 'manageContacts' }
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
                    text: '💾 Save',
                    onClick: {
                        functionName: 'EventHandler.Addon.saveSettings',
                    }
                }
            }
        }
    }
};

EMD.BotSetup = {
    entityName: 'Bot Setup',
    displayName: 'Bot Setup',
    pluralDisplayName: 'Bot Setups',
    cardMeta: {
        name: 'bot_setup_Card',
        header: {
            title: 'Bot Setup',
            subTitle: 'Configure your bot environment variables here.',
            imageUrl: EMD.DEFAULT_IMAGE_URL,
            imageStyle: CardService.ImageStyle.SQUARE,
            imageAltText: 'Environment Image'
        },
        sections:
            [
                {   // Getting Started Variables Section
                    header: 'Getting Started Variables',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        { // Bot token set state
                            id: 'bot_token_set_state',
                            TextParagraph: {
                                text: 'Bot API Token is set.'
                            }
                        },
                        { // Bot Token Variable
                            id: 'bot_token_variable',
                            TextInput: {
                                title: 'Bot API Token',
                                fieldName: 'txt_bot_api_token',
                                hint: 'Enter bot API token'
                            },
                            propertyName: 'bot_api_token'
                        },
                        { // Identify Token Button
                            id: 'identify_token_button',
                            TextButton: {
                                text: '🆔 Identify Token',
                                onClick: {
                                    functionName: 'EventHandler.Addon.onIdentifyTokenClick'
                                }
                            }
                        },
                        {   // Deployment ID Variable
                            id: 'deployment_id_variable',
                            TextInput: {
                                title: 'Deployment ID',
                                fieldName: 'txt_deployment_id',
                                hint: 'Enter deployment ID'
                            },
                            propertyName: 'deployment_id'
                        },
                        { // DecoratedText for webhook info
                            id: 'webhook_info',
                            DecoratedText: {
                                text: 'Webhook Info',
                                topLabel: 'Webhook URL',
                                bottomLabel: 'Manage your webhook settings here',
                                wrapText: true,
                                textButton: {
                                    disabled: false,
                                    text: '🔗',
                                    onClick: {
                                        functionName: 'EventHandler.Addon.webhook',
                                        parameters: { action: 'manageWebhook' }
                                    }
                                }
                            }
                        }
                    ]
                },
                {  // Environment variables.
                    header: 'Environment variables',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        { // Admin Chat ID Variable
                            id: 'admin_chat_id_variable',
                            TextInput: {
                                title: 'Admin Chat ID',
                                fieldName: 'txt_admin_chat_id',
                                hint: 'Enter admin chat ID',
                                value: '[YOUR_ADMIN_CHAT_ID]'
                            },
                            propertyName: 'admin_chat_id'
                        },
                        {   // Log Events Setting
                            id: 'log_events_setting',
                            TextInput: {
                                title: 'Debug Mode (Set to true or any other value for false)',
                                fieldName: 'txt_debug_mode',
                                hint: 'Enter debug mode (true/false)',
                                value: 'false'
                            },
                            propertyName: 'debug_mode'
                        },
                        {   // Default Language Variable
                            id: 'default_language_variable',
                            TextInput: {
                                title: 'Default language',
                                fieldName: 'txt_default_language',
                                hint: 'Enter default language',
                                value: 'en'
                            },
                            propertyName: 'default_language'
                        }
                    ]
                }
            ],
        fixedFooter: {
            primaryButton: {
                textButton: {
                    text: '💾 Save',
                    onClick: {
                        functionName: 'BotSetupHandler.saveNewBotSetupInfo',
                    }
                }
            }
        }
    },
    sheetMeta: {
        name: '🤖 Bot',
        columns: ['param', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
        sample_data: [
            // Bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language.
            ['name',
                '🤖 Bot Hub, Private, Secure, Easy to use',
                '🤖 Centro de bots, privado, seguro, fácil de usar',
                '🤖 Centre de bots, privé, sécurisé, facile à utiliser',
                '🤖 مركز الروبوتات، خاص، آمن، سهل الاستخدام',
                '🤖 Bot-Zentrale, privat, sicher, einfach zu bedienen',
                '🤖 Centro bot, privato, sicuro, facile da usare',
                '🤖 Central de bots, privado, seguro, fácil de usar',
                'Центр ботов, приватный, безопасный, простой в использовании',
                '🤖 机器人中心，私密，安全，易于使用',
                '🤖 ボットハブ、プライベート、セキュア、使いやすい',
                '🤖 봇 허브, 개인용, 안전함, 사용하기 쉬움',
                '🤖 מרכז בוטים, פרטי, מאובטח, קל לשימוש'],
            // Short description of the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language.
            ['short_description',
                'What bot can do? Take a journey with this bot, explore its features!',
                '¿Qué puede hacer el bot? ¡Emprende un viaje con este bot y explora sus funciones!',
                'Que peut faire le bot ? Partez en voyage avec ce bot et explorez ses fonctionnalités !',
                'ماذا يمكن أن يفعل الروبوت؟ انطلق في رحلة مع هذا الروبوت واستكشف ميزاته!',
                'Was kann der Bot tun? Machen Sie eine Reise mit diesem Bot und erkunden Sie seine Funktionen!',
                'Cosa può fare il bot? Fai un viaggio con questo bot ed esplora le sue funzionalità!',
                'O que o bot pode fazer? Faça uma jornada com este bot e explore seus recursos!',
                'Что может делать бот? Отправьтесь в путешествие с этим ботом и исследуйте его функции!',
                '机器人能做什么？与这个机器人一起踏上旅程，探索它的功能！',
                'ボットは何ができますか？このボットと一緒に旅をして、その機能を探検しましょう！',
                '봇은 무엇을 할 수 있나요? 이 봇과 함께 여행을 떠나 그 기능을 탐험해보세요!',
                'מה הבוט יכול לעשות? צא למסע עם הבוט הזה, חקור את התכונות שלו!'],
            // Description of the bot; 0-512 characters. Pass an empty string to remove the dedicated description for the given language.
            ['description',
                '<b>Telegram Bots</b> are secure and private channels ideal marketing tools within customer relationship management (CRM) systems. \n\n'
                + 'Promote your goods and services, send notifications, conduct surveys, and much more!\n\n'
                + 'Group your customers, create targeted communication channels, and engage with your audience like never before!\n\n',
                '<b>Los bots de Telegram</b> son canales seguros y privados, herramientas de marketing ideales dentro de los sistemas de gestión de relaciones con los clientes (CRM). \n\n'
                + 'Promociona tus productos y servicios, envía notificaciones, realiza encuestas y mucho más.\n\n'
                + 'Agrupa a tus clientes, crea canales de comunicación segmentados y conecta con tu audiencia como nunca antes.\n\n',
                '<b>Les bots Telegram</b> sont des canaux sécurisés et privés, des outils de marketing idéaux au sein des systèmes de gestion de la relation client (CRM). \n\n'
                + 'Faites la promotion de vos biens et services, envoyez des notifications, réalisez des sondages, et bien plus encore !\n\n'
                + 'Regroupez vos clients, créez des canaux de communication ciblés, et engagez-vous avec votre audience comme jamais auparavant !\n\n',
                '<b>روبوتات تيليجرام</b> هي قنوات آمنة وخاصة، وأدوات تسويقية مثالية ضمن أنظمة إدارة علاقات العملاء (CRM). \n\n'
                + 'قم بالترويج لمنتجاتك وخدماتك، وأرسل الإشعارات، وأجرِ الاستطلاعات، وأكثر من ذلك بكثير!\n\n'
                + 'قم بتجميع عملائك، وأنشئ قنوات اتصال مستهدفة، وتفاعل مع جمهورك كما لم يحدث من قبل!\n\n',
                '<b>Telegram-Bots</b> sind sichere und private Kanäle, ideale Marketing-Tools innerhalb von Customer-Relationship-Management-(CRM)-Systemen. \n\n'
                + 'Bewerben Sie Ihre Waren und Dienstleistungen, senden Sie Benachrichtigungen, führen Sie Umfragen durch und vieles mehr!\n\n'
                + 'Gruppieren Sie Ihre Kunden, erstellen Sie gezielte Kommunikationskanäle und interagieren Sie wie nie zuvor mit Ihrem Publikum!\n\n',
                '<b>I bot di Telegram</b> sono canali sicuri e privati, strumenti di marketing ideali all\'interno dei sistemi di gestione delle relazioni con i clienti (CRM). \n\n'
                + 'Promuovi i tuoi beni e servizi, invia notifiche, conduci sondaggi e molto altro!\n\n'
                + 'Raggruppa i tuoi clienti, crea canali di comunicazione mirati e interagisci con il tuo pubblico come mai prima d\'ora!\n\n',
                '<b>Os bots do Telegram</b> são canais seguros e privados, ferramentas de marketing ideais dentro dos sistemas de gestão de relacionamento com o cliente (CRM). \n\n'
                + 'Promova seus bens e serviços, envie notificações, realize pesquisas e muito mais!\n\n'
                + 'Agrupe seus clientes, crie canais de comunicação direcionados e interaja com seu público como nunca antes!\n\n',
                '<b>Телеграм-боты</b> — это безопасные и приватные каналы, идеальные маркетинговые инструменты в системах управления взаимоотношениями с клиентами (CRM). \n\n'
                + 'Продвигайте свои товары и услуги, отправляйте уведомления, проводите опросы и многое другое!\n\n'
                + 'Группируйте своих клиентов, создавайте целевые каналы связи и взаимодействуйте с вашей аудиторией как никогда ранее!\n\n',
                '<b>电报机器人</b> 是安全且私密的频道，是客户关系管理（CRM）系统中理想的营销工具。 \n\n'
                + '推广您的商品和服务，发送通知，进行调查，等等！\n\n'
                + '将客户分组，创建针对性的沟通渠道，与受众进行前所未有的互动！\n\n',
                '<b>テレグラムボット</b> は、安全でプライベートなチャネルであり、顧客関係管理（CRM）システム内で理想的なマーケティングツールです。 \n\n'
                + '商品やサービスを宣伝し、通知を送信し、アンケートを実施するなど、さまざまなことができます！\n\n'
                + '顧客をグループ化し、ターゲットを絞ったコミュニケーションチャネルを作成し、かつてない方法でオーディエンスと交流しましょう！\n\n',
                '<b>텔레그램 봇</b> 은 안전하고 개인적인 채널로, 고객 관계 관리(CRM) 시스템 내에서 이상적인 마케팅 도구입니다. \n\n'
                + '상품 및 서비스를 홍보하고, 알림을 보내고, 설문 조사를 수행하는 등 다양한 작업을 수행할 수 있습니다!\n\n'
                + '고객을 그룹화하고, 대상 커뮤니케이션 채널을 만들고, 그 어느 때보다 청중과 소통하세요!\n\n',
                '<b>בוטים של טלגרם</b> הם ערוצים מאובטחים ופרטיים, כלים שיווקיים אידיאליים בתוך מערכות ניהול קשרי לקוחות (CRM). \n\n'
                + 'קדם את הסחורות והשירותים שלך, שלח התראות, ערוך סקרים ועוד!\n\n'
                + 'קבץ את הלקוחות שלך, צור ערוצי תקשורת ממוקדים ואינטראקציה עם הקהל שלך כמו שמעולם לא היה לפני כן!\n\n']
            ,
            // A JSON-serialized list of bot commands to be set as the list of the bot's commands.
            // At most 100 commands can be specified.
            ['commands',
                JSON.stringify(
                    [
                        {   // '/start' command
                            // Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores.
                            command: '/start',
                            // Description of the command; 1-256 characters.
                            description: 'Start the bot'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'Get help on using the bot, or report an issue'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'About the bot'
                        },
                        { // lang command
                            command: '/lang',
                            description: 'send "/lang es" to set Spanish as your language, or "/lang list" to get a list of available languages'
                        },
                        { // '/admin' command
                            command: '/admin',
                            description: 'Admin command for bot management'
                        }
                    ])],
            ['webhook_url',
                'https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec']
        ]
    }
};

EMD.WebhookSetup = {
    entityName: 'Webhook',
    displayName: 'Webhook',
    pluralDisplayName: 'Webhooks',
    cardMeta: {
        name: 'webhook_Card',
        header: {
            title: 'Webhook Management',
            subTitle: 'Manage your bot webhooks here.',
            imageUrl: EMD.DEFAULT_IMAGE_URL,
            imageStyle: CardService.ImageStyle.SQUARE,
            imageAltText: 'Webhook Image'
        },
        sections:
            [   // Webhook Management Section
                {
                    header: 'Webhook Management',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {
                            id: 'set_webhook_widget',
                            DecoratedText: {
                                topLabel: '📡',
                                text: 'api/setWebhook',
                                bottomLabel: 'Set webhook for the bot',
                                wrapText: true,
                                textButton: {
                                    text: '📡 Set',
                                    disabled: false,
                                    onClick: {
                                        functionName: 'EventHandler.Addon.setWebhook',
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
                    onClick: {
                        functionName: 'EventHandler.Addon.onBindData',
                        parameters: {
                            action: 'bindData'
                        }
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
        name: '⚡ Automations',
        columns: ['action', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
        sample_data:
            [
                ['_under_construction_',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'This feature is under construction.',
                            parse_mode: 'HTML'
                        }
                    }])],
                ['_command_not_found_',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Oops! Command not found. Please use /help to see the list of available commands.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "Help", callback_data: "/help" },
                                        { text: "About", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "Home", callback_data: "/home" }
                                    ]
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
                ['_action_not_found_',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 Oops! We\'re sorry, but we couldn\'t recognize that action. Please try again or use /help for assistance.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 Help", callback_data: "action=help" },
                                        { text: "ℹ️ About", callback_data: "action=about" }
                                    ],
                                    [
                                        { text: "🏠 Home", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 ¡Vaya! Lo sentimos, pero no pudimos reconocer esa acción. Por favor, inténtalo de nuevo o utiliza /help para obtener ayuda.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 Ayuda", callback_data: "/help" },
                                        { text: "ℹ️ Acerca de", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 Inicio", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 Désolé, mais nous n\'avons pas pu reconnaître cette action. Veuillez réessayer ou utiliser /help pour obtenir de l\'aide.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 Aide", callback_data: "/help" },
                                        { text: "ℹ️ À propos", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 Accueil", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 عذرًا، لم نتمكن من التعرف على هذا الإجراء. يرجى المحاولة مرة أخرى أو استخدام /help للحصول على المساعدة.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 مساعدة", callback_data: "/help" },
                                        { text: "ℹ️ حول", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 الرئيسية", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 Hoppla! Wir konnten diese Aktion nicht erkennen. Bitte versuchen Sie es erneut oder verwenden Sie /help, um Hilfe zu erhalten.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 Hilfe", callback_data: "/help" },
                                        { text: "ℹ️ Über", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 Home", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 Ci scusiamo, ma non siamo riusciti a riconoscere questa azione. Per favore riprova o usa /help per ricevere assistenza.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 Aiuto", callback_data: "/help" },
                                        { text: "ℹ️ Informazioni", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 Home", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 Desculpe, não conseguimos reconhecer esta ação. Por favor, tente novamente ou use /help para obter assistência.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 Ajuda", callback_data: "/help" },
                                        { text: "ℹ️ Sobre", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 Início", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 Извините, мы не смогли распознать это действие. Пожалуйста, попробуйте еще раз или используйте /help для получения помощи.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 Помощь", callback_data: "/help" },
                                        { text: "ℹ️ О нас", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 Главная", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 抱歉，我们无法识别此操作。请重试或使用 /help 获取帮助。',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 帮助", callback_data: "/help" },
                                        { text: "ℹ️ 关于", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 首页", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 申し訳ありませんが、このアクションを認識できませんでした。もう一度お試しいただくか、/help を使用してサポートを受けてください。',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 ヘルプ", callback_data: "/help" },
                                        { text: "ℹ️ 私たちについて", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 ホーム", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 죄송합니다. 이 작업을 인식할 수 없습니다. 다시 시도하거나 /help를 사용하여 도움을 받으십시오.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 도움", callback_data: "/help" },
                                        { text: "ℹ️ 정보", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 홈", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🚧 סליחה, לא הצלחנו לזהות את הפעולה הזו. אנא נסה שוב או השתמש ב-/help לקבלת עזרה.',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🆘 עזרה", callback_data: "/help" },
                                        { text: "ℹ️ עלינו", callback_data: "/about" }
                                    ],
                                    [
                                        { text: "🏠 בית", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                ],
                ["/start",
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Hi..' + '\n\n'
                                + '<blockquote expandable>About me: I\'m a <b>Bot Hub</b> 🐣\n\n'
                                + 'I\'m a <b>Bot Hub</b> 🐣\n\n'
                                + 'I can help you explore various features and functionalities of Telegram bots.\n\n'
                                + 'You can use me to learn about sending messages, photos, media groups, and more!\n\n'
                                + 'Just let me know what you want to do!' + '\n\n'
                                + '</blockquote>'
                                + 'Click the "🐣 Accept" in the "inline keyboard" below to get started.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Accept", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Hola..' + '\n\n'
                                + '<blockquote expandable>Sobre mí: Soy un <b>Bot Hub</b> 🐣\n\n'
                                + 'Soy un <b>Bot Hub</b> 🐣\n\n'
                                + 'Puedo ayudarte a explorar varias funciones y características de los bots de Telegram.\n\n'
                                + 'Puedes usarme para aprender sobre el envío de mensajes, fotos, grupos de medios y más!\n\n'
                                + 'Solo házmelo saber lo que quieres hacer!' + '\n\n'
                                + '</blockquote>'
                                + 'Haz clic en "🐣 Aceptar" en el "teclado en línea" a continuación para comenzar.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Aceptar", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Hola..' + '\n\n'
                                + '<blockquote expandable>Sobre mí: Soy un <b>Bot Hub</b> 🐣\n\n'
                                + 'Soy un <b>Bot Hub</b> 🐣\n\n'
                                + 'Puedo ayudarte a explorar varias funciones y características de los bots de Telegram.\n\n'
                                + 'Puedes usarme para aprender sobre el envío de mensajes, fotos, grupos de medios y más!\n\n'
                                + 'Solo házmelo saber lo que quieres hacer!' + '\n\n'
                                + '</blockquote>'
                                + 'Haz clic en "🐣 Aceptar" en el "teclado en línea" a continuación para comenzar.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Aceptar", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Bonjour..' + '\n\n'
                                + '<blockquote expandable>À propos de moi: Je suis un <b>Bot Hub</b> 🐣\n\n'
                                + 'Je suis un <b>Bot Hub</b> 🐣\n\n'
                                + 'Je peux vous aider à explorer diverses fonctionnalités et caractéristiques des bots Telegram.\n\n'
                                + 'Vous pouvez m\'utiliser pour en savoir plus sur l\'envoi de messages, de photos, de groupes de médias, et plus encore!\n\n'
                                + 'Faites-moi savoir ce que vous voulez faire!' + '\n\n'
                                + '</blockquote>'
                                + 'Cliquez sur "🐣 Accepter" dans le "clavier en ligne" ci-dessous pour commencer.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Accepter", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> مرحبا..' + '\n\n'
                                + '<blockquote expandable>معلومات عني: أنا <b>بوت هاب</b> 🐣\n\n'
                                + 'أنا <b>بوت هاب</b> 🐣\n\n'
                                + 'يمكنني مساعدتك في استكشاف ميزات ووظائف مختلفة لروبوتات تيليجرام.\n\n'
                                + 'يمكنك استخدامي لمعرفة المزيد عن إرسال الرسائل والصور ومجموعات الوسائط والمزيد!\n\n'
                                + 'فقط أخبرني بما تريد القيام به!' + '\n\n'
                                + '</blockquote>'
                                + 'انقر على "🐣 قبول" في "لوحة المفاتيح المدمجة" أدناه للبدء.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 قبول", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Hallo..' + '\n\n'
                                + '<blockquote expandable>Über mich: Ich bin ein <b>Bot Hub</b> 🐣\n\n'
                                + 'Ich bin ein <b>Bot Hub</b> 🐣\n\n'
                                + 'Ich kann Ihnen helfen, verschiedene Funktionen und Merkmale von Telegram-Bots zu erkunden.\n\n'
                                + 'Sie können mich verwenden, um mehr über das Senden von Nachrichten, Fotos, Mediengruppen und mehr zu erfahren!\n\n'
                                + 'Lassen Sie mich wissen, was Sie tun möchten!' + '\n\n'
                                + '</blockquote>'
                                + 'Klicken Sie auf "🐣 Akzeptieren" in der untenstehenden "Inline-Tastatur", um zu beginnen.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Akzeptieren", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Ciao..' + '\n\n'
                                + '<blockquote expandable>Informazioni su di me: Sono un <b>Bot Hub</b> 🐣\n\n'
                                + 'Sono un <b>Bot Hub</b> 🐣\n\n'
                                + 'Posso aiutarti a esplorare diverse funzionalità e caratteristiche dei bot di Telegram.\n\n'
                                + 'Puoi usarmi per saperne di più sull\'invio di messaggi, foto, gruppi multimediali e altro ancora!\n\n'
                                + 'Fammi sapere cosa vuoi fare!' + '\n\n'
                                + '</blockquote>'
                                + 'Fai clic su "🐣 Accetta" nella "tastiera inline" qui sotto per iniziare.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Accetta", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Olá..' + '\n\n'
                                + '<blockquote expandable>Sobre mim: Eu sou um <b>Bot Hub</b> 🐣\n\n'
                                + 'Eu sou um <b>Bot Hub</b> 🐣\n\n'
                                + 'Posso ajudá-lo a explorar várias funcionalidades e recursos dos bots do Telegram.\n\n'
                                + 'Você pode me usar para saber mais sobre o envio de mensagens, fotos, grupos de mídia e muito mais!\n\n'
                                + 'Deixe-me saber o que você gostaria de fazer!' + '\n\n'
                                + '</blockquote>'
                                + 'Clique em "🐣 Aceitar" no "teclado inline" abaixo para começar.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Aceitar", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> Привет..' + '\n\n'
                                + '<blockquote expandable>Информация обо мне: Я <b>Bot Hub</b> 🐣\n\n'
                                + 'Я <b>Bot Hub</b> 🐣\n\n'
                                + 'Я могу помочь вам исследовать различные функции и возможности ботов Telegram.\n\n'
                                + 'Вы можете использовать меня, чтобы узнать больше о отправке сообщений, фотографий, медиа-группах и многом другом!\n\n'
                                + 'Дайте мне знать, что вы хотите сделать!' + '\n\n'
                                + '</blockquote>'
                                + 'Нажмите "🐣 Принять" на "инлайн-клавиатуре" ниже, чтобы начать.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 Принять", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> 你好..' + '\n\n'
                                + '<blockquote expandable>关于我: 我是一个 <b>Bot Hub</b> 🐣\n\n'
                                + '我是一個 <b>Bot Hub</b> 🐣\n\n'
                                + '我可以帮助您探索 Telegram 机器人的各种功能和特性。\n\n'
                                + '您可以使用我来了解有关发送消息、照片、多媒体组等更多信息！\n\n'
                                + '请告诉我您想做什么！' + '\n\n'
                                + '</blockquote>'
                                + '点击下面的 "🐣 接受" 在 "内联键盘" 开始。' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 接受", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> こんにちは..' + '\n\n'
                                + '<blockquote expandable>私について: 私は <b>Bot Hub</b> 🐣 です。\n\n'
                                + '私は <b>Bot Hub</b> 🐣 です。\n\n'
                                + '私は Telegram ボットのさまざまな機能や特性を探索するお手伝いができます。\n\n'
                                + 'メッセージ、写真、メディアグループなどの送信についてもっと知りたい場合は、私を利用できます！\n\n'
                                + '何をしたいか教えてください！' + '\n\n'
                                + '</blockquote>'
                                + '下の "🐣 受け入れる" をクリックして "インラインキーボード" を開始してください。' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 受け入れる", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> 안녕하세요..' + '\n\n'
                                + '<blockquote expandable>저에 대해: 저는 <b>Bot Hub</b> 🐣 입니다.\n\n'
                                + '저는 <b>Bot Hub</b> 🐣 입니다.\n\n'
                                + '저는 Telegram 봇의 다양한 기능과 특성을 탐색하는 데 도움을 드릴 수 있습니다.\n\n'
                                + '메시지, 사진, 미디어 그룹 등을 보내는 방법에 대해 더 알고 싶다면 저를 이용해 보세요!\n\n'
                                + '무엇을 하고 싶으신지 말씀해 주세요!' + '\n\n'
                                + '</blockquote>'
                                + '아래의 "🐣 수락"을 클릭하여 "인라인 키보드"를 시작하세요.' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 수락", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '🐣/> שלום..' + '\n\n'
                                + '<blockquote expandable>עליי: אני <b>Bot Hub</b> 🐣 .\n\n'
                                + 'אני <b>Bot Hub</b> 🐣 .\n\n'
                                + 'אני יכול לעזור לך לחקור את התכונות והמאפיינים השונים של בוט טלגרם.\n\n'
                                + 'אם אתה רוצה לדעת יותר על שליחת הודעות, תמונות, קבוצות מדיה וכו\', אתה יכול להשתמש בי!\n\n'
                                + 'מה תרצה לעשות?' + '\n\n'
                                + '</blockquote>'
                                + 'לחץ על "🐣 קבל" למטה כדי להתחיל את "מקלדת אינליין".' + '\n',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🐣 קבל", callback_data: "/home" }
                                    ]
                                ]
                            }
                        }
                    }]),
                ],
                ['/home',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendPhoto',
                        payload: {
                            caption: 'Welcome.\n\n'
                                + 'I am a simple Telegram bot that showcases various features and functionalities.\n\n'
                                + 'Click the "inline keyboard" buttons below to explore more options.\n\n'
                                + 'Feel free to interact with me and discover what I can do!\n\n'
                                + 'I hope you enjoy your experience! 😊\n\n'
                                + '<blockquote expandable>Get Started: \n'
                                + 'To get started, you can use the following commands:\n'
                                + '1. /help - Get help on using the bot.\n'
                                + '2. /about - Learn more about this bot.\n\n'
                                + '</blockquote>'
                                + '<blockquote expandable>Features: \n'
                                + 'This bot can help you with the following:\n'
                                + '1. Sending messages\n'
                                + '2. Sharing photos and media\n'
                                + '3. Creating groups and channels\n'
                                + '4. Managing your account settings\n\n'
                                + '</blockquote>'
                                + '<blockquote expandable>Support: \n'
                                + 'If you need assistance, feel free to reach out!\n'
                                + 'You can use the /help command for guidance or to report any issues.\n\n'
                                + '</blockquote>'
                                + '<blockquote expandable>Feedback: \n'
                                + 'We appreciate your feedback to improve this bot.\n'
                                + 'Please let us know your thoughts!\n\n'
                                + '</blockquote>',
                            photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    // Two buttons in one row
                                    [
                                        { text: "🌐 Web App", web_app: { url: "https://example.com" } },
                                        { text: "🌟 Mini App", web_app: { url: "https://example.com/mini" } }
                                    ],
                                    [
                                        { text: "🛍️ Store", web_app: { url: "https://example.com/store" } },
                                        { text: "🐣 H.R Solutions", callback_data: "action=hrSolutions" }
                                    ],
                                    [
                                        { text: "🔒 Secured Marketplace", callback_data: "action=privateSecure" },
                                        { text: "💼 Agency Solutions", callback_data: "action=agencySolutions" }
                                    ],
                                    [
                                        { text: "🎯 Targeted Services", callback_data: "action=targetedServices" },
                                        { text: "📦 Logistics", callback_data: "action=logistics" }
                                    ],
                                    [
                                        { text: "🚀 Quick Actions", callback_data: "action=quickActions" },
                                        { text: "🚨 Emergency Services", callback_data: "action=emergencyServices" },
                                    ],
                                    [
                                        { text: '❓ Help', callback_data: "/help" },
                                        { text: 'ℹ️ About', callback_data: "/about" }
                                    ]
                                ]
                            }
                        }
                    }]),
                    // es
                    JSON.stringify([{}]),
                    // fr
                    JSON.stringify([{}]),
                    // ar
                    JSON.stringify([{}]),
                    // de
                    JSON.stringify([{}]),
                    // it
                    JSON.stringify([{}]),
                    // pt
                    JSON.stringify([{}]),
                    // ru
                    JSON.stringify([{}]),
                    // zh
                    JSON.stringify([{}]),
                    // ja
                    JSON.stringify([{}]),
                    // ko
                    JSON.stringify([{}]),
                    // he
                    JSON.stringify([{
                        method: 'sendPhoto',
                        payload: {
                            caption: 'ברוכים הבאים.\n\n'
                                + 'אני בוט טלגרם פשוט שמציג תכונות ופונקציות שונות.\n\n'
                                + 'לחץ על כפתורי "מקלדת אינליין" למטה כדי לגלות אפשרויות נוספות.\n\n'
                                + 'אל תהססו ליצור איתי אינטראקציה ולגלות מה אני יכול לעשות!\n\n'
                                + 'אני מקווה שתהנו מהחוויה! 😊\n\n'
                                + '<blockquote expandable>התחל: \n'
                                + 'כדי להתחיל, אתה יכול להשתמש בפקודות הבאות:\n'
                                + '1. /help - קבל עזרה בשימוש בבוט.\n'
                                + '2. /about - למידע נוסף על הבוט הזה.\n\n'
                                + '</blockquote>'
                                + '<blockquote expandable>תכונות: \n'
                                + 'בוט זה יכול לעזור לך עם הדברים הבאים:\n'
                                + '1. שליחת הודעות\n'
                                + '2. שיתוף תמונות ומדיה\n'
                                + '3. יצירת קבוצות וערוצים\n'
                                + '4. ניהול הגדרות החשבון שלך\n\n'
                                + '</blockquote>'
                                + '<blockquote expandable>תמיכה: \n'
                                + 'אם אתה זקוק לעזרה, אל תהסס לפנות!\n'
                                + 'אתה יכול להשתמש בפקודת /help לקבלת הדרכה או לדווח על בעיות.\n\n'
                                + '</blockquote>'
                                + '<blockquote expandable>משוב: \n'
                                + 'אנו מעריכים את המשוב שלך כדי לשפר את הבוט הזה.\n'
                                + 'אנא יידע אותנו את מחשבותיך!\n\n'
                                + '</blockquote>',
                            photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    // Two buttons in one row
                                    [
                                        { text: "Getting Started", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } },
                                        { text: "Report an Issue", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered/issues" } }
                                    ],
                                    [
                                        { text: "Home", callback_data: "action=home" }
                                    ]
                                ]
                            }
                        }
                    }
                    ])],

                ['/help',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendPhoto',
                        payload: {
                            caption: '<b>Help & Support</b>\n\n' +
                                'Need assistance? Here are some resources to help you get started:\n\n' +
                                '1. <b>Getting Started Guide:</b> Learn how to use the bot effectively.\n' +
                                '2. <b>FAQ:</b> Find answers to common questions.\n' +
                                '3. <b>Contact Support:</b> Reach out to our support team for personalized help.\n\n' +
                                '4. <b>Report an Issue:</b> If you encounter any problems, please let us know so we can improve your experience.\n\n' +
                                'If you need assistance, feel free to reach out!\n\n',
                            parse_mode: 'HTML',
                            media: "https://www.gstatic.com/webp/gallery/2.jpg",
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Getting Started", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } }],
                                    [{ text: "Report an Issue", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered/issues" } }],
                                    [{ text: "Home", callback_data: "action=home" }]
                                ]
                            }
                        }
                    }])],
                ['/about',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendPhoto',
                        payload: {
                            caption: ' About This Bot\n\n'
                                + 'This bot is a demonstration of Telegram Bot API features including sending messages, photos, media groups, and inline keyboards.\n\n'
                                + 'It is designed to be a simple and easy-to-use bot for users to interact with.\n\n'
                                + 'Features include:\n\n'
                                + '1. Sending text messages with HTML formatting.\n'
                                + '2. Sending photos with captions and inline keyboards.\n'
                                + '3. Sending media groups (multiple photos) in a single message.\n'
                                + '4. Interactive inline keyboards for user engagement.\n\n'
                                + 'Feel free to explore and interact with the bot!',
                            parse_mode: 'HTML',
                            media: "https://www.gstatic.com/webp/gallery/3.jpg",
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "GitHub", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } }],
                                    [{ text: "Home", callback_data: "action=start" }]
                                ]
                            }
                        }
                    }])],
                ['/lang',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'I\'m a multilingual bot:'
                                + '\n\nSelect your preferred language / Seleccione su idioma preferido / Sélectionnez votre langue préférée / اختر لغتك المفضلة / Wählen Sie Ihre bevorzugte Sprache / Seleziona la tua lingua preferita / Escolha seu idioma preferido / Выберите предпочитаемый язык / 选择您喜欢的语言 / お好みの言語を選択してください / 선호하는 언어를 선택하세요 / בחר את השפה המועדפת עליך',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "English", callback_data: "/lang en" },
                                        { text: "Español", callback_data: "/lang es" },
                                        { text: "Français", callback_data: "/lang fr" },
                                        { text: "العربية", callback_data: "/lang ar" },
                                        { text: "Deutsch", callback_data: "/lang de" },
                                        { text: "Italiano", callback_data: "/lang it" },
                                        { text: "Português", callback_data: "/lang pt" },
                                        { text: "Русский", callback_data: "/lang ru" },
                                        { text: "中文", callback_data: "/lang zh" },
                                        { text: "日本語", callback_data: "/lang ja" },
                                        { text: "한국어", callback_data: "/lang ko" },
                                        { text: "עברית", callback_data: "/lang he" }
                                    ]
                                ]
                            }
                        }
                    }])],
                ['hrSolutions',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'H.R Solutions:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "👥 Employee Onboarding", callback_data: "employeeOnboarding" }],
                                    [{ text: "📄 Document Management", callback_data: "documentManagement" }],
                                    [{ text: "📊 Performance Reviews", callback_data: "performanceReviews" }]
                                ]
                            }
                        }
                    }])],
                ['agencySolutions',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Agency Solutions:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "🏢 Agency Overview", callback_data: "agencyOverview" }],
                                    [{ text: "📋 Client Management", callback_data: "clientManagement" }],
                                    [{ text: "📈 Performance Metrics", callback_data: "performanceMetrics" }],
                                    [
                                        { text: "📊 Surveys", callback_data: "action=surveys" },
                                        { text: "📰 News", callback_data: "action=news" }], [
                                    ],
                                    [
                                        { text: "🤖 Developer", callback_data: "action=apiFeatures" }
                                    ]
                                ]
                            }
                        }
                    }])],
                ['surveys',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Survey Services:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "📊 Create Survey", callback_data: "createSurvey" }],
                                    [{ text: "📋 View Surveys", callback_data: "viewSurveys" }],
                                    [{ text: "📈 Survey Analytics", callback_data: "surveyAnalytics" }]
                                ]
                            }
                        }
                    }])],
                ['news',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'News Services:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "📰 Latest News", callback_data: "latestNews" }],
                                    [{ text: "🗞️ Trending Topics", callback_data: "trendingTopics" }],
                                    [{ text: "📅 News Archive", callback_data: "newsArchive" }]
                                ]
                            }
                        }
                    }])],
                ['quickActions',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Quick Actions:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "🚖 Call a Taxi", callback_data: "action=callTaxi" }],
                                    [{ text: "🔍 VPN Search", callback_data: "action=search" }],
                                    [{ text: "📦 Track Order", callback_data: "action=trackOrder" }]
                                ]
                            }
                        }
                    }])],
                ['privateSecure',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Privacy and Security Services:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🔒 Virtual Private Network (VPN)", callback_data: "action=safetyChecklist" },
                                        { text: "🛡️ Threat Assessment", callback_data: "action=threatAssessment" },
                                        { text: "🛠️ Maintenance Request", callback_data: "action=maintenanceRequest" }
                                    ],
                                    // Two buttons in one row
                                    [
                                        { text: "📱 Phone Number Authentication", callback_data: "action=phoneAuth" },
                                        { text: "🦶 Fingerprint Authentication", callback_data: "action=fingerprintAuth" }
                                    ],
                                    [
                                        { text: "📍 Share Location", callback_data: "photoSamples" },
                                        { text: "🆔 [CHAT_ID] User Identity", callback_data: "photoSamples" }
                                    ],
                                    [{ text: "🔒 Access Control", callback_data: "accessControl" }],
                                    [{ text: "🛡️ Threat Assessment", callback_data: "threatAssessment" }],
                                    [{ text: "📊 Security Analytics", callback_data: "securityAnalytics" }]
                                ]
                            }
                        }
                    }])],
                ['safetyChecklist',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Safety Checklist Services:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "✅ Daily Safety Check", callback_data: "dailySafetyCheck" }],
                                    [{ text: "📝 Incident Reporting", callback_data: "incidentReporting" }],
                                    [{ text: "📊 Safety Analytics", callback_data: "safetyAnalytics" }]
                                ]
                            }
                        }
                    }])],
                ['emergencyServices',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Emergency Services:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "🚑 Ambulance", callback_data: "emergencyAmbulance" }],
                                    [{ text: "🚓 Police", callback_data: "emergencyPolice" }],
                                    [{ text: "🚒 Fire Department", callback_data: "emergencyFire" }]
                                ]
                            }
                        }
                    }])
                ],
                ['privateInvestigatorServices',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Private Investigator Services:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "🕵️‍♂️ Hire a PI", callback_data: "hirePrivateInvestigator" }],
                                    [{ text: "📋 View Cases", callback_data: "viewPrivateInvestigatorCases" }],
                                    [{ text: "📞 Contact PI", callback_data: "contactPrivateInvestigator" }]
                                ]
                            }
                        }
                    }])
                ],
                ['customerSupportServices',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Customer Support Services:',
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "📞 Contact Support", callback_data: "contactSupport" }],
                                    [{ text: "💬 Live Chat", callback_data: "liveChatSupport" }],
                                    [{ text: "📚 FAQ", callback_data: "faqSupport" }]
                                ]
                            }
                        }
                    }])
                ],
                ['callTaxi',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Calling a taxi...',
                            parse_mode: 'HTML'
                        }
                    }])
                ],
                ['trackOrder',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Tracking your order...',
                            parse_mode: 'HTML'
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