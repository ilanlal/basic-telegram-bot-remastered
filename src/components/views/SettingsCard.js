class SettingsCard {
  static get CARD_NAME() {
    return "settingsCard";
  }

  constructor(model) {
    this._model = model;

    this.viewModel = {
      newCardHeader: () =>
        CardService.newCardHeader()
          .setTitle("⚙️ Developer Settings")
          .setSubtitle("Enable or disable features"),
      newCardSection: (attr) => {
        const section = CardService.newCardSection();
        if (attr.type === "boolean") {
          section.addWidget(this.viewModel.newDecoratedText(attr));
        } else {
          section.addWidget(this.viewModel.newTextInput(attr));
        }
        return section;
      },
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
      },
      newFixedFooter: () =>
        CardService.newFixedFooter().setPrimaryButton(
          CardService.newTextButton()
            .setText("💾 Save")
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("EventHandler.Addon.onSave")
                .setParameters({
                  data: JSON.stringify(this._model.data),
                  entityName: this._model.entitySchema.name,
                  entityId: this._model.entitySchema.id,
                }))),
    };
  }

  static create(model = Settings.create().load()) {
    return new SettingsCard(model);
  }

  build() {
    const cardBuilder = CardService.newCardBuilder()
      .setName(SettingsCard.CARD_NAME)
      .setHeader(this.viewModel.newCardHeader());

    this._model.attributes.forEach((attr) => {
      cardBuilder.addSection(this.viewModel.newCardSection(attr));
    });

    cardBuilder.setFixedFooter(this.viewModel.newFixedFooter());

    return cardBuilder.build();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = SettingsCard;
}
