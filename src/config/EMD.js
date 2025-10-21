// Entity Metadata Configuration Class
class EMD {
    constructor() {
    }
}

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
            subtitle: 'List of all bots',
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