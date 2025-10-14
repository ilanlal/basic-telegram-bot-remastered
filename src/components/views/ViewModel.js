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

        return new ViewModel(Entity.createFromObject(object));
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
        const cardBuilder = CardService.newCardBuilder();
        cardBuilder
            .setName(`${this.entity.name}Card`)
            .setHeader(
                CardService.newCardHeader()
                    .setTitle(this.entity.name)
                    .setSubtitle(this.entity.description || "..")
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(this.entity.imageUrl || 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png'));

        this.entity.attributes.forEach((attr) => {
            cardBuilder.addSection(
                this.newCardSection(attr));
        });

        cardBuilder.setFixedFooter(this.newFixedFooter());

        return cardBuilder;
    }

    newCardSection(attr) {
        const section = CardService.newCardSection();
        if (attr.type === "boolean") {
            section.addWidget(this.newDecoratedText(attr));
        } else {
            section.addWidget(this.newTextInput(attr));
        }
        return section;
    }

    newDecoratedText(attr) {
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
    }

    newTextInput(attr) {
        return CardService.newTextInput()
            .setFieldName(attr.id)
            .setTitle(attr.name)
            .setValue(String(attr.value))
            .setHint(attr.description);
    }

    newFixedFooter() {
        return CardService.newFixedFooter().setPrimaryButton(
            CardService.newTextButton()
                .setText("💾 Save")
                .setOnClickAction(
                    CardService.newAction()
                        .setFunctionName("EventHandler.Addon.onSave")
                        .setParameters({
                            data: JSON.stringify(this.entity.attributes),
                            entityName: this.entity.name,
                            entityId: this.entity.id,
                        })))
    }
}

ViewModel.Card = {
    build(entity) {
        const viewModel = new ViewModel(entity);
        return viewModel.newCardBuilder().build();
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = ViewModel;
}