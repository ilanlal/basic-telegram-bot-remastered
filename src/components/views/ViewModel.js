class ViewModel {
    static createFromObject(object = {}) {
        if (!object || !object.name) {
            throw new Error('Invalid object: missing name');
        }
        if (!object.attributes) {
            object.attributes = [];
        }
        if (!object.actions) {
            object.actions = [];
        }
        if (!object.fields) {
            object.fields = [];
        }
        if (!object.imageUrl) {
            object.imageUrl = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png';
        }

        return new ViewModel(
            Entity.createFromObject(object)
        );
    }

    constructor(entity = null) {
        if (!entity) {
            throw new Error('Entity is required to build the card');
        }
        this.entity = entity;
        this.fields = [];
        this.actions = [];
    }

    newCardBuilder() {
        return ViewModel.Card.newCardBuilder(this.entity);
    }
}

ViewModel.Card = {
    newCardBuilder: (entity) => {
        const cardBuilder = CardService.newCardBuilder();
        cardBuilder
            .setName(`${entity.name}Card`)
            .setHeader(ViewModel.Card.newCardHeader(entity));

        entity.attributes.forEach((attr) => {
            cardBuilder.addSection(
                ViewModel.Card.newCardSection(attr));
        });

        cardBuilder.setFixedFooter(ViewModel.Card.newFixedFooter(entity));

        return cardBuilder;
    },
    newCardHeader: (entity) => {
        return CardService.newCardHeader()
            .setTitle(entity.name)
            .setSubtitle(entity.description || "..")
            .setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageUrl(entity.imageUrl || 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png');
    },
    newFixedFooter: (entity) => {
        return CardService.newFixedFooter().setPrimaryButton(
            CardService.newTextButton()
                .setText("💾 Save")
                .setOnClickAction(
                    CardService.newAction()
                        .setFunctionName("EventHandler.Addon.onSave")
                        .setParameters({
                            data: JSON.stringify(entity.attributes || []),
                            entityName: entity.name,
                            entityId: entity.id,
                        })))
    },
    newCardSection: (attr) => {
        const section = CardService.newCardSection();
        if (attr.type === "boolean") {
            section.addWidget(ViewModel.Card.Widget.newDecoratedText(attr));
        } else {
            section.addWidget(ViewModel.Card.Widget.newTextInput(attr));
        }
        return section;
    },
    Widget: {
        newDecoratedText: (attr) => {
            return CardService.newDecoratedText()
                .setTopLabel(`${attr.name}`)
                .setText(`${attr.description}`)
                .setBottomLabel(attr.value ? "🟢 - On" : "🔘 - Off")
                .setWrapText(true)
                .setButton(
                    CardService.newTextButton()
                        .setText(attr.value ? "🚫 Disable" : "✅ Enable")
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName("EventHandler.Addon.onToggleBooleanSetting")
                                .setParameters({
                                    settingId: attr.id,
                                    currentValue: String(attr.value),
                                })
                        )
                );
        },
        newTextInput: (attr) => {
            return CardService.newTextInput()
                .setFieldName(attr.id)
                .setTitle(attr.name)
                .setValue(String(attr.value))
                .setHint(attr.description);
        }
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = ViewModel;
}