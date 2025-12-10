// Entity Metadata Configuration Class
class EMD {
    constructor(model = {}) {
        this.model = model;
    }
}

EMD.DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/logo480.png';

EMD.Home = {
    entityName: 'Home',
    displayName: 'Home',
    pluralDisplayName: 'Homes',
    card: (data = {}) => {
        return {
            name: 'homeCard',
            header:
            {
                title: '🏠 Home',
                subTitle: 'Welcome to your home',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Home Image'
            },
            sections: [
                {  // Environment variables section
                    //header: 'Environment Variables',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // Environment variables widget
                            id: 'environment_variables_widget',
                            DecoratedText: {
                                text: data?.environmentTraffic || 'Configure your environment variables to get started',
                                topLabel: 'Step #1: Environment Variables',
                                bottomLabel: 'Click 🔩 to manage your environment variables',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '🔩',
                                    onClick: {
                                        functionName: 'EntityHandler.Addon.onOpenCardClick',
                                        parameters: {
                                            entityName: 'EnvironmentVariables'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Bot Setup Section
                    // header: 'Telegram Bot Setup',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // Bot setup widget
                            id: 'bot_setup_widget',
                            DecoratedText: {
                                text: 'Step #2: Setup Your Bot',
                                topLabel: '📡 Bot Setup',
                                bottomLabel: 'Click on 🤖 to setup your bot API token, set bot info & webhook',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '🤖',
                                    onClick: {
                                        functionName: 'EntityHandler.Addon.onOpenCardClick',
                                        parameters: { entityName: 'BotSetup' }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Automation Section
                    // header: 'Automation',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // Automation management widget
                            id: 'automation_management_widget',
                            DecoratedText: {
                                text: 'Automation - Workflow Management',
                                topLabel: `Total: ${data?.totalAutomations || 0} workflows`,
                                bottomLabel: 'Click ⚡ to manage your automations',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '⚡',
                                    onClick: {
                                        functionName: 'EntityHandler.Addon.onOpenCardClick',
                                        parameters: { entityName: 'Automation' }
                                    }
                                }
                            }
                        }
                    ]
                },
                { // Customer Management Section
                    // header: 'Customer Management',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {  // Customer management widget
                            id: 'customer_management_widget',
                            DecoratedText: {
                                text: 'CRM: Manage Your Customers',
                                topLabel: `Total: ${data?.totalCustomer || 0} customers`,
                                bottomLabel: 'Click 👥 to manage your customers (telegram users)',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '👥',
                                    onClick: {
                                        functionName: 'EntityHandler.Addon.onOpenCardClick',
                                        parameters: { entityName: 'Customer' }
                                    }
                                }
                            }
                        }
                    ]
                },
                { // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `Data: ${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.EnvironmentVariables = {
    entityName: 'EnvironmentVariables',
    displayName: 'Environment Variables',
    pluralDisplayName: 'Environment Variables',
    card: (data = {}) => {
        return {
            name: 'environment_variables_Card',
            header: {
                title: '🔩 Environment Variables',
                subTitle: 'Configure your environment variables here.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Environment Image'
            },
            sections:
                [
                    {   // Acative Spreadsheet ID setup
                        // header: '🔩 Active Spreadsheet Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {
                                id: 'active_spreadsheet_id_info',
                                TextParagraph: {
                                    text: `📊 Active Spreadsheet ID is currently: ${data.environmentVariables?.activeSpreadsheetIdSet ? 'Custome' : '[current]'}`
                                }
                            },
                            {   // Active Spreadsheet ID Variable
                                id: 'active_spreadsheet_id_variable',
                                TextInput: {
                                    title: 'Active Spreadsheet ID',
                                    fieldName: 'txt_active_spreadsheet_id',
                                    hint: 'Only "[current]" works for now'
                                },
                                value: '[current]',
                                propertyName: 'active_spreadsheet_id'
                            },
                            { // Save Active Spreadsheet ID Button
                                id: 'identify_active_spreadsheet_id_button',
                                TextButton: {
                                    text: '💾 Save Active Spreadsheet ID',
                                    onClick: {
                                        functionName: 'EnvironmentHandler.Addon.onIdentifyActiveSpreadsheetIdClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Default Language setup
                        // header: '🔩 Default Language Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {
                                id: 'default_language_info',
                                TextParagraph: {
                                    text: `🌐 Default Language is currently: ${data.environmentVariables?.defaultLanguageSet ? '✅ Set' : '❌ Not Set'}`
                                }
                            },
                            {   // Default Language Variable
                                id: 'default_language_variable',
                                TextInput: {
                                    title: 'Default Language',
                                    fieldName: 'txt_default_language',
                                    hint: 'Enter default language'
                                },
                                value: 'default',
                                propertyName: 'default_language'
                            },
                            { // Save Default Language Button
                                id: 'identify_default_language_button',
                                TextButton: {
                                    text: '💾 Save Default Language',
                                    onClick: {
                                        functionName: 'EnvironmentHandler.Addon.onSaveDefaultLanguageClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Admin Chat ID setup
                        // header: 'Admin Chat ID Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            { // Admin Chat ID Info
                                id: 'admin_chat_id_info',
                                TextParagraph: {
                                    text: `👑 Admin Chat ID is currently: ${data.environmentVariables?.chatIdSet ? '✅ Set' : '❌ Not Set'}`
                                }
                            },
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
                            { // Save Admin Chat ID Button
                                id: 'save_admin_chat_id_button',
                                TextButton: {
                                    text: '💾 Save Admin Chat ID',
                                    onClick: {
                                        functionName: 'EnvironmentHandler.Addon.onSaveAdminChatIdClick',
                                        parameters: {}
                                    }
                                }
                            }
                        ]
                    },
                    {   // Log Events Setting
                        //header: 'Environment variables',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {
                                id: 'log_events_info',
                                TextParagraph: {
                                    text: `🛰️ Log Events currently: ${data.environmentVariables?.debugModeSet ? '🟢 On' : '🔴 Off'}`
                                }
                            },
                            {   // Log Events widget
                                id: 'log_events_widget',
                                TextInput: {
                                    title: 'Log Events (Set to true or any other value for false)',
                                    fieldName: 'txt_log_events',
                                    hint: '"true" is on, anything else is off',
                                },
                                propertyName: 'debug_mode_set'
                            },
                            {   // Log Archive Widget
                                id: 'log_archive_widget',
                                TextInput: {
                                    title: 'Max log lines to keep (Set to number, default 1000)',
                                    fieldName: 'txt_log_archive',
                                    hint: 'Enter a number to limit log lines',
                                },
                                value: '1000',
                                propertyName: 'log_archive_size'
                            },
                            {
                                id: 'save_log_events_button',
                                TextButton: {
                                    text: '💾 Save',
                                    onClick: {
                                        functionName: 'EnvironmentHandler.Addon.onSaveLogEventsClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Data view
                        header: 'Data View',
                        collapsible: true,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            {   // Data View widget
                                id: 'data_view_widget',
                                TextParagraph: {
                                    text: `Data: ${JSON.stringify(data, null, 2)}`,
                                    maxLines: 35
                                }
                            }
                        ]
                    }
                ]
        }
    }
}

EMD.BotSetup = {
    entityName: 'BotSetup',
    displayName: 'Bot Setup',
    pluralDisplayName: 'Bot Setups',
    card: (data = {}) => {
        return {
            name: 'bot_setup_Card',
            header: {
                title: '🤖 Bot Setup',
                subTitle: 'Configure your bot environment variables here.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Environment Image'
            }
            ,
            sections:
                [
                    {   // identify bot api token
                        // header: '🔑 Bot API Token',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            { // Bot token set state
                                id: 'bot_token_set_state',
                                TextParagraph: {
                                    text: `🔑 Bot Token currently: ${data.setupFlow?.botTokenSet ? '✅ Set' : '❌ Not Set'}`
                                }
                            },
                            { // Get Me Result
                                id: 'get_me_result',
                                TextParagraph: {
                                    text: JSON.stringify(data.getMeResult || {}, null, 2)
                                }
                            },
                            { // Bot Token input variable
                                id: 'bot_token_variable',
                                TextInput: {
                                    title: 'Bot API Token',
                                    fieldName: 'txt_bot_api_token',
                                    hint: 'Enter bot API token'
                                },
                                propertyName: EnvironmentModel.InputMeta.BOT_API_TOKEN
                            },
                            { // Identify Token Button
                                id: 'identify_token_button',
                                TextButton: {
                                    text: '🆔 Identify Token',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onIdentifyTokenClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Deployment setup
                        // header: '🚀 Deployment Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {
                                id: 'deployment_id_info',
                                TextParagraph: {
                                    text: `🚀 Deployment ID is currently: ${data.environmentVariables?.deploymentIdSet ? '✅ Set' : '❌ Not Set'}`
                                }
                            },
                            {   // Production Deployment ID Variable
                                id: 'deployment_id_variable',
                                TextInput: {
                                    title: 'Production Deployment ID',
                                    fieldName: 'txt_deployment_id',
                                    hint: 'Enter production deployment ID'
                                },
                                propertyName: EnvironmentModel.InputMeta.DEPLOYMENT_ID
                            },
                            {   // Test Deployment ID Variable
                                id: 'test_deployment_id_variable',
                                TextInput: {
                                    title: 'Test Deployment ID',
                                    fieldName: 'txt_test_deployment_id',
                                    hint: 'Enter test deployment ID'
                                },
                                propertyName: EnvironmentModel.InputMeta.TEST_DEPLOYMENT_ID
                            },
                            { // Identify Deployment ID Button
                                id: 'identify_deployment_id_button',
                                TextButton: {
                                    text: '💾 Save Deployment ID',
                                    onClick: {
                                        functionName: 'EnvironmentHandler.Addon.onSaveDeploymentIdClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Webhook setup
                        // header: '🔗 Webhook Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {
                                id: 'webhook_setup_info',
                                TextParagraph: {
                                    text: `🔗 Webhook currently: ${data.setupFlow?.webhookSet ? '✅ Active' : '🔴 Inactive'}`
                                }
                            },
                            { // Webhook URL info
                                id: 'webhook_url_info',
                                TextParagraph: {
                                    text: JSON.stringify(data.getWebhookInfoResult || {}, null, 2),
                                    maxLines: 35
                                }
                            },
                            { // DecoratedText for prod webhook action (set,delete)
                                id: 'prod_webhook_action',
                                DecoratedText: {
                                    text: 'Production Webhook Action',
                                    topLabel: `🔗 Webhook Action`,
                                    bottomLabel: `${data.setupFlow?.webhookSet ? 'Delete or update your webhook' : 'Set up your webhook'}`,
                                    wrapText: false,
                                    textButton: {
                                        disabled: (data.environmentVariables?.deploymentIdSet ? false : true) || (data.environmentVariables?.botTokenSet ? false : true),
                                        text: `${data.setupFlow?.webhookSet ? '🗑️ Delete Webhook' : '📡 Set Webhook'}`,
                                        onClick: {
                                            functionName: 'BotHandler.Addon.onWebhookToggleClick',
                                            parameters: {
                                                action: data.setupFlow?.webhookSet ? 'deleteWebhook' : 'setWebhook',
                                                environment: 'exec'
                                            }
                                        }
                                    }
                                }
                            },
                            { // DecoratedText for test webhook action (set,delete)
                                id: 'test_webhook_action',
                                DecoratedText: {
                                    text: 'Test Webhook Action',
                                    topLabel: `🔗 Test Webhook Action`,
                                    bottomLabel: `${data.setupFlow?.webhookSet ? 'Delete or update your webhook' : 'Set up your webhook'}`,
                                    wrapText: false,
                                    textButton: {
                                        disabled: data.setupFlow?.webhookSet ? true : (data.environmentVariables?.testDeploymentIdSet ? false : true) || (data.environmentVariables?.botTokenSet ? false : true),
                                        text: `${data.setupFlow?.webhookSet ? '🗑️ Delete Webhook' : '📡 Set Webhook'}`,
                                        onClick: {
                                            functionName: 'BotHandler.Addon.onWebhookToggleClick',
                                            parameters: {
                                                action: data.setupFlow?.webhookSet ? 'deleteWebhook' : 'setWebhook',
                                                environment: 'test'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {   // Bot info settings
                        // header: '🤖 Bot Information',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {   // Bot info paragraph title
                                id: 'bot_info',
                                TextParagraph: {
                                    text: 'Set up your bot information \n\n(name, short description, commands, etc.) from the spreadsheet below.',
                                    maxLines: 10
                                }
                            },
                            {   // Bind Sheet with sample Data Button
                                id: 'bot_info_bind_sheet_button',
                                TextButton: {
                                    text: '📄 Bind Sheet with Sample Data',
                                    onClick: {
                                        functionName: 'EntityHandler.Addon.onBindSheetDataClick',
                                        parameters: { entityName: 'BotSetup' }
                                    }
                                }
                            },
                            {   // setMyName Button
                                id: 'bot_info_set_my_name_button',
                                TextButton: {
                                    text: '🌐 api/setMyName',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onSetMyNameClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {   // setMyDescription Button
                                id: 'bot_info_set_my_description_button',
                                TextButton: {
                                    text: '🌐 api/setMyDescription',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onSetMyDescriptionClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {  // setMyShortDescription Button
                                id: 'bot_info_set_my_short_description_button',
                                TextButton: {
                                    text: '🌐 api/setMyShortDescription',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onSetMyShortDescriptionClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {  // setMyCommands Button
                                id: 'bot_info_set_my_commands_button',
                                TextButton: {
                                    text: '🌐 api/setMyCommands',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onSetMyCommandsClick',
                                        parameters: {}
                                    }
                                }
                            }
                        ]
                    },
                    {   // Data view
                        header: 'Data View',
                        collapsible: true,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            {   // Data View widget
                                id: 'data_view_widget',
                                TextParagraph: {
                                    text: `Data: ${JSON.stringify(data, null, 2)}`,
                                    maxLines: 35
                                }
                            }
                        ]
                    }
                ]
        }
    },
    sheet: (data = {}) => {
        return {
            name: '🤖 Bot',
            columns: ['key', 'en', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
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
                    'Telegram Bots are secure and private channels ideal marketing tools within customer relationship management (CRM) systems. \n\n'
                    + 'Promote your goods and services, send notifications, conduct surveys, and much more!\n\n'
                    + 'Group your customers, create targeted communication channels, and engage with your audience like never before!\n\n',
                    'Los bots de Telegram son canales seguros y privados, herramientas de marketing ideales dentro de los sistemas de gestión de relaciones con los clientes (CRM). \n\n'
                    + 'Promociona tus productos y servicios, envía notificaciones, realiza encuestas y mucho más.\n\n'
                    + 'Agrupa a tus clientes, crea canales de comunicación segmentados y conecta con tu audiencia como nunca antes.\n\n',
                    'Les bots Telegram sont des canaux sécurisés et privés, des outils de marketing idéaux au sein des systèmes de gestion de la relation client (CRM). \n\n'
                    + 'Faites la promotion de vos biens et services, envoyez des notifications, réalisez des sondages, et bien plus encore !\n\n'
                    + 'Regroupez vos clients, créez des canaux de communication ciblés, et engagez-vous avec votre audience comme jamais auparavant !\n\n',
                    'روبوتات تيليجرام هي قنوات آمنة وخاصة، وأدوات تسويقية مثالية ضمن أنظمة إدارة علاقات العملاء (CRM). \n\n'
                    + 'قم بالترويج لمنتجاتك وخدماتك، وأرسل الإشعارات، وأجرِ الاستطلاعات، وأكثر من ذلك بكثير!\n\n'
                    + 'قم بتجميع عملائك، وأنشئ قنوات اتصال مستهدفة، وتفاعل مع جمهورك كما لم يحدث من قبل!\n\n',
                    'Telegram-Bots sind sichere und private Kanäle, ideale Marketing-Tools innerhalb von Customer-Relationship-Management-(CRM)-Systemen. \n\n'
                    + 'Bewerben Sie Ihre Waren und Dienstleistungen, senden Sie Benachrichtigungen, führen Sie Umfragen durch und vieles mehr!\n\n'
                    + 'Gruppieren Sie Ihre Kunden, erstellen Sie gezielte Kommunikationskanäle und interagieren Sie wie nie zuvor mit Ihrem Publikum!\n\n',
                    'I bot di Telegram sono canali sicuri e privati, strumenti di marketing ideali all\'interno dei sistemi di gestione delle relazioni con i clienti (CRM). \n\n'
                    + 'Promuovi i tuoi beni e servizi, invia notifiche, conduci sondaggi e molto altro!\n\n'
                    + 'Raggruppa i tuoi clienti, crea canali di comunicazione mirati e interagisci con il tuo pubblico come mai prima d\'ora!\n\n',
                    'Os bots do Telegram são canais seguros e privados, ferramentas de marketing ideais dentro dos sistemas de gestão de relacionamento com o cliente (CRM). \n\n'
                    + 'Promova seus bens e serviços, envie notificações, realize pesquisas e muito mais!\n\n'
                    + 'Agrupe seus clientes, crie canais de comunicação direcionados e interaja com seu público como nunca antes!\n\n',
                    'Телеграм-боты — это безопасные и приватные каналы, идеальные маркетинговые инструменты в системах управления взаимоотношениями с клиентами (CRM). \n\n'
                    + 'Продвигайте свои товары и услуги, отправляйте уведомления, проводите опросы и многое другое!\n\n'
                    + 'Группируйте своих клиентов, создавайте целевые каналы связи и взаимодействуйте с вашей аудиторией как никогда ранее!\n\n',
                    '电报机器人 是安全且私密的频道，是客户关系管理（CRM）系统中理想的营销工具。 \n\n'
                    + '推广您的商品和服务，发送通知，进行调查，等等！\n\n'
                    + '将客户分组，创建针对性的沟通渠道，与受众进行前所未有的互动！\n\n',
                    'テレグラムボット は、安全でプライベートなチャネルであり、顧客関係管理（CRM）システム内で理想的なマーケティングツールです。 \n\n'
                    + '商品やサービスを宣伝し、通知を送信し、アンケートを実施するなど、さまざまなことができます！\n\n'
                    + '顧客をグループ化し、ターゲットを絞ったコミュニケーションチャネルを作成し、かつてない方法でオーディエンスと交流しましょう！\n\n',
                    '텔레그램 봇 은 안전하고 개인적인 채널로, 고객 관계 관리(CRM) 시스템 내에서 이상적인 마케팅 도구입니다. \n\n'
                    + '상품 및 서비스를 홍보하고, 알림을 보내고, 설문 조사를 수행하는 등 다양한 작업을 수행할 수 있습니다!\n\n'
                    + '고객을 그룹화하고, 대상 커뮤니케이션 채널을 만들고, 그 어느 때보다 청중과 소통하세요!\n\n',
                    'בוטים של טלגרם הם ערוצים מאובטחים ופרטיים, כלים שיווקיים אידיאליים בתוך מערכות ניהול קשרי לקוחות (CRM). \n\n'
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
                            }
                        ]),
                    // Spanish
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Iniciar el bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Obtener ayuda sobre el uso del bot o informar un problema'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Acerca del bot'
                            }
                        ]),
                    // French
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Démarrer le bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Obtenir de l\'aide sur l\'utilisation du bot ou signaler un problème'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'À propos du bot'
                            }
                        ]),
                    // Arabic
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'بدء تشغيل البوت'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'الحصول على مساعدة حول استخدام البوت أو الإبلاغ عن مشكلة'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'معلومات عن البوت'
                            }
                        ]),
                    // German
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Bot starten'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Hilfe zur Verwendung des Bots oder zur Meldung eines Problems erhalten'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Über den Bot'
                            }
                        ]),
                    // Italian
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Avvia il bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Ottieni aiuto sull\'uso del bot o segnala un problema'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Informazioni sul bot'
                            }
                        ]),
                    // Portuguese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'Iniciar o bot'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'Obter ajuda sobre o uso do bot ou relatar um problema'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'Informações sobre o bot'
                        }
                    ]),
                    // Russian
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'Запустить бота'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'Получить помощь по использованию бота или сообщить о проблеме'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'Информация о боте'
                        }
                    ]),
                    // Chinese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: '启动机器人'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: '获取有关使用机器人的帮助或报告问题'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: '有关机器人的信息'
                        }
                    ]),
                    // Japanese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'ボットを開始します'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'ボットの使用に関するヘルプを取得するか、問題を報告します'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'ボットに関する情報'
                        }
                    ]),
                    // Korean
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: '봇을 시작합니다'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: '봇 사용에 대한 도움을 받거나 문제를 보고합니다'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: '봇에 대한 정보'
                        }
                    ]),
                    // Hebrew
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'הפעל את הבוט'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'קבל עזרה בשימוש בבוט או דווח על בעיות'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'מידע על הבוט'
                        }
                    ])
                ],
                // Webhook URL
                ['webhook_url',
                    'https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec']
            ]
        }
    }
}

