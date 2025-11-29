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
                            {
                                id: 'save_log_events_button',
                                TextButton: {
                                    text: '💾 Save Log Events',
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
                            { // '/home' command
                                command: '/home',
                                description: 'Go to the main menu'

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
                        ]),
                    // Spanish
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Iniciar el bot'
                            },
                            {   // '/home' command
                                command: '/home',
                                description: 'Ir al menú principal'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Obtener ayuda sobre el uso del bot o informar un problema'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Acerca del bot'
                            },
                            { // lang command
                                command: '/lang',
                                description: 'envía "/lang es" para establecer el español como tu idioma, o "/lang list" para obtener una lista de idiomas disponibles'
                            },
                            { // '/admin' command
                                command: '/admin',
                                description: 'Comando de administrador para la gestión del bot'
                            }
                        ]),
                    // French
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Démarrer le bot'
                            },
                            {   // '/home' command
                                command: '/home',
                                description: 'Aller au menu principal'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Obtenir de l\'aide sur l\'utilisation du bot ou signaler un problème'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'À propos du bot'
                            },
                            { // lang command
                                command: '/lang',
                                description: 'envoyer "/lang fr" pour définir le français comme votre langue, ou "/lang list" pour obtenir une liste des langues disponibles'
                            },
                            { // '/admin' command
                                command: '/admin',
                                description: 'Commande d\'administration pour la gestion du bot'
                            }
                        ]),
                    // Arabic
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'بدء تشغيل البوت'
                            },
                            {   // '/home' command
                                command: '/home',
                                description: 'الذهاب إلى القائمة الرئيسية'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'الحصول على مساعدة حول استخدام البوت أو الإبلاغ عن مشكلة'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'معلومات عن البوت'
                            },
                            { // lang command
                                command: '/lang',
                                description: 'أرسل "/lang ar" لتعيين العربية كلغتك، أو "/lang list" للحصول على قائمة باللغات المتاحة'
                            },
                            { // '/admin' command
                                command: '/admin',
                                description: 'أمر الإدارة لإدارة البوت'
                            }
                        ]),
                    // German
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Bot starten'
                            },
                            {   // '/home' command
                                command: '/home',
                                description: 'Gehe zum Hauptmenü'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Hilfe zur Verwendung des Bots oder zur Meldung eines Problems erhalten'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Über den Bot'
                            },
                            { // lang command
                                command: '/lang',
                                description: 'Senden Sie "/lang de", um Deutsch als Ihre Sprache festzulegen, oder "/lang list", um eine Liste der verfügbaren Sprachen zu erhalten'
                            },
                            { // '/admin' command
                                command: '/admin',
                                description: 'Admin-Befehl zur Verwaltung des Bots'
                            }
                        ]),
                    // Italian
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Avvia il bot'
                            },
                            {   // '/home' command
                                command: '/home',
                                description: 'Vai al menu principale'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Ottieni aiuto sull\'uso del bot o segnala un problema'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Informazioni sul bot'
                            },
                            { // lang command
                                command: '/lang',
                                description: 'Invia "/lang it" per impostare l\'italiano come lingua, oppure "/lang list" per ottenere un elenco delle lingue disponibili'
                            },
                            { // '/admin' command
                                command: '/admin',
                                description: 'Comando di amministrazione per gestire il bot'
                            }
                        ]),
                    // Portuguese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'Iniciar o bot'
                        },
                        {   // '/home' command
                            command: '/home',
                            description: 'Ir para o menu principal'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'Obter ajuda sobre o uso do bot ou relatar um problema'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'Informações sobre o bot'
                        },
                        { // lang command
                            command: '/lang',
                            description: 'Envie "/lang pt" para definir o português como seu idioma, ou "/lang list" para obter uma lista de idiomas disponíveis'
                        },
                        { // '/admin' command
                            command: '/admin',
                            description: 'Comando de administração para gerenciar o bot'
                        }
                    ]),
                    // Russian
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'Запустить бота'
                        },
                        {   // '/home' command
                            command: '/home',
                            description: 'Перейти в главное меню'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'Получить помощь по использованию бота или сообщить о проблеме'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'Информация о боте'
                        },
                        { // lang command
                            command: '/lang',
                            description: 'Отправьте "/lang ru", чтобы установить русский в качестве вашего языка, или "/lang list", чтобы получить список доступных языков'
                        },
                        { // '/admin' command
                            command: '/admin',
                            description: 'Команда администратора для управления ботом'
                        }
                    ]),
                    // Chinese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: '启动机器人'
                        },
                        {   // '/home' command
                            command: '/home',
                            description: '进入主菜单'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: '获取有关使用机器人的帮助或报告问题'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: '有关机器人的信息'
                        },
                        { // lang command
                            command: '/lang',
                            description: '发送"/lang zh"将中文设置为您的语言，或"/lang list"以获取可用语言的列表'
                        },
                        { // '/admin' command
                            command: '/admin',
                            description: '用于管理机器人的管理员命令'
                        }
                    ]),
                    // Japanese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'ボットを開始します'
                        },
                        {   // '/home' command
                            command: '/home',
                            description: 'メインメニューに移動します'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'ボットの使用に関するヘルプを取得するか、問題を報告します'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'ボットに関する情報'
                        },
                        { // lang command
                            command: '/lang',
                            description: '"/lang ja"を送信して日本語をあなたの言語として設定するか、"/lang list"を送信して利用可能な言語のリストを取得します'
                        },
                        { // '/admin' command
                            command: '/admin',
                            description: 'ボットを管理するための管理者コマンド'
                        }
                    ]),
                    // Korean
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: '봇을 시작합니다'
                        },
                        {   // '/home' command
                            command: '/home',
                            description: '메인 메뉴로 이동합니다'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: '봇 사용에 대한 도움을 받거나 문제를 보고합니다'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: '봇에 대한 정보'
                        },
                        { // lang command
                            command: '/lang',
                            description: '"/lang ko"를 보내어 한국어를 귀하의 언어로 설정하거나 "/lang list"를 보내어 사용 가능한 언어 목록을 가져옵니다'
                        },
                        { // '/admin' command
                            command: '/admin',
                            description: '봇을 관리하기 위한 관리자 명령'
                        }
                    ]),
                    // Hebrew
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'הפעל את הבוט'
                        },
                        {   // '/home' command
                            command: '/home',
                            description: 'עבור לתפריט הראשי'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'קבל עזרה בשימוש בבוט או דווח על בעיות'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'מידע על הבוט'
                        },
                        { // lang command
                            command: '/lang',
                            description: 'שלח "/lang he" כדי להגדיר את העברית כשפה שלך, או "/lang list" כדי לקבל רשימה של שפות זמינות'
                        },
                        { // '/admin' command
                            command: '/admin',
                            description: 'פקודת מנהל עבור ניהול הבוט'
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
                            {
                                id: 'create_customer_widget',
                                DecoratedText: {
                                    topLabel: '🛍️',
                                    text: 'CRM',
                                    bottomLabel: 'Users, Accounts, Contacts management',
                                    wrapText: false,
                                    textButton: {
                                        text: 'Activate Sheet',
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
            columns: ['Created on', 'chat_id', 'username', 'First Name', 'Last Name', 'language_code', 'is_bot', 'Data']
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
                [   // Automation Management Section
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
            name: '⚡ Automations',
            columns: ['action', 'en', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
            sample_data:
                [
                    ['_preload_messages_',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Loading your request... Please wait a moment.',
                                parse_mode: 'HTML'
                            }
                        }]),
                    ],
                    ['_under_construction_',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 This feature is under construction. Please check back later for updates!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Esta función está en construcción. ¡Por favor, vuelve más tarde para obtener actualizaciones!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Cette fonctionnalité est en cours de développement. Veuillez revenir plus tard pour des mises à jour !',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 هذه الميزة قيد الإنشاء. يرجى التحقق مرة أخرى لاحقًا للحصول على التحديثات!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Diese Funktion ist im Aufbau. Bitte schauen Sie später wieder vorbei, um Updates zu erhalten!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Questa funzionalità è in fase di sviluppo. Si prega di tornare più tardi per ulteriori aggiornamenti!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Esta função está em construção. Por favor, volte mais tarde para obter atualizações!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Эта функция находится в разработке. Пожалуйста, вернитесь позже за обновлениями!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 此功能正在开发中。请稍后再回来查看更新！',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 この機能は開発中です。後でもう一度確認してください！',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 이 기능은 현재 개발 중입니다. 나중에 다시 확인하여 업데이트를 받으세요!',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 זו פונקציה בבנייה. אנא חזור מאוחר יותר לעדכונים!',
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
                                        // Two buttons in one row
                                        [
                                            { text: "🌐 Web App", web_app: { url: "https://example.com" } },
                                            { text: "🌟 Mini App", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "🛍️ Store", web_app: { url: "https://example.com/store" } },
                                            { text: "🐣 H.R Solutions", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "🔒 Secured Marketplace", callback_data: "privateSecure" },
                                            { text: "💼 Agency Solutions", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "🎯 Targeted Services", callback_data: "targetedServices" },
                                            { text: "📦 Logistics", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "🚀 Quick Actions", callback_data: "quickActions" },
                                            { text: "🚨 Emergency Services", callback_data: "emergencyServices" },
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
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Bienvenido.\n\n'
                                    + 'Soy un bot de Telegram simple que muestra varias características y funcionalidades.\n\n'
                                    + '¡No dudes en interactuar conmigo y descubrir lo que puedo hacer!\n\n'
                                    + '¡Espero que disfrutes tu experiencia! 😊\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // Two buttons in one row
                                        [
                                            { text: "Aplicación Web", web_app: { url: "https://example.com" } },
                                            { text: "Mini Aplicación", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "Tienda", web_app: { url: "https://example.com/store" } },
                                            { text: "Soluciones H.R", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "Mercado Seguro", callback_data: "privateSecure" },
                                            { text: "Soluciones para Agencias", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "Servicios Dirigidos", callback_data: "targetedServices" },
                                            { text: "Logística", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "Acciones Rápidas", callback_data: "quickActions" },
                                            { text: "Servicios de Emergencia", callback_data: "emergencyServices" },
                                        ],
                                        [
                                            { text: 'Ayuda', callback_data: "/help" },
                                            { text: 'Acerca de', callback_data: "/about" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Bienvenue.\n\n'
                                    + 'Je suis un simple bot Telegram qui présente diverses fonctionnalités.\n\n'
                                    + 'N\'hésitez pas à interagir avec moi et à découvrir ce que je peux faire !\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                // fr inline keyboard
                                reply_markup: {
                                    inline_keyboard: [
                                        [ // Two buttons in one row
                                            { text: "Application Web", web_app: { url: "https://example.com" } },
                                            { text: "Mini Application", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "Boutique", web_app: { url: "https://example.com/store" } },
                                            { text: "Solutions RH", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "Marché Sécurisé", callback_data: "privateSecure" },
                                            { text: "Solutions Agence", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "Services Dirigés", callback_data: "targetedServices" },
                                            { text: "Logistique", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "Actions Rapides", callback_data: "quickActions" },
                                            { text: "Services d'Urgence", callback_data: "emergencyServices" }
                                        ],
                                        [
                                            { text: 'Aide', callback_data: "/help" },
                                            { text: 'À Propos', callback_data: "/about" }
                                        ]
                                    ]

                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'مرحبًا بك.\n\n'
                                    + 'أنا بوت تيليجرام بسيط يعرض ميزات ووظائف مختلفة.\n\n'
                                    + 'لا تتردد في التفاعل معي واكتشاف ما يمكنني القيام به!\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // صفين من الأزرار
                                        [
                                            { text: "تطبيق الويب", web_app: { url: "https://example.com" } },
                                            { text: "تطبيق مصغر", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "متجر", web_app: { url: "https://example.com/store" } },
                                            { text: "حلول الموارد البشرية", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "سوق آمن", callback_data: "privateSecure" },
                                            { text: "حلول الوكالة", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "خدمات موجهة", callback_data: "targetedServices" },
                                            { text: "لوجستيات", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "إجراءات سريعة", callback_data: "quickActions" },
                                            { text: "خدمات الطوارئ", callback_data: "emergencyServices" }
                                        ],
                                        [
                                            { text: 'مساعدة', callback_data: "/help" },
                                            { text: 'حول', callback_data: "/about" }
                                        ]
                                    ]

                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Willkommen.\n\n'
                                    + 'Ich bin ein einfacher Telegram-Bot, der verschiedene Funktionen und Features präsentiert.\n\n'
                                    + 'Zögere nicht, mit mir zu interagieren und herauszufinden, was ich tun kann!\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // Zwei Tasten in einer Reihe
                                        [
                                            { text: "Web-App", web_app: { url: "https://example.com" } },
                                            { text: "Mini-App", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "Shop", web_app: { url: "https://example.com/store" } },
                                            { text: "HR-Lösungen", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "Sicherer Markt", callback_data: "privateSecure" },
                                            { text: "Agenturlösungen", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "Gezielte Dienstleistungen", callback_data: "targetedServices" },
                                            { text: "Logistik", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "Schnellaktionen", callback_data: "quickActions" },
                                            { text: "Notdienste", callback_data: "emergencyServices" }
                                        ],
                                        [
                                            { text: 'Hilfe', callback_data: "/help" },
                                            { text: 'Über', callback_data: "/about" }
                                        ]
                                    ]

                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Benvenuto.\n\n'
                                    + 'Sono un semplice bot di Telegram che presenta diverse funzioni e caratteristiche.\n\n'
                                    + 'Non esitare a interagire con me e scoprire cosa posso fare!\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // Due pulsanti su una riga
                                        [
                                            { text: "Web-App", web_app: { url: "https://example.com" } },
                                            { text: "Mini-App", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "Negozio", web_app: { url: "https://example.com/store" } },
                                            { text: "Soluzioni HR", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "Mercato Sicuro", callback_data: "privateSecure" },
                                            { text: "Soluzioni per Agenzie", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "Servizi Mirati", callback_data: "targetedServices" },
                                            { text: "Logistica", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "Azioni Rapide", callback_data: "quickActions" },
                                            { text: "Servizi di Emergenza", callback_data: "emergencyServices" }
                                        ],
                                        [
                                            { text: 'Aiuto', callback_data: "/help" },
                                            { text: 'Informazioni', callback_data: "/about" }
                                        ]
                                    ]

                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Bem-vindo.\n\n'
                                    + 'Sou um simples bot do Telegram que apresenta várias funções e recursos.\n\n'
                                    + 'Sinta-se à vontade para interagir comigo e descobrir o que posso fazer!\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // Dois botões em uma linha
                                        [
                                            { text: "Web-App", web_app: { url: "https://example.com" } },
                                            { text: "Mini-App", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "Loja", web_app: { url: "https://example.com/store" } },
                                            { text: "Soluções de RH", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "Mercado Seguro", callback_data: "privateSecure" },
                                            { text: "Soluções para Agências", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "Serviços Direcionados", callback_data: "targetedServices" },
                                            { text: "Logística", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "Ações Rápidas", callback_data: "quickActions" },
                                            { text: "Serviços de Emergência", callback_data: "emergencyServices" }
                                        ],
                                        [
                                            { text: 'Ajuda', callback_data: "/help" },
                                            { text: 'Informações', callback_data: "/about" }
                                        ]
                                    ]

                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Добро пожаловать.\n\n'
                                    + 'Я простой бот Telegram, который предлагает различные функции и возможности.\n\n'
                                    + 'Не стесняйтесь взаимодействовать со мной и открывать для себя, что я могу сделать!\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // Две кнопки в строке
                                        [
                                            { text: "Веб-приложение", web_app: { url: "https://example.com" } },
                                            { text: "Мини-приложение", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "Магазин", web_app: { url: "https://example.com/store" } },
                                            { text: "HR-решения", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "Безопасный рынок", callback_data: "privateSecure" },
                                            { text: "Решения для агентств", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "Целевые услуги", callback_data: "targetedServices" },
                                            { text: "Логистика", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "Быстрые действия", callback_data: "quickActions" },
                                            { text: "Экстренные службы", callback_data: "emergencyServices" }
                                        ],
                                        [
                                            { text: 'Помощь', callback_data: "/help" },
                                            { text: 'Информация', callback_data: "/about" }
                                        ]
                                    ]

                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '欢迎。\n\n'
                                    + '我是一个简单的Telegram机器人，提供各种功能和服务。\n\n'
                                    + '请随时与我互动，探索我能做些什么！\n\n',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // 一行两个按钮
                                        [
                                            { text: "Web应用", web_app: { url: "https://example.com" } },
                                            { text: "迷你应用", web_app: { url: "https://example.com/mini" } }
                                        ],
                                        [
                                            { text: "商店", web_app: { url: "https://example.com/store" } },
                                            { text: "人力资源解决方案", callback_data: "hrSolutions" }
                                        ],
                                        [
                                            { text: "私人安全市场", callback_data: "privateSecure" },
                                            { text: "代理机构解决方案", callback_data: "agencySolutions" }
                                        ],
                                        [
                                            { text: "目标服务", callback_data: "targetedServices" },
                                            { text: "物流", callback_data: "logistics" }
                                        ],
                                        [
                                            { text: "快速行动", callback_data: "quickActions" },
                                            { text: "紧急服务", callback_data: "emergencyServices" }
                                        ],
                                        [
                                            { text: '帮助', callback_data: "/help" },
                                            { text: '信息', callback_data: "/about" }
                                        ]
                                    ]

                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'ようこそ。\n\n'
                                    + '私はさまざまな機能と機能を備えたシンプルなTelegramボットです。\n\n'
                                    + '気軽に私と対話し、私ができることを探ってください！\n\n'
                                    + '楽しんでいただけることを願っています！😊\n\n'
                                    + '<blockquote expandable>始めるには: \n'
                                    + '始めるには、次のコマンドを使用できます:\n'
                                    + '1. /help - ボットの使用方法についてのヘルプを取得します。\n'
                                    + '2. /about - このボットについての詳細情報を取得します。\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>機能: \n'
                                    + 'このボットは次のことを手伝うことができます:\n'
                                    + '1. メッセージの送信\n'
                                    + '2. 画像やメディアの共有\n'
                                    + '3. グループやチャンネルの作成\n'
                                    + '4. アカウント設定の管理\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>サポート: \n'
                                    + 'ヘルプが必要な場合は、お気軽にお問い合わせください！\n'
                                    + '/helpコマンドを使用してガイダンスを取得するか、問題を報告してください。\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>フィードバック: \n'
                                    + 'このボットを改善するために、あなたのフィードバックを大切にしています。\n'
                                    + 'あなたの考えを教えてください！\n\n'
                                    + '</blockquote>',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // 一行に2つのボタン
                                        [
                                            { text: "Getting Started", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } },
                                            { text: "Report an Issue", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered/issues" } }
                                        ],
                                        [
                                            { text: "Home", callback_data: "home" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>시작하기</b>\n\n' +
                                    '이 봇을 사용하여 다양한 작업을 수행할 수 있습니다. 시작하려면 다음 명령어를 사용하세요:\n\n' +
                                    '1. /help - 봇 사용에 대한 도움말을 가져옵니다.\n' +
                                    '2. /about - 이 봇에 대한 자세한 정보를 가져옵니다.\n\n' +
                                    '</blockquote>'
                                    + '<blockquote expandable>기능: \n'
                                    + '이 봇은 다음과 같은 작업을 도와줄 수 있습니다:\n'
                                    + '1. 메시지 전송\n'
                                    + '2. 이미지 및 미디어 공유\n'
                                    + '3. 그룹 및 채널 생성\n'
                                    + '4. 계정 설정 관리\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>지원: \n'
                                    + '도움이 필요하시면 언제든지 문의해 주세요!\n'
                                    + '/help 명령어를 사용하여 안내를 받거나 문제를 보고해 주세요.\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>피드백: \n'
                                    + '이 봇을 개선하기 위해 귀하의 피드백을 소중히 여기고 있습니다.\n'
                                    + '귀하의 생각을 들려주세요!\n\n'
                                    + '</blockquote>',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // 한 줄에 2개의 버튼
                                        [
                                            { text: "시작하기", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } },
                                            { text: "문제 보고", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered/issues" } }
                                        ],
                                        [
                                            { text: "홈", callback_data: "home" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: '<b>התחלה</b>\n\n' +
                                    'באמצעות בוט זה, תוכל לבצע מגוון משימות. כדי להתחיל, השתמש בפקודות הבאות:\n\n' +
                                    '1. /help - קבל עזרה בשימוש בבוט.\n' +
                                    '2. /about - קבל מידע נוסף על הבוט הזה.\n\n' +
                                    '</blockquote>'
                                    + '<blockquote expandable>תכונות: \n'
                                    + 'בוט זה יכול לעזור במשימות הבאות:\n'
                                    + '1. שליחת הודעות\n'
                                    + '2. שיתוף תמונות ומדיה\n'
                                    + '3. יצירת קבוצות וערוצים\n'
                                    + '4. ניהול הגדרות חשבון\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>תמיכה: \n'
                                    + 'אם אתה זקוק לעזרה, אל תהסס לפנות אלינו!\n'
                                    + 'השתמש בפקודת /help כדי לקבל הנחיות או לדווח על בעיות.\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>משוב: \n'
                                    + 'אנו מעריכים את המשוב שלך כדי לשפר את הבוט הזה.\n'
                                    + 'שתף אותנו במחשבותיך!\n\n'
                                    + '</blockquote>',
                                photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        // 한 줄에 2개의 버튼
                                        [
                                            { text: "התחלה", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered#readme" } },
                                            { text: "דיווח על בעיה", web_app: { url: "https://github.com/ilanlal/basic-telegram-bot-remastered/issues" } }
                                        ],
                                        [
                                            { text: "בית", callback_data: "home" }
                                        ]
                                    ]
                                }
                            }
                        }])
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
                                        [{ text: "Home", callback_data: "home" }]
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
                                        [{ text: "Inicio", callback_data: "home" }]
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
                                        [{ text: "Accueil", callback_data: "home" }]
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
                                        [{ text: "الصفحة الرئيسية", callback_data: "home" }]
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
                                        [{ text: "Startseite", callback_data: "home" }]
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
                                        [{ text: "Home", callback_data: "home" }]
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
                                        [{ text: "Início", callback_data: "home" }]
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
                                        [{ text: "Главная", callback_data: "home" }]
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
                                        [{ text: "首页", callback_data: "home" }]
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
                                        [{ text: "ホーム", callback_data: "home" }]
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
                                        [{ text: "홈", callback_data: "home" }]
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
                                        [{ text: "בית", callback_data: "home" }]
                                    ]
                                }
                            }
                        }])],

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
                                        [{ text: "Home", callback_data: "home" }]
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
                    ['/sendPoll',
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
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])],
                    ['/sendQuiz',
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
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])],
                    ['coreFeatures',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Here is a brief overview of the bot\'s capabilities:<br><br>'
                                    + '1. <b>Text Messages:</b> Send plain text messages with support for HTML formatting.<br>'
                                    + '2. <b>Photos:</b> Share images with captions and inline keyboards for user interaction.<br>'
                                    + '3. <b>Media Groups:</b> Send multiple photos in a single message as an album.<br>'
                                    + '4. <b>Inline Keyboards:</b> Create interactive buttons within messages for enhanced user engagement.<br><br>'
                                    + 'Feel free to explore these features by interacting with the bot!\n\n'
                                    + '<blockquote>Blockquote \n'
                                    + 'This is a blockquote using the Telegram Bot API. Blockquotes are useful for highlighting important information or quotes within a message.\n\n'
                                    + '</blockquote>'
                                    + '<blockquote expandable>Expandable blockquote \n'
                                    + 'This is an example of expandable text using blockquotes. Click to expand and see more details about the bot\'s features and functionalities.\n\n'
                                    + '</blockquote>'
                                    + '<b>Bold Text</b>\n'
                                    + '<i>Italic Text</i>\n'
                                    + '<u>Underlined Text</u>\n',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Home", callback_data: "/home" }],
                                        // Two buttons in one row
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
                                            { text: "Home", callback_data: "home" }
                                        ]
                                    ]
                                }
                            }
                        }
                        ])],
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
                                            { text: "📊 Surveys", callback_data: "surveys" },
                                            { text: "📰 News", callback_data: "news" }], [
                                        ],
                                        [
                                            { text: "🤖 Developer", callback_data: "apiFeatures" }
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
                                        [{ text: "🚖 Call a Taxi", callback_data: "callTaxi" }],
                                        [{ text: "🔍 VPN Search", callback_data: "search" }],
                                        [{ text: "📦 Track Order", callback_data: "trackOrder" }]
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
                                            { text: "🔒 Virtual Private Network (VPN)", callback_data: "safetyChecklist" },
                                            { text: "🛡️ Threat Assessment", callback_data: "threatAssessment" },
                                            { text: "🛠️ Maintenance Request", callback_data: "maintenanceRequest" }
                                        ],
                                        // Two buttons in one row
                                        [
                                            { text: "📱 Phone Number Authentication", callback_data: "phoneAuth" },
                                            { text: "🦶 Fingerprint Authentication", callback_data: "fingerprintAuth" }
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
                                        [{ text: "BACK", callback_data: "start" }]
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
                                        [{ text: "BACK", callback_data: "start" }]
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

EMD.Test = {
    entityName: 'testEntity',
    card: (data = {}) => {
        return {
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
                                    wrapText: false,
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
        };
    },
    sheet: (data = {}) => {
        return {
            name: '🐢 Test Sheet',
            columns: ['action', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
            sample_data: [
                ['start', 'Start', 'Comenzar', 'Commencer', 'ابدأ', 'Starten', 'Inizia', 'Começar', 'Начать', '开始', 'スタート', '시작', 'התחל'],
                ['help', 'Help', 'Ayuda', 'Aide', 'مساعدة', 'Hilfe', 'Aiuto', 'Ajuda', 'Помощь', '帮助', 'ヘルプ', '도움말', 'עזרה'],
            ]
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}