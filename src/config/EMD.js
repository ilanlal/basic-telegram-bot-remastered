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

EMD.Bot = {
    entityName: 'Bot',
    displayName: 'Bot',
    pluralDisplayName: 'Bots',
    sheetMeta: {
        name: 'Bots',
        columns: ['ID', 'Name', 'Token', 'CreatedAt', 'UpdatedAt']
    },
    cardMeta: {
        name: 'botIndexCard',
        header: {
            title: 'Bots',
            subTitle: 'List of all bots',
            imageUrl: 'https://example.com/bot_image.png',
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
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}