EMD.Customer = {
    entityName: 'Customer',
    displayName: 'Customer',
    pluralDisplayName: 'Customers',
    card: (data = {}) => {
        return {
            name: 'customer_Card',
            header: {
                title: '👥 Customer Management',
                subTitle: 'Manage your customers here. Customers are your Telegram bot users.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Customer Image'
            },
            sections:
                [
                    { // Customer Management Section
                        // header: 'Customer Management',
                        collapsible: false,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            { // add data sample to Customer Sheet
                                id: 'add_sample_data_customer_widget',
                                DecoratedText: {
                                    topLabel: '➕',
                                    text: 'Add Sample Data',
                                    bottomLabel: 'Populate your Customer sheet with sample data to get started quickly.',
                                    wrapText: false,
                                    textButton: {
                                        text: 'Add Sample Data',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'EntityHandler.Addon.onBindSheetDataClick',
                                            parameters: {
                                                entityName: 'Customer'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
        };
    },
    sheet: (data = {}) => {
        return {
            name: '👥  Members',
            columns: ['Created on', 'chat_id', 'username', 'First Name', 'Last Name', 'language_code', 'is_bot', 'Data'],
            sample_data:
                [
                    ['2025-11-17T18:55:38.519Z', '123456789', 'john_doe', 'John', 'Doe', 'en', 'false', '{"message_id":54,"from":{"id":123456789,"is_bot":false,"first_name":"John","last_name":"Doe","username":"john_doe","language_code":"en","is_premium":true},"chat":{"id":123456789,"first_name":"John","last_name":"Doe","username":"john_doe","type":"private"},"date":1763405735,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2025-11-17T18:55:38.519Z', '987654321', 'jane_smith', 'Jane', 'Smith', 'es', 'false', '{"message_id":78,"from":{"id":987654321,"is_bot":false,"first_name":"Jane","last_name":"Smith","username":"jane_smith","language_code":"es","is_premium":false},"chat":{"id":987654321,"first_name":"Jane","last_name":"Smith","username":"jane_smith","type":"private"},"date":1763492135,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-03T09:45:00.445Z', '555666777', 'alice_wonder', 'Alice', 'Wonder', 'fr', 'false', '{"message_id":102,"from":{"id":555666777,"is_bot":false,"first_name":"Alice","last_name":"Wonder","username":"alice_wonder","language_code":"fr","is_premium":true},"chat":{"id":555666777,"first_name":"Alice","last_name":"Wonder","username":"alice_wonder","type":"private"},"date":1763578535,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-04T18:20:00.000Z', '222333444', 'bob_builder', 'Bob', 'Builder', 'de', 'false', '{"message_id":130,"from":{"id":222333444,"is_bot":false,"first_name":"Bob","last_name":"Builder","username":"bob_builder","language_code":"de","is_premium":false},"chat":{"id":222333444,"first_name":"Bob","last_name":"Builder","username":"bob_builder","type":"private"},"date":1763664935,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-05T11:10:00.000Z', '888999000', 'charlie_chaplin', 'Charlie', 'Chaplin', 'it', 'false', '{"message_id":158,"from":{"id":888999000,"is_bot":false,"first_name":"Charlie","last_name":"Chaplin","username":"charlie_chaplin","language_code":"it","is_premium":true},"chat":{"id":888999000,"first_name":"Charlie","last_name":"Chaplin","username":"charlie_chaplin","type":"private"},"date":1763751335,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-06T14:55:00.000Z', '444555666', 'diana_prince', 'Diana', 'Prince', 'pt', 'false', '{"message_id":186,"from":{"id":444555666,"is_bot":false,"first_name":"Diana","last_name":"Prince","username":"diana_prince","language_code":"pt","is_premium":false},"chat":{"id":444555666,"first_name":"Diana","last_name":"Prince","username":"diana_prince","type":"private"},"date":1763837735,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-07T08:05:00.000Z', '111222333', 'edward_snow', 'Edward', 'Snow', 'ru', 'false', '{"message_id":210,"from":{"id":111222333,"is_bot":false,"first_name":"Edward","last_name":"Snow","username":"edward_snow","language_code":"ru","is_premium":true},"chat":{"id":111222333,"first_name":"Edward","last_name":"Snow","username":"edward_snow","type":"private"},"date":1763924135,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-08T17:40:00.000Z', '777888999', 'fiona_shrek', 'Fiona', 'Shrek', 'zh', 'false', '{"message_id":238,"from":{"id":777888999,"is_bot":false,"first_name":"Fiona","last_name":"Shrek","username":"fiona_shrek","language_code":"zh","is_premium":false},"chat":{"id":777888999,"first_name":"Fiona","last_name":"Shrek","username":"fiona_shrek","type":"private"},"date":1764010535,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-09T10:25:00.000Z', '333444555', 'george_clooney', 'George', 'Clooney', 'ja', 'false', '{"message_id":266,"from":{"id":333444555,"is_bot":false,"first_name":"George","last_name":"Clooney","username":"george_clooney","language_code":"ja","is_premium":true},"chat":{"id":333444555,"first_name":"George","last_name":"Clooney","username":"george_clooney","type":"private"},"date":1764096935,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-10T13:15:00.000Z', '666777888', 'hannah_montana', 'Hannah', 'Montana', 'ko', 'false', '{"message_id":294,"from":{"id":666777888,"is_bot":false,"first_name":"Hannah","last_name":"Montana","username":"hannah_montana","language_code":"ko","is_premium":false},"chat":{"id":666777888,"first_name":"Hannah","last_name":"Montana","username":"hannah_montana","type":"private"},"date":1764183335,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-11T09:50:00.000Z', '999000111', 'ivan_ivanov', 'Ivan', 'Ivanov', 'he', 'false', '{"message_id":322,"from":{"id":999000111,"is_bot":false,"first_name":"Ivan","last_name":"Ivanov","username":"ivan_ivanov","language_code":"he","is_premium":true},"chat":{"id":999000111,"first_name":"Ivan","last_name":"Ivanov","username":"ivan_ivanov","type":"private"},"date":1764269735,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-12T16:30:00.000Z', '121314151', 'julia_roberts', 'Julia', 'Roberts', 'en', 'false', '{"message_id":350,"from":{"id":121314151,"is_bot":false,"first_name":"Julia","last_name":"Roberts","username":"julia_roberts","language_code":"en","is_premium":false},"chat":{"id":121314151,"first_name":"Julia","last_name":"Roberts","username":"julia_roberts","type":"private"},"date":1764356135,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-13T11:20:00.000Z', '161718192', 'kevin_bacon', 'Kevin', 'Bacon', 'es', 'false', '{"message_id":378,"from":{"id":161718192,"is_bot":false,"first_name":"Kevin","last_name":"Bacon","username":"kevin_bacon","language_code":"es","is_premium":true},"chat":{"id":161718192,"first_name":"Kevin","last_name":"Bacon","username":"kevin_bacon","type":"private"},"date":1764442535,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-14T14:10:00.000Z', '202122232', 'linda_hamilton', 'Linda', 'Hamilton', 'fr', 'false', '{"message_id":406,"from":{"id":202122232,"is_bot":false,"first_name":"Linda","last_name":"Hamilton","username":"linda_hamilton","language_code":"fr","is_premium":false},"chat":{"id":202122232,"first_name":"Linda","last_name":"Hamilton","username":"linda_hamilton","type":"private"},"date":1764528935,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-15T08:55:00.000Z', '242526272', 'michael_jordan', 'Michael', 'Jordan', 'ar', 'false', '{"message_id":434,"from":{"id":242526272,"is_bot":false,"first_name":"Michael","last_name":"Jordan","username":"michael_jordan","language_code":"ar","is_premium":true},"chat":{"id":242526272,"first_name":"Michael","last_name":"Jordan","username":"michael_jordan","type":"private"},"date":1764615335,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-16T17:35:00.000Z', '282930313', 'natalie_portman', 'Natalie', 'Portman', 'de', 'false', '{"message_id":462,"from":{"id":282930313,"is_bot":false,"first_name":"Natalie","last_name":"Portman","username":"natalie_portman","language_code":"de","is_premium":false},"chat":{"id":282930313,"first_name":"Natalie","last_name":"Portman","username":"natalie_portman","type":"private"},"date":1764701735,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-17T10:15:00.000Z', '323334353', 'oscar_wilde', 'Oscar', 'Wilde', 'it', 'false', '{"message_id":490,"from":{"id":323334353,"is_bot":false,"first_name":"Oscar","last_name":"Wilde","username":"oscar_wilde","language_code":"it","is_premium":true},"chat":{"id":323334353,"first_name":"Oscar","last_name":"Wilde","username":"oscar_wilde","type":"private"},"date":1764788135,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-18T13:05:00.000Z', '363738394', 'paula_abdul', 'Paula', 'Abdul', 'pt', 'false', '{"message_id":518,"from":{"id":363738394,"is_bot":false,"first_name":"Paula","last_name":"Abdul","username":"paula_abdul","language_code":"pt","is_premium":false},"chat":{"id":363738394,"first_name":"Paula","last_name":"Abdul","username":"paula_abdul","type":"private"},"date":1764874535,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-19T09:40:00.000Z', '404142434', 'quentin_tarantino', 'Quentin', 'Tarantino', 'ru', 'false', '{"message_id":546,"from":{"id":404142434,"is_bot":false,"first_name":"Quentin","last_name":"Tarantino","username":"quentin_tarantino","language_code":"ru","is_premium":true},"chat":{"id":404142434,"first_name":"Quentin","last_name":"Tarantino","username":"quentin_tarantino","type":"private"},"date":1764960935,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-20T16:20:00.000Z', '444546474', 'rachel_green', 'Rachel', 'Green', 'zh', 'false', '{"message_id":574,"from":{"id":444546474,"is_bot":false,"first_name":"Rachel","last_name":"Green","username":"rachel_green","language_code":"zh","is_premium":false},"chat":{"id":444546474,"first_name":"Rachel","last_name":"Green","username":"rachel_green","type":"private"},"date":1765047335,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}']
                ]
        }
    }
}

EMD.Automation = {
    entityName: 'Automation',
    displayName: 'Automation',
    pluralDisplayName: 'Automations',
    card: (data = {}) => {
        return {
            name: 'automation_Card',
            header: {
                title: '⚡ Automation & Workflows',
                subTitle: 'Manage your bot automations here.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Automation Image'
            },
            sections:
                [
                    { // Basic Automation Section
                        // header: 'Automation Management',
                        collapsible: false,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            {
                                id: 'create_basic_automation_widget',
                                DecoratedText: {
                                    topLabel: '✨ Basic Automations',
                                    text: 'Create basic automations from predefined templates to get started quickly.',
                                    bottomLabel: 'Bind basic template data to get started with basic automations',
                                    wrapText: false,
                                    textButton: {
                                        text: '✨ Basic Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'EntityHandler.Addon.onBindSheetDataClick',
                                            parameters: {
                                                entityName: 'BasicAutomation'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    { // Add Store Automation template section
                        // header: 'Automation Management',
                        collapsible: false,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            {
                                id: 'create_store_automation_widget',
                                DecoratedText: {
                                    topLabel: '✨ Store Automations',
                                    text: 'Add store automation templates to manage your store-related tasks efficiently.',
                                    bottomLabel: 'Bind store template data to get started with store automations',
                                    wrapText: false,
                                    textButton: {
                                        text: '✨ Store Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'EntityHandler.Addon.onBindSheetDataClick',
                                            parameters: {
                                                entityName: 'StoreAutomation'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    { // Add Survey Automation template section
                        // header: 'Automation Management',
                        collapsible: false,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            {
                                id: 'create_survey_automation_widget',
                                DecoratedText: {
                                    topLabel: '✨ Survey Automations',
                                    text: 'Add survey automation templates to manage your survey-related tasks efficiently.',
                                    bottomLabel: 'Bind survey template data to get started with survey automations',
                                    wrapText: false,
                                    textButton: {
                                        text: '✨ Survey Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'EntityHandler.Addon.onBindSheetDataClick',
                                            parameters: {
                                                entityName: 'SurveyAutomation'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    // Automation Management Section
                    {
                        // header: 'Automation Management',
                        collapsible: false,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            {
                                id: 'create_automation_widget',
                                DecoratedText: {
                                    topLabel: '⚡ Template-based Automations',
                                    text: 'Create automations from predefined templates to get started quickly.',
                                    bottomLabel: 'Bind template data to get started',
                                    wrapText: false,
                                    textButton: {
                                        text: '⚡ Bind Template Data',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'EntityHandler.Addon.onBindSheetDataClick',
                                            parameters: {
                                                entityName: 'Automation'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    { // clear cache memory section
                        // header: 'Cache Management',
                        collapsible: true,
                        widgets: [
                            {
                                id: 'clear_cache_widget',
                                DecoratedText: {
                                    topLabel: '🧹 Clear Cache',
                                    text: 'Clear the cache to free up memory and improve performance.',
                                    bottomLabel: 'This action cannot be undone.',
                                    wrapText: false,
                                    textButton: {
                                        text: '🧹 Clear Cache',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'EntityHandler.Addon.onClearCacheClick',
                                            parameters: {
                                                prefix: 'Automation'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
        };
    },
    sheet: (data = {}) => {
        return {
            name: '✨ Automations',
            columns: ['action', 'en', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
            sample_data:
                [
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
                                            { text: "🆘 Help", callback_data: "help" },
                                            { text: "ℹ️ About", callback_data: "about" }
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
                    ['_unauthorized_',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚫 Oops! You are not authorized to perform this action. Please contact the administrator if you believe this is an error.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 Help", callback_data: "help" },
                                            { text: "ℹ️ About", callback_data: "about" }
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
                                text: '🚫 ¡Ups! No estás autorizado para realizar esta acción. Por favor, contacta al administrador si crees que esto es un error.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 Ayuda", callback_data: "help" },
                                            { text: "ℹ️ Acerca de", callback_data: "about" }
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
                                text: '🚫 Désolé, vous n\'êtes pas autorisé à effectuer cette action. Veuillez contacter l\'administrateur si vous pensez qu\'il s\'agit d\'une erreur.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 Aide", callback_data: "help" },
                                            { text: "ℹ️ À propos", callback_data: "about" }
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
                                text: '🚫 عذرًا، أنت غير مصرح لك بتنفيذ هذا الإجراء. يرجى الاتصال بالمسؤول إذا كنت تعتقد أن هذه خطأ.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 مساعدة", callback_data: "help" },
                                            { text: "ℹ️ حول", callback_data: "about" }
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
                                text: '🚫 Entschuldigung, Sie sind nicht berechtigt, diese Aktion auszuführen. Bitte kontaktieren Sie den Administrator, wenn Sie denken, dass dies ein Fehler ist.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 Hilfe", callback_data: "help" },
                                            { text: "ℹ️ Über", callback_data: "about" }
                                        ],
                                        [
                                            { text: "🏠 Startseite", callback_data: "/home" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚫 Ci scusiamo, non sei autorizzato a eseguire questa azione. Contatta l\'amministratore se pensi che si tratti di un errore.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 Aiuto", callback_data: "help" },
                                            { text: "ℹ️ Informazioni", callback_data: "about" }
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
                                text: '🚫 Desculpe, você não tem permissão para executar esta ação. Entre em contato com o administrador se achar que isso é um erro.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 Ajuda", callback_data: "help" },
                                            { text: "ℹ️ Sobre", callback_data: "about" }
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
                                text: '🚫 Извините, у вас нет разрешения на выполнение этого действия. Пожалуйста, свяжитесь с администратором, если вы считаете, что это ошибка.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 Помощь", callback_data: "help" },
                                            { text: "ℹ️ Информация", callback_data: "about" }
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
                                text: '🚫 对不起，您没有权限执行此操作。如果您认为这是一个错误，请联系管理员。',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 帮助", callback_data: "help" },
                                            { text: "ℹ️ 信息", callback_data: "about" }
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
                                text: '🚫 申し訳ありませんが、この操作を実行する権限がありません。これがエラーだと思われる場合は、管理者に連絡してください。',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 ヘルプ", callback_data: "help" },
                                            { text: "ℹ️ 情報", callback_data: "about" }
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
                                text: '🚫 죄송하지만 이 작업을 수행할 권한이 없습니다. 이것이 오류라고 생각되면 관리자에게 문의하십시오.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 도움말", callback_data: "help" },
                                            { text: "ℹ️ 정보", callback_data: "about" }
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
                                text: '🚫 מצטער, אבל אין לך הרשאה לבצע פעולה זו. אם אתה חושב שזה שגיאה, אנא פנה למנהל.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🆘 עזרה", callback_data: "help" },
                                            { text: "ℹ️ מידע", callback_data: "about" }
                                        ],
                                        [
                                            { text: "🏠 בית", callback_data: "/home" }
                                        ]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['/start',
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
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Welcome.\n\n'
                                        + 'I am a simple Telegram bot that showcases various features and functionalities.\n\n'
                                        + 'Feel free to interact with me and discover what I can do!\n\n'
                                        + 'I hope you enjoy your experience! 😊\n\n'
                                        + '<blockquote expandable>Feedback: \n'
                                        + 'We appreciate your feedback to improve this bot.\n'
                                        + 'Please let us know your thoughts!\n\n'
                                        + '</blockquote>',
                                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: 'API Features', callback_data: "/apis" }
                                            ],
                                            [
                                                { text: 'Store', callback_data: "/store" }
                                            ],
                                            [
                                                { text: '❓ Help', callback_data: "/help" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ])
                    ],
                    ['/admin',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>Admin Panel</b>\n\n' +
                                    'Welcome to the Admin Panel. Here you can manage various aspects of the bot and its functionalities.\n\n' +
                                    'Use the buttons below to navigate through the admin features.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "User Management", callback_data: "adminUserManagement" }],
                                        [{ text: "Bot Settings", callback_data: "adminBotSettings" }],
                                        [{ text: "Analytics", callback_data: "adminAnalytics" }],
                                        [{ text: "System Logs", callback_data: "adminSystemLogs" }],
                                        [{ text: "Home", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>Panel de Administración</b>\n\n' +
                                    'Bienvenido al Panel de Administración. Aquí puedes gestionar varios aspectos del bot y sus funcionalidades.\n\n' +
                                    'Utiliza los botones de abajo para navegar por las funciones de administración.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Gestión de Usuarios", callback_data: "adminUserManagement" }],
                                        [{ text: "Configuración del Bot", callback_data: "adminBotSettings" }],
                                        [{ text: "Analítica", callback_data: "adminAnalytics" }],
                                        [{ text: "Registros del Sistema", callback_data: "adminSystemLogs" }],
                                        [{ text: "Inicio", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // french (fr)
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>Panneau d\'Administration</b>\n\n' +
                                    'Bienvenue dans le Panneau d\'Administration. Ici, vous pouvez gérer divers aspects du bot et de ses fonctionnalités.\n\n' +
                                    'Utilisez les boutons ci-dessous pour naviguer dans les fonctionnalités d\'administration.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Gestion des Utilisateurs", callback_data: "adminUserManagement" }],
                                        [{ text: "Paramètres du Bot", callback_data: "adminBotSettings" }],
                                        [{ text: "Analytique", callback_data: "adminAnalytics" }],
                                        [{ text: "Journaux du Système", callback_data: "adminSystemLogs" }],
                                        [{ text: "Accueil", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // AR
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>لوحة التحكم</b>\n\n' +
                                    'مرحبًا بك في لوحة التحكم. هنا يمكنك إدارة جوانب مختلفة من الروبوت وميزاته.\n\n' +
                                    'استخدم الأزرار أدناه للتنقل بين ميزات الإدارة.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "إدارة المستخدمين", callback_data: "adminUserManagement" }],
                                        [{ text: "إعدادات الروبوت", callback_data: "adminBotSettings" }],
                                        [{ text: "تحليلات", callback_data: "adminAnalytics" }],
                                        [{ text: "سجلات النظام", callback_data: "adminSystemLogs" }],
                                        [{ text: "الصفحة الرئيسية", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // DE
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>Administrationsbereich</b>\n\n' +
                                    'Willkommen im Administrationsbereich. Hier können Sie verschiedene Aspekte des Bots und seiner Funktionen verwalten.\n\n' +
                                    'Verwenden Sie die Schaltflächen unten, um durch die Verwaltungsfunktionen zu navigieren.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Benutzerverwaltung", callback_data: "adminUserManagement" }],
                                        [{ text: "Bot-Einstellungen", callback_data: "adminBotSettings" }],
                                        [{ text: "Analytik", callback_data: "adminAnalytics" }],
                                        [{ text: "Systemprotokolle", callback_data: "adminSystemLogs" }],
                                        [{ text: "Startseite", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // IT
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>Area di Amministrazione</b>\n\n' +
                                    'Benvenuto nell\'area di amministrazione. Qui puoi gestire vari aspetti del bot e delle sue funzionalità.\n\n' +
                                    'Utilizza i pulsanti qui sotto per navigare tra le funzioni di amministrazione.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Gestione Utenti", callback_data: "adminUserManagement" }],
                                        [{ text: "Impostazioni Bot", callback_data: "adminBotSettings" }],
                                        [{ text: "Analitica", callback_data: "adminAnalytics" }],
                                        [{ text: "Log di Sistema", callback_data: "adminSystemLogs" }],
                                        [{ text: "Home", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // PT
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>Área de Administração</b>\n\n' +
                                    'Bem-vindo à área de administração. Aqui você pode gerenciar vários aspectos do bot e suas funcionalidades.\n\n' +
                                    'Use os botões abaixo para navegar pelas funções de administração.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Gerenciamento de Usuários", callback_data: "adminUserManagement" }],
                                        [{ text: "Configurações do Bot", callback_data: "adminBotSettings" }],
                                        [{ text: "Análise", callback_data: "adminAnalytics" }],
                                        [{ text: "Logs do Sistema", callback_data: "adminSystemLogs" }],
                                        [{ text: "Início", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // RU
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>Административная зона</b>\n\n' +
                                    'Добро пожаловать в административную зону. Здесь вы можете управлять различными аспектами бота и его функциональностью.\n\n' +
                                    'Используйте кнопки ниже, чтобы перейти к функциям администрирования.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Управление пользователями", callback_data: "adminUserManagement" }],
                                        [{ text: "Настройки бота", callback_data: "adminBotSettings" }],
                                        [{ text: "Аналитика", callback_data: "adminAnalytics" }],
                                        [{ text: "Журнал системы", callback_data: "adminSystemLogs" }],
                                        [{ text: "Главная", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // ZH
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>管理区域</b>\n\n' +
                                    '欢迎来到管理区域。在这里，您可以管理机器人的各个方面及其功能。\n\n' +
                                    '请使用下面的按钮浏览管理功能。',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "用户管理", callback_data: "adminUserManagement" }],
                                        [{ text: "机器人设置", callback_data: "adminBotSettings" }],
                                        [{ text: "分析", callback_data: "adminAnalytics" }],
                                        [{ text: "系统日志", callback_data: "adminSystemLogs" }],
                                        [{ text: "首页", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // JA
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>管理エリア</b>\n\n' +
                                    '管理エリアへようこそ。ここでは、ボットのさまざまな側面と機能を管理できます。\n\n' +
                                    '管理機能に移動するには、以下のボタンを使用してください。',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ユーザー管理", callback_data: "adminUserManagement" }],
                                        [{ text: "ボット設定", callback_data: "adminBotSettings" }],
                                        [{ text: "分析", callback_data: "adminAnalytics" }],
                                        [{ text: "システムログ", callback_data: "adminSystemLogs" }],
                                        [{ text: "ホーム", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // KO
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>관리 영역</b>\n\n' +
                                    '관리 영역에 오신 것을 환영합니다. 여기에서 봇의 다양한 측면과 기능을 관리할 수 있습니다.\n\n' +
                                    '관리 기능으로 이동하려면 아래 버튼을 사용하세요.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "사용자 관리", callback_data: "adminUserManagement" }],
                                        [{ text: "봇 설정", callback_data: "adminBotSettings" }],
                                        [{ text: "분석", callback_data: "adminAnalytics" }],
                                        [{ text: "시스템 로그", callback_data: "adminSystemLogs" }],
                                        [{ text: "홈", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }]),
                        // HE
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>אזור ניהול</b>\n\n' +
                                    'ברוכים הבאים לאזור הניהול. כאן תוכלו לנהל את ההיבטים והפונקציות השונות של הבוט.\n\n' +
                                    'כדי לעבור לפונקציות הניהול, השתמשו בכפתורים למטה.',
                                parse_mode: 'HTML',
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ניהול משתמשים", callback_data: "adminUserManagement" }],
                                        [{ text: "הגדרות בוט", callback_data: "adminBotSettings" }],
                                        [{ text: "אנליטיקה", callback_data: "adminAnalytics" }],
                                        [{ text: "יומני מערכת", callback_data: "adminSystemLogs" }],
                                        [{ text: "בית", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])],
                    ['/about_me',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '✨ About Me ✨\n\n',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'editMessageText',
                                delay_ms: 500,
                                payload: {
                                    text: '✨ About Me ✨\n\n <blockquote>This bot is developed to showcase the capabilities of the Telegram Bot API. \n\n'
                                        + 'It demonstrates how to send messages, photos, media groups, and interactive inline keyboards. \n\n'
                                        + 'I\'m going to update this message with more details shortly... \n\n</blockquote>',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'editMessageMedia',
                                delay_ms: 2000,
                                payload: {
                                    caption: '✨ About Me ✨\n\n <blockquote>This bot is developed to showcase the capabilities of the Telegram Bot API. \n\n'
                                        + 'It demonstrates how to send messages, photos, media groups, and interactive inline keyboards. \n\n'
                                        + 'I\'m going to update this message with more details shortly... \n\n</blockquote>'
                                        + '<b>Here is an image to make it more interesting!</b>',
                                    media: { type: 'photo', media: 'https://www.gstatic.com/webp/gallery/2.jpg' },
                                    parse_mode: 'HTML'
                                }
                            },
                            { "next": "#main_menu" }
                        ])
                    ],
                    ['#main_menu',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Main Menu:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Home", callback_data: "/home" }],
                                        [{ text: "ℹ️ About", callback_data: "/about" }],
                                        [{ text: "❓ Help", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }])
                    ],
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
                                photo: "https://www.gstatic.com/webp/gallery/2.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Getting Started", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } }],
                                        [{ text: "Report an Issue", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered/issues" } }],
                                        [{ text: "Home", callback_data: "/home" }]
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
                                photo: "https://www.gstatic.com/webp/gallery/3.jpg",
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "GitHub", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } }],
                                        [{ text: "Home", callback_data: "start" }]
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
                    ['/store',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Welcome to the Store! Here you can find various products and services.',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Category A", callback_data: "#categoryA" }],
                                        [{ text: "Category B", callback_data: "#categoryB" }],
                                        [{ text: "Category C", callback_data: "#categoryC" }],
                                        [{ text: "Category D", callback_data: "#categoryD" }],
                                        [{ text: "Category E", callback_data: "#categoryE" }],
                                        [{ text: "Home", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])],
                    ['#categoryA',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category A! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #1',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_123', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 550 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #2',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n'
                                        + 'Available in multiple colors and sizes.',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 980 } // Amount in smallest units (e.g., cents)

                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #3',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n'
                                        + 'Shipping included.',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryB',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category B! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #10',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 450 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #20',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 45 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #30',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 300 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryC',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category C! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 100',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1250 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 122',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 5580 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 33',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryD',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category D! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #11',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 123 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #12',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 550 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #13',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryE',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Welcome to Category E! Here you can find a variety of products and services tailored to your needs.',
                                parse_mode: 'HTML'
                            }
                        }, {
                            // send paid media as sample after invoice
                            method: 'sendPaidMedia',
                            payload: {
                                protect_content: true,
                                star_count: 1000,
                                media: [
                                    {
                                        type: 'photo',
                                        media: 'https://www.gstatic.com/webp/gallery/1.jpg',
                                        caption: 'Thank you for your purchase! Here is your paid media content.'
                                    }
                                ]
                            }
                        },
                        {
                            // send paid media as sample after invoice
                            method: 'sendPaidMedia',
                            payload: {
                                protect_content: true,
                                star_count: 2400,
                                media: [
                                    {
                                        type: 'photo',
                                        media: 'https://www.gstatic.com/webp/gallery/3.jpg',
                                        caption: 'Thank you for your purchase! Here is your paid media content.'
                                    }
                                ]
                            }
                        },
                        {
                            // send paid media as sample after invoice
                            method: 'sendPaidMedia',
                            payload: {
                                protect_content: true,
                                star_count: 1400,
                                media: [
                                    {
                                        type: 'photo',
                                        media: 'https://www.gstatic.com/webp/gallery/2.jpg',
                                        caption: 'Thank you for your purchase! Here is your paid media content.'
                                    }
                                ]
                            }
                        }, { "next": "/store" }])],
                    ['/apis',
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
                                        [{ text: "Message", callback_data: "#sendMessage" }],
                                        [{ text: "Photo", callback_data: "#sendPhoto" }],
                                        [{ text: "Media Group", callback_data: "#sendMediaGroup" }],
                                        [{ text: "Inline Keyboard", callback_data: "#inlineKeyboard" }],
                                        [{ text: "Send Poll", callback_data: "#sendPoll" }],
                                        [{ text: "Send Quiz", callback_data: "#sendQuiz" }],
                                        [{ text: "Home", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])],
                    ['#sendMessage',
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
                                parse_mode: 'HTML'
                            }
                        }])],
                    ['#sendPhoto',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Welcome! This is a sample photo with a caption. You can customize the caption as needed. \n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML'
                            }
                        }])],
                    ['#sendMediaGroup',
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
                                parse_mode: 'HTML'
                            }
                        }])],
                    ['#inlineKeyboard',
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
                        }])],
                    ['#sendPoll',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Which feature do you like the most in this bot?',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Text Messages with HTML formatting',
                                    'Photos with captions and inline keyboards',
                                    'Media Groups (albums) with multiple photos',
                                    'Interactive Inline Keyboards'
                                ]),
                                protect_content: true,
                                open_period: 7,
                                is_anonymous: false,
                                explanation: 'Your feedback helps us improve the bot and add more exciting features!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])],
                    ['#sendQuiz',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'What is the <b>main</b> advantage of using Interactive Inline Keyboards in Telegram bots? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'They allow sending larger files',
                                    'They enable real-time user interaction',
                                    'They improve message delivery speed',
                                    'They support multimedia content'
                                ]),
                                protect_content: true,
                                open_period: 7,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Interactive Inline Keyboards allow users to engage directly with the bot, making the experience more dynamic and user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])],
                    ['/payments',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Sample Product',
                                    description: 'This is a sample product for demonstration purposes.',
                                    payload: 'sample_product_payload',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 100 } // amount in the smallest units of the currency (e.g., cents)
                                    ])
                                }
                            }, {
                                // send paid media as sample after invoice
                                method: 'sendPaidMedia',
                                payload: {
                                    protect_content: true,
                                    star_count: 100,
                                    media: [
                                        {
                                            type: 'photo',
                                            media: 'https://www.gstatic.com/webp/gallery/1.jpg',
                                            caption: 'Thank you for your purchase! Here is your paid media content.'
                                        }
                                    ]
                                }
                            }])
                    ]
                ]
        }
    }
}

EMD.BasicAutomation = {
    entityName: 'BasicAutomation',
    displayName: 'Basic Automation',
    pluralDisplayName: 'Basic Automations',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- 📦 BASIC AUTOMATION SAMPLE DATA START ----',
                        '---- 📦 BASIC AUTOMATION SAMPLE DATA START ----',
                        '---- 📦 BASIC AUTOMATION SAMPLE DATA START ----',
                        '---- 📦 BASIC AUTOMATION SAMPLE DATA START ----'],
                    ['_action_not_found_',
                        // default (en)
                        JSON.stringify([{ "next": "#answer_unknown_action" }, { "next": "#send_unknown_action_message" }, { "next": "#append_back_to_start_keyboard" }])
                    ],
                    ['/start',
                        // default (en)
                        JSON.stringify([{ "next": "#remove_keyboard" }, { "next": "#send_welcome_messages" }, { "next": "#append_main_menu_keyboard" }, { "next": "#answer_completed" }])
                    ],
                    ['/help',
                        // default (en)
                        JSON.stringify([{ "next": "#remove_keyboard" }, { "next": "#send_help_message" }, { "next": "#append_back_to_start_keyboard" }, { "next": "#answer_completed" }])
                    ],
                    ['/about',
                        // default (en)
                        JSON.stringify([{ "next": "#remove_keyboard" }, { "next": "#send_about_message" }, { "next": "#append_back_to_start_keyboard" }, { "next": "#answer_completed" }])
                    ],
                    ['#send_welcome_messages',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Hi..' + '\n\n'
                                    + 'Thank you for starting me! You are in safe hands. \n\n'
                                    + 'All our interactions are confidential and secure.\n\n'
                                    + '<blockquote expandable> Read more About Me: 🤖 \n'
                                    + 'I am here to assist you with various Telegram bot functionalities.\n\n'
                                    + 'You can use me to learn about sending messages, photos, media groups, and more!\n\n'
                                    + 'Just let me know what you would like to do!' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Hola..' + '\n\n'
                                    + '¡Gracias por iniciarme! Estás en buenas manos. \n\n'
                                    + 'Todas nuestras interacciones son confidenciales y seguras.\n\n'
                                    + '<blockquote expandable> Leer más Sobre mí: 🤖 \n'
                                    + 'Estoy aquí para ayudarte con varias funcionalidades de bots de Telegram.\n\n'
                                    + '¡Puedes usarme para aprender sobre el envío de mensajes, fotos, grupos multimedia y más!\n\n'
                                    + '¡Solo dime qué te gustaría hacer!' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Salut..' + '\n\n'
                                        + 'Merci de m\'avoir démarré ! Vous êtes entre de bonnes mains. \n\n'
                                        + 'Toutes nos interactions sont confidentielles et sécurisées.\n\n'
                                        + '<blockquote expandable> En savoir plus À propos de moi : 🤖 \n'
                                        + 'Je suis ici pour vous aider avec diverses fonctionnalités de bot Telegram.\n\n'
                                        + 'Vous pouvez m\'utiliser pour apprendre à envoyer des messages, des photos, des groupes multimédias, et plus encore !\n\n'
                                        + 'Faites-moi savoir ce que vous aimeriez faire !' + '\n\n'
                                        + '</blockquote>',
                                    parse_mode: 'HTML',
                                }
                            }]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'مرحبًا..' + '\n\n'
                                        + 'شكرًا لبدء تشغيلّي! أنت في أيدٍ أمينة. \n\n'
                                        + 'جميع تفاعلاتنا سرية وآمنة.\n\n'
                                        + '<blockquote expandable> اقرأ المزيد عني: 🤖 \n'
                                        + 'أنا هنا لمساعدتك في مختلف وظائف بوت تيليجرام.\n\n'
                                        + 'يمكنك استخدامي لتعلم كيفية إرسال الرسائل، الصور، المجموعات الإعلامية، والمزيد!\n\n'
                                        + 'فقط أخبرني بما ترغب في القيام به!' + '\n\n'
                                        + '</blockquote>',
                                    parse_mode: 'HTML',
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Hallo..' + '\n\n'
                                        + 'Danke, dass du mich gestartet hast! Du bist in sicheren Händen. \n\n'
                                        + 'Alle unsere Interaktionen sind vertraulich und sicher.\n\n'
                                        + '<blockquote expandable> Mehr über mich lesen: 🤖 \n'
                                        + 'Ich bin hier, um dir bei verschiedenen Telegram-Bot-Funktionen zu helfen.\n\n'
                                        + 'Du kannst mich nutzen, um zu lernen, wie man Nachrichten, Fotos, Mediengruppen und mehr sendet!\n\n'
                                        + 'Lass mich einfach wissen, was du tun möchtest!' + '\n\n'
                                        + '</blockquote>',
                                    parse_mode: 'HTML',
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Ciao..' + '\n\n'
                                    + 'Grazie per avermi avviato! Sei in buone mani. \n\n'
                                    + 'Tutte le nostre interazioni sono confidenziali e sicure.\n\n'
                                    + '<blockquote expandable> Per saperne di più Su di me: 🤖 \n'
                                    + 'Sono qui per aiutarti con varie funzionalità del bot di Telegram.\n\n'
                                    + 'Puoi utilizzarmi per imparare a inviare messaggi, foto, gruppi multimediali e altro ancora!\n\n'
                                    + 'Fammi sapere cosa vorresti fare!' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Oi..' + '\n\n'
                                    + 'Obrigado por me iniciar! Você está em boas mãos. \n\n'
                                    + 'Todas as nossas interações são confidenciais e seguras.\n\n'
                                    + '<blockquote expandable> Leia mais Sobre mim: 🤖 \n'
                                    + 'Estou aqui para ajudar você com várias funcionalidades do bot do Telegram.\n\n'
                                    + 'Você pode me usar para aprender a enviar mensagens, fotos, grupos de mídia e muito mais!\n\n'
                                    + 'Basta me dizer o que você gostaria de fazer!' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Привет..' + '\n\n'
                                    + 'Спасибо, что запустили меня! Вы в надежных руках. \n\n'
                                    + 'Все наши взаимодействия конфиденциальны и безопасны.\n\n'
                                    + '<blockquote expandable> Узнать больше обо мне: 🤖 \n'
                                    + 'Я здесь, чтобы помочь вам с различными функциями бота Telegram.\n\n'
                                    + 'Вы можете использовать меня, чтобы научиться отправлять сообщения, фотографии, медиагруппы и многое другое!\n\n'
                                    + 'Просто скажите, что вы хотите сделать!' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '嗨..' + '\n\n'
                                    + '感谢启动我！你处于安全的环境中。\n\n'
                                    + '我们所有的互动都是保密和安全的。\n\n'
                                    + '<blockquote expandable> 了解更多关于我: 🤖 \n'
                                    + '我在这里帮助你了解Telegram机器人的各种功能。\n\n'
                                    + '你可以使用我来学习发送消息、照片、多媒体组等更多内容！\n\n'
                                    + '只需告诉我你想做什么！' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'こんにちは..' + '\n\n'
                                    + '起動してくれてありがとう！あなたは安全な手にあります。\n\n'
                                    + '私たちのすべてのやり取りは機密で安全です。\n\n'
                                    + '<blockquote expandable> 私についてもっと知る: 🤖 \n'
                                    + '私はTelegramボットのさまざまな機能を紹介するシンプルなボットです。\n\n'
                                    + 'メッセージ、写真、メディアグループなどの送信方法を学ぶために私を使うことができます！\n\n'
                                    + 'やりたいことを教えてください！' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '안녕하세요..' + '\n\n'
                                    + '시작해 주셔서 감사합니다! 당신은 안전한 손에 있습니다.\n\n'
                                    + '우리의 모든 상호작용은 기밀이며 안전합니다.\n\n'
                                    + '<blockquote expandable> 나에 대해 더 알아보기: 🤖 \n'
                                    + '나는 텔레그램 봇의 다양한 기능을 보여주는 간단한 봇입니다.\n\n'
                                    + '메시지, 사진, 미디어 그룹 등을 보내는 방법을 배우기 위해 나를 사용할 수 있습니다!\n\n'
                                    + '하고 싶은 것을 말해 주세요!' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'היי..' + '\n\n'
                                    + 'תודה שהפעלת אותי! אתה בידיים בטוחות. \n\n'
                                    + 'כל האינטראקציות שלנו הן חסויות ובטוחות.\n\n'
                                    + '<blockquote expandable> קרא עוד עליי: 🤖 \n'
                                    + 'אני כאן כדי לעזור לך עם פונקציות שונות של בוט טלגרם.\n\n'
                                    + 'אתה יכול להשתמש בי כדי ללמוד על שליחת הודעות, תמונות, קבוצות מדיה ועוד!\n\n'
                                    + 'רק תן לי לדעת מה היית רוצה לעשות!' + '\n\n'
                                    + '</blockquote>',
                                parse_mode: 'HTML',
                            }
                        }]),
                    ],
                    ['#send_help_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> is a simple yet powerful Telegram bot built using Google Apps Script. It showcases various features of the Telegram Bot API, allowing you to send messages, photos, media groups, and interactive inline keyboards with ease.\n\n'
                                    + 'To get started, simply use the /start command. For assistance, use /help to access helpful resources and support options.\n\n'
                                    + 'Feel free to explore and customize the bot to suit your needs!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> es un bot de Telegram simple pero potente construido con Google Apps Script. Muestra varias características de la API de Bot de Telegram, lo que te permite enviar mensajes, fotos, grupos multimedia y teclados en línea interactivos con facilidad.\n\n'
                                    + 'Para comenzar, simplemente usa el comando /start. Para obtener ayuda, usa /help para acceder a recursos útiles y opciones de soporte.\n\n'
                                    + '¡Siéntete libre de explorar y personalizar el bot para adaptarlo a tus necesidades!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> est un bot Telegram simple mais puissant construit avec Google Apps Script. Il présente diverses fonctionnalités de l\'API Bot de Telegram, vous permettant d\'envoyer des messages, des photos, des groupes multimédias et des claviers en ligne interactifs en toute simplicité.\n\n'
                                    + 'Pour commencer, utilisez simplement la commande /start. Pour obtenir de l\'aide, utilisez /help pour accéder à des ressources utiles et des options de support.\n\n'
                                    + 'N\'hésitez pas à explorer et à personnaliser le bot selon vos besoins !\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> هو بوت تيليجرام بسيط ولكنه قوي تم بناؤه باستخدام Google Apps Script. إنه يعرض ميزات مختلفة من واجهة برمجة تطبيقات بوت تيليجرام، مما يتيح لك إرسال الرسائل، الصور، المجموعات الإعلامية، ولوحات المفاتيح المضمنة التفاعلية بسهولة.\n\n'
                                    + 'لبدء الاستخدام، ما عليك سوى استخدام الأمر /start. للحصول على المساعدة، استخدم /help للوصول إلى الموارد المفيدة وخيارات الدعم.\n\n'
                                    + 'لا تتردد في استكشاف البوت وتخصيصه ليناسب احتياجاتك!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> ist ein einfacher, aber leistungsstarker Telegram-Bot, der mit Google Apps Script erstellt wurde. Er zeigt verschiedene Funktionen der Telegram Bot API und ermöglicht es dir, Nachrichten, Fotos, Mediengruppen und interaktive Inline-Tastaturen mühelos zu senden.\n\n'
                                    + 'Um loszulegen, verwende einfach den Befehl /start. Für Unterstützung verwende /help, um auf hilfreiche Ressourcen und Support-Optionen zuzugreifen.\n\n'
                                    + 'Fühle dich frei, den Bot zu erkunden und anzupassen, um deinen Bedürfnissen gerecht zu werden!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> è un bot di Telegram semplice ma potente costruito con Google Apps Script. Mostra varie funzionalità dell\'API Bot di Telegram, permettendoti di inviare messaggi, foto, gruppi multimediali e tastiere inline interattive con facilità.\n\n'
                                    + 'Per iniziare, usa semplicemente il comando /start. Per assistenza, usa /help per accedere a risorse utili e opzioni di supporto.\n\n'
                                    + 'Sentiti libero di esplorare e personalizzare il bot in base alle tue esigenze!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> é um bot de Telegram simples, mas poderoso, construído com Google Apps Script. Ele exibe várias funcionalidades da API do Bot do Telegram, permitindo que você envie mensagens, fotos, grupos de mídia e teclados inline interativos com facilidade.\n\n'
                                    + 'Para começar, basta usar o comando /start. Para obter ajuda, use /help para acessar recursos úteis e opções de suporte.\n\n'
                                    + 'Sinta-se à vontade para explorar e personalizar o bot de acordo com suas necessidades!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> — это простой, но мощный бот Telegram, созданный с помощью Google Apps Script. Он демонстрирует различные функции API бота Telegram, позволяя вам легко отправлять сообщения, фотографии, медиагруппы и интерактивные встроенные клавиатуры.\n\n'
                                    + 'Чтобы начать, просто используйте команду /start. Для получения помощи используйте /help, чтобы получить доступ к полезным ресурсам и вариантам поддержки.\n\n'
                                    + 'Не стесняйтесь исследовать и настраивать бота в соответствии с вашими потребностями!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> 是一个简单而强大的 Telegram 机器人，使用 Google Apps Script 构建。它展示了 Telegram 机器人 API 的各种功能，使您能够轻松发送消息、照片、媒体组和交互式内联键盘。\n\n'
                                    + '要开始使用，只需使用 /start 命令。需要帮助时，请使用 /help 访问有用的资源和支持选项。\n\n'
                                    + '欢迎随时探索并根据您的需求自定义机器人！\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> は、Google Apps Script を使用して構築されたシンプルで強力な Telegram ボットです。Telegram ボット API のさまざまな機能を紹介し、メッセージ、写真、メディアグループ、インタラクティブなインラインキーボードを簡単に送信できるようにします。\n\n'
                                    + '始めるには、/start コマンドを使用してください。サポートが必要な場合は、/help を使用して役立つリソースとサポートオプションにアクセスしてください。\n\n'
                                    + 'ご自由にボットを探索し、ニーズに応じてカスタマイズしてください！\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b>는 Google Apps Script를 사용하여 구축된 간단하면서도 강력한 Telegram 봇입니다. Telegram 봇 API의 다양한 기능을 보여주며 메시지, 사진, 미디어 그룹 및 대화형 인라인 키보드를 쉽게 보낼 수 있습니다.\n\n'
                                    + '시작하려면 /start 명령을 사용하세요. 도움이 필요하면 /help를 사용하여 유용한 리소스와 지원 옵션에 액세스하세요.\n\n'
                                    + '자유롭게 봇을 탐색하고 필요에 따라 맞춤 설정하세요!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🤖 <b>Basic Telegram Bot Remastered</b> הוא בוט טלגרם פשוט אך עוצמתי שנבנה עם Google Apps Script. הוא מציג פונקציות שונות של API הבוט של טלגרם, ומאפשר לך לשלוח הודעות, תמונות, קבוצות מדיה ומקלדות אינליין אינטראקטיביות בקלות.\n\n'
                                    + 'כדי להתחיל, פשוט השתמש בפקודה /start. לקבלת עזרה, השתמש ב-/help כדי לגשת למשאבים מועילים ואפשרויות תמיכה.\n\n'
                                    + 'אתה מוזמן לחקור ולהתאים אישית את הבוט לפי הצרכים שלך!\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                    ],
                    ['#send_about_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'This is a sample Telegram bot built using Google Apps Script. It demonstrates various features of the Telegram Bot API including sending messages, photos, media groups, and inline keyboards.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Este es un bot de Telegram de ejemplo construido con Google Apps Script. Demuestra varias características de la API de Bot de Telegram, incluyendo el envío de mensajes, fotos, grupos multimedia y teclados en línea.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Ceci est un bot Telegram d\'exemple construit avec Google Apps Script. Il démontre diverses fonctionnalités de l\'API Bot de Telegram, y compris l\'envoi de messages, de photos, de groupes multimédias et de claviers en ligne.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'هذا بوت تيليجرام تجريبي تم بناؤه باستخدام Google Apps Script. إنه يوضح ميزات مختلفة من واجهة برمجة تطبيقات بوت تيليجرام بما في ذلك إرسال الرسائل، الصور، المجموعات الإعلامية، ولوحات المفاتيح المضمنة.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Dies ist ein Beispiel für einen Telegram-Bot, der mit Google Apps Script erstellt wurde. Er demonstriert verschiedene Funktionen der Telegram Bot API, einschließlich dem Senden von Nachrichten, Fotos, Mediengruppen und Inline-Tastaturen.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Questo è un bot di Telegram di esempio costruito con Google Apps Script. Dimostra varie funzionalità dell\'API Bot di Telegram, inclusi l\'invio di messaggi, foto, gruppi multimediali e tastiere inline.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Este é um bot de Telegram de exemplo construído com Google Apps Script. Ele demonstra várias funcionalidades da API do Bot do Telegram, incluindo o envio de mensagens, fotos, grupos de mídia e teclados inline.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Это пример бота Telegram, созданного с помощью Google Apps Script. Он демонстрирует различные функции API бота Telegram, включая отправку сообщений, фотографий, медиагрупп и встроенных клавиатур.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '这是一个使用 Google Apps Script 构建的 Telegram 机器人示例。它演示了 Telegram 机器人 API 的各种功能，包括发送消息、照片、媒体组和内联键盘。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'これは Google Apps Script を使用して構築された Telegram ボットの例です。メッセージ、写真、メディアグループ、インラインキーボードの送信など、Telegram ボット API のさまざまな機能を示しています。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이것은 Google Apps Script를 사용하여 구축된 Telegram 봇의 예입니다. 메시지, 사진, 미디어 그룹 및 인라인 키보드 전송을 포함하여 Telegram 봇 API의 다양한 기능을 보여줍니다.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'זהו דוגמה לבוט טלגרם שנבנה עם Google Apps Script. הוא מדגים פונקציות שונות של API הבוט של טלגרם, כולל שליחת הודעות, תמונות, קבוצות מדיה ומקלדות אינליין.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_unknown_action_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Sorry, we could not recognize this action. Please try again or use /help for assistance.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 ¡Vaya! Lo sentimos, pero no pudimos reconocer esa acción. Por favor, inténtalo de nuevo o utiliza /help para obtener ayuda.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Désolé, mais nous n\'avons pas pu reconnaître cette action. Veuillez réessayer ou utiliser /help pour obtenir de l\'aide.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 عذرًا، لم نتمكن من التعرف على هذا الإجراء. يرجى المحاولة مرة أخرى أو استخدام /help للحصول على المساعدة.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Hoppla! Wir konnten diese Aktion nicht erkennen. Bitte versuchen Sie es erneut oder verwenden Sie /help, um Hilfe zu erhalten.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Ci scusiamo, ma non siamo riusciti a riconoscere questa azione. Per favore riprova o usa /help per ricevere assistenza.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Desculpe, não conseguimos reconhecer esta ação. Por favor, tente novamente ou use /help para obter assistência.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Извините, мы не смогли распознать это действие. Пожалуйста, попробуйте еще раз или используйте /help для получения помощи.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 抱歉，我们无法识别此操作。请重试或使用 /help 获取帮助。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 申し訳ありませんが、このアクションを認識できませんでした。もう一度お試しいただくか、/help を使用してサポートを受けてください。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 죄송합니다. 이 작업을 인식할 수 없습니다. 다시 시도하거나 /help를 사용하여 도움을 받으십시오.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 סליחה, לא הצלחנו לזהות את הפעולה הזו. אנא נסה שוב או השתמש ב-/help לקבלת עזרה.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#append_main_menu_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ About", callback_data: "/about" }],
                                        [{ text: "❓ Help", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ Acerca de", callback_data: "/about" }],
                                        [{ text: "❓ Ayuda", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ À propos", callback_data: "/about" }],
                                        [{ text: "❓ Aide", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ حول", callback_data: "/about" }],
                                        [{ text: "❓ مساعدة", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ Über", callback_data: "/about" }],
                                        [{ text: "❓ Hilfe", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ Informazioni", callback_data: "/about" }],
                                        [{ text: "❓ Aiuto", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ Sobre", callback_data: "/about" }],
                                        [{ text: "❓ Ajuda", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ О боте", callback_data: "/about" }],
                                        [{ text: "❓ Помощь", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ 关于", callback_data: "/about" }],
                                        [{ text: "❓ 帮助", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ 約", callback_data: "/about" }],
                                        [{ text: "❓ ヘルプ", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ 정보", callback_data: "/about" }],
                                        [{ text: "❓ 도움말", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ℹ️ אודות", callback_data: "/about" }],
                                        [{ text: "❓ עזרה", callback_data: "/help" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#append_back_to_start_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Choose an option:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Back to Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Elige una opción:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Volver al inicio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Choisissez une option :',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Retour au début", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'اختر خيارًا:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ العودة إلى البداية", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Wählen Sie eine Option:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Zurück zum Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Scegli un\'opzione:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Torna all'inizio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Escolha uma opção:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Voltar ao Início", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Выберите опцию:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Назад к началу", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: '选择一个选项：',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ 返回开始", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'オプションを選択してください:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ 最初に戻る", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: '옵션을 선택하세요:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ 시작으로 돌아가기", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'בחר אפשרות:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ חזרה להתחלה", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#remove_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [[]]
                                }
                            }
                        }])
                    ],
                    ['#send_about_git_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'You can find the source code of this bot on GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/d1f736209b77088fa1ecda971d8d3b5c79080252/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Puedes encontrar el código fuente de este bot en GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Vous pouvez trouver le code source de ce bot sur GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'يمكنك العثور على الشفرة المصدرية لهذا البوت على GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Sie können den Quellcode dieses Bots auf GitHub finden:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Puoi trovare il codice sorgente di questo bot su GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Você pode encontrar o código-fonte deste bot no GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Вы можете найти исходный код этого бота на GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '您可以在 GitHub 上找到此机器人的源代码：\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'このボットのソースコードはGitHubで見つけることができます：\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이 봇의 소스 코드는 GitHub에서 찾을 수 있습니다:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'אתה יכול למצוא את קוד המקור של הבוט הזה ב-GitHub:\n\n'
                                    + '<a href="https://github.com/ilanlal/basic-telegram-bot-remastered/blob/0b896f3f8c4d47073fb49672bea81eff771b5ee4/src/config/EMD.js#L3872">https://github.com/ilanlal/basic-telegram-bot-remastered</a>',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_secure_private_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'This is a secure private message. 🔒\n\n'
                                    + 'Please ensure that you do not share this message with anyone else.',
                                parse_mode: 'HTML'
                            }
                        }])

                    ],
                    ['#answer_completed',
                        // default (en)
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Session completed successfully! ✅',
                                show_alert: false
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '¡Sesión completada con éxito! ✅',
                                show_alert: false
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Session terminée avec succès ! ✅',
                                show_alert: false
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'تم إكمال الجلسة بنجاح! ✅',
                                show_alert: false
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Sitzung erfolgreich abgeschlossen! ✅',
                                show_alert: false
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Sessione completata con successo! ✅',
                                show_alert: false
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Sessão concluída com sucesso! ✅',
                                show_alert: false
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Сессия успешно завершена! ✅',
                                show_alert: false
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '会话成功完成！ ✅',
                                show_alert: false
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'セッションが正常に完了しました！ ✅',
                                show_alert: false
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '세션이 성공적으로 완료되었습니다! ✅',
                                show_alert: false
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'הסשן הושלם בהצלחה! ✅',
                                show_alert: false
                            }
                        }])
                    ],
                    ['#answer_unknown_action',
                        // default (en)
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Oops! We could not recognize this action. Please try again or use /help for assistance.',
                                show_alert: false
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 ¡Vaya! No pudimos reconocer esta acción. Por favor, inténtalo de nuevo o usa /help para obtener ayuda.',
                                show_alert: false
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Oups ! Nous n\'avons pas pu reconnaître cette action. Veuillez réessayer ou utiliser /help pour obtenir de l\'aide.',
                                show_alert: false
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 عذرًا! لم نتمكن من التعرف على هذا الإجراء. يرجى المحاولة مرة أخرى أو استخدام /help للحصول على المساعدة.',
                                show_alert: false
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Hoppla! Wir konnten diese Aktion nicht erkennen. Bitte versuchen Sie es erneut oder verwenden Sie /help für Unterstützung.',
                                show_alert: false
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Ops! Non siamo riusciti a riconoscere questa azione. Per favore riprova o usa /help per assistenza.',
                                show_alert: false
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Ops! Não conseguimos reconhecer esta ação. Por favor, tente novamente ou use /help para obter assistência.',
                                show_alert: false
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Упс! Мы не смогли распознать это действие. Пожалуйста, попробуйте еще раз или используйте /help для получения помощи.',
                                show_alert: false
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 哎呀！我们无法识别此操作。请重试或使用 /help 获取帮助。',
                                show_alert: false
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 おっと！このアクションを認識できませんでした。もう一度お試しいただくか、/help を使用してヘルプを取得してください。',
                                show_alert: false
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 죄송합니다! 이 작업을 인식할 수 없습니다. 다시 시도하거나 /help를 사용하여 도움을 받으세요.',
                                show_alert: false
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 מצטערים! לא הצלחנו לזהות את הפעולה הזו. אנא נסה שוב או השתמש ב-/help לקבלת עזרה.',
                                show_alert: false
                            }
                        }])
                    ]
                ]
        }
    }
}

EMD.SurveyAutomation = {
    entityName: 'SurveyAutomation',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- 📋 SURVEY AUTOMATION SAMPLE DATA START ----',],
                    ['/surveys',
                        // default (en)
                        JSON.stringify([{ "next": "#append_survey_options_keyboard" }])
                    ],
                    ['#sendPoll01',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Which feature do you like the most in this bot?',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Text Messages with HTML formatting',
                                    'Photos with captions and inline keyboards',
                                    'Media Groups (albums) with multiple photos',
                                    'Interactive Inline Keyboards'
                                ]),
                                protect_content: true,
                                open_period: 7,
                                is_anonymous: false,
                                explanation: 'Your feedback helps us improve the bot and add more exciting features!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])],
                    ['#sendQuiz01',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'What is the <b>main</b> advantage of using Interactive Inline Keyboards in Telegram bots? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'They allow sending larger files',
                                    'They enable real-time user interaction',
                                    'They improve message delivery speed',
                                    'They support multimedia content'
                                ]),
                                protect_content: true,
                                open_period: 7,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Interactive Inline Keyboards allow users to engage directly with the bot, making the experience more dynamic and user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])],
                    ['#append_survey_options_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Take Poll", callback_data: "#sendPoll" }],
                                        [{ text: "Take Quiz", callback_data: "#sendQuiz" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#send_welcome_to_survey_center',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Welcome to the Survey Center! \n\n'
                                    + 'Here you can participate in various polls and quizzes to share your opinions and test your knowledge.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ]
                ]
        }
    }
}

EMD.StoreAutomation = {
    entityName: 'StoreAutomation',
    displayName: 'Store Automation',
    pluralDisplayName: 'Store Automations',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- ✨ STORE AUTOMATION SAMPLE DATA START ----']
                    ['/store',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendPhoto',
                        payload: {
                            caption: 'Welcome to the Store! Here you can find various products and services.',
                            photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Category A", callback_data: "#categoryA" }],
                                    [{ text: "Category B", callback_data: "#categoryB" }],
                                    [{ text: "Category C", callback_data: "#categoryC" }],
                                    [{ text: "Category D", callback_data: "#categoryD" }],
                                    [{ text: "Category E", callback_data: "#categoryE" }],
                                    [{ text: "Home", callback_data: "/home" }]
                                ]
                            }
                        }
                    }])],
                    ['#categoryA',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category A! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #1',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_123', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 550 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #2',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n'
                                        + 'Available in multiple colors and sizes.',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 980 } // Amount in smallest units (e.g., cents)

                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #3',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n'
                                        + 'Shipping included.',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryB',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category B! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #10',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 450 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #20',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 45 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #30',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 300 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryC',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category C! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 100',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1250 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 122',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 5580 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 33',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryD',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category D! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #11',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 123 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #12',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 550 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #13',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])],
                    ['#categoryE',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Welcome to Category E! Here you can find a variety of products and services tailored to your needs.',
                                parse_mode: 'HTML'
                            }
                        }, {
                            // send paid media as sample after invoice
                            method: 'sendPaidMedia',
                            payload: {
                                protect_content: true,
                                star_count: 1000,
                                media: [
                                    {
                                        type: 'photo',
                                        media: 'https://www.gstatic.com/webp/gallery/1.jpg',
                                        caption: 'Thank you for your purchase! Here is your paid media content.'
                                    }
                                ]
                            }
                        },
                        {
                            // send paid media as sample after invoice
                            method: 'sendPaidMedia',
                            payload: {
                                protect_content: true,
                                star_count: 2400,
                                media: [
                                    {
                                        type: 'photo',
                                        media: 'https://www.gstatic.com/webp/gallery/3.jpg',
                                        caption: 'Thank you for your purchase! Here is your paid media content.'
                                    }
                                ]
                            }
                        },
                        {
                            // send paid media as sample after invoice
                            method: 'sendPaidMedia',
                            payload: {
                                protect_content: true,
                                star_count: 1400,
                                media: [
                                    {
                                        type: 'photo',
                                        media: 'https://www.gstatic.com/webp/gallery/2.jpg',
                                        caption: 'Thank you for your purchase! Here is your paid media content.'
                                    }
                                ]
                            }
                        }, { "next": "/store" }])],
                    ['/payments',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Sample Product',
                                    description: 'This is a sample product for demonstration purposes.',
                                    payload: 'sample_product_payload',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 100 } // amount in the smallest units of the currency (e.g., cents)
                                    ])
                                }
                            }, {
                                // send paid media as sample after invoice
                                method: 'sendPaidMedia',
                                payload: {
                                    protect_content: true,
                                    star_count: 100,
                                    media: [
                                        {
                                            type: 'photo',
                                            media: 'https://www.gstatic.com/webp/gallery/1.jpg',
                                            caption: 'Thank you for your purchase! Here is your paid media content.'
                                        }
                                    ]
                                }
                            }])
                    ]
                ]
        }
    }
}

EMD.About = {
    entityName: 'About',
    card: (data = {}) => {
        return {
            name: 'about_Card',
            header: {
                title: 'About This Addon',
                subTitle: 'Learn more about this Addon.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'About Image'
            },
            sections: [
                {
                    // header: 'About This Addon',
                    widgets: [
                        {
                            id: 'about_text_paragraph',
                            TextParagraph: {
                                text: 'This addon is designed to help you manage your tasks efficiently.'
                            }
                        },
                        { // Version Info widget
                            id: 'version_info_widget',
                            TextParagraph: {
                                text: `Version: ${data.packageInfo?.version || 'N/A'} (Build: ${data.packageInfo?.build || 'N/A'})`
                            }
                        }
                    ]
                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `Data: ${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.Account = {
    entityName: 'Account',
    card: (data = {}) => {
        return {
            name: 'account_Card',
            header: {
                title: 'Account Management',
                subTitle: 'Manage your account settings and preferences.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Account Image'
            },
            sections: [
                {
                    // header: 'Account Management',
                    widgets: [
                        {
                            id: 'account_text_paragraph',
                            TextParagraph: {
                                text: 'Manage your account settings and preferences here.'
                            }
                        },
                        { // user Info widget
                            id: 'user_info_widget',
                            TextParagraph: {
                                text: `User is ${data.userInfo?.isPremium ? 'a Premium' : 'a Free'} user.`
                            }
                        }
                    ]
                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `Data: ${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.Logger = {
    entityName: 'eventLog',
    sheet: (data = {}) => {
        return {
            name: '📜 Event Log',
            columns: ['Created On', 'DC', 'Action', 'chat_id', 'content', 'event'],
            sample_data: []
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}