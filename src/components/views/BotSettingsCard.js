/* eslint-disable no-undef */
class BotSettingsCard {
    static get LOCALIZED_RESOURCES() {
        return {
            "module": "botSettingsCard",
            "version": "1.0.0",
            "en": {
                "title": "Bot Settings",
                "description": "Configure your bot settings below:",
                "actions": [
                    { "id": "Save", "label": "Save", "handler": "BotSetupComponent.AppHandler.onClick(event)" },
                    { "id": "Cancel", "label": "Cancel", "handler": "BotSetupComponent.AppHandler.onClick(event)" }
                ],
                "inputFields": [
                    {
                        "id": "BOT_NAME",
                        "type": "text",
                        "required": true,
                        "label": "Bot Name",
                        "placeholder": "Enter bot name here",
                        "defaultValue": "My Bot"
                    },
                    {
                        "id": "BOT_SHORT_DESCRIPTION",
                        "type": "text",
                        "required": true,
                        "label": "Bot Short Description",
                        "placeholder": "Enter bot short description here",
                        "defaultValue": "A short description of my bot"
                    },
                    {
                        "id": "BOT_DESCRIPTION",
                        "type": "text",
                        "required": true,
                        "label": "Bot Description",
                        "placeholder": "Enter bot description here",
                        "defaultValue": "A detailed description of my bot"
                    },
                    {
                        "id": "BOT_COMMANDS",
                        "type": "text",
                        "required": true,
                        "label": "Bot Commands",
                        "placeholder": "Enter bot commands here",
                        "defaultValue": "/start, /help"
                    }
                ],
            }
        };
    }

    withLangCode(langCode = 'en') {
        this._data.localizedResources = BotSettingsCard.LOCALIZED_RESOURCES[langCode] || {};
        return this;
    }

    withTelegramBotInfo(botInfo) {
        this._data.botInfo = botInfo;
        return this;
    }

    constructor(langCode = 'en') {
        this._data = {
            botInfo: null,
            localizedResources: null
        };
        this.withLangCode(langCode);
    }

    newCardBuilder() {
        return CardService.newCardBuilder()
            .setName(this._data.localizedResources.module || "botSettingsCard")
            .setHeader(this._header())
            .addSection(this._body())
            .setFixedFooter(this._footer());
    }

    _header() {
        return CardService.newCardHeader()
            .setTitle(this._data.localizedResources.title || "Bot Settings")
            .setSubtitle(this._data.localizedResources.description || "Configure your bot settings below:");
    }

    _body() {
        const section = CardService.newCardSection()
            .setHeader(this._data.localizedResources.description || "Configure your bot settings below:");
        if (this._data.botInfo) {
            section.addWidget(CardService.newTextParagraph()
                .setText(`${this._data.localizedResources.botName || "Bot Name"}: ${JSON.stringify(this._data.botInfo)}`));
        }
        return section;
    }

    _footer() {
        return CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setText("Save")
                .setOnClickAction(CardService.newAction()
                    .setFunctionName("EventHandlers.Bot.saveMyBotInfo")
                )
            )
            .setSecondaryButton(CardService.newTextButton()
                .setText("Cancel")
                .setOnClickAction(CardService.newAction()
                    .setFunctionName("EventHandlers.Bot.back")
                )
            );
    }
}

// --- IGNORE (for Node.js support) --- //
if (typeof module !== "undefined" && module.exports) {
    module.exports = BotSettingsCard;
}