class DeploymentCreateCard {
    constructor() {
        this._state = {
            deploymentId: "",
            environment: "production",
            // Add other state properties as needed
        };
    }

    setState(state) {
        this._state = { ...this._state, ...state };
        return this;
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName("deploymentCreateCard")
            .setHeader(CardService.newCardHeader()
                .setTitle("Setup Deployment")
                .setSubtitle("Set up a deployment 'id' for your bot"))
            .addSection(CardService.newCardSection()
                .addWidget(CardService.newTextInput()
                    .setFieldName("deploymentId")
                    .setTitle("Deployment ID")
                    .setValue(this._state.deploymentId)))
            .setFixedFooter(CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(" 💾 Save")
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.Home.saveDeploymentId')
                    )
                )
                .setSecondaryButton(CardService.newTextButton()
                    .setText(" ❌ Cancel")
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.back')
                    )
                ));

        return cardBuilder.build();
    }
}// --- IGNORE (for Node.js support) --- //

if (typeof module !== "undefined" && module.exports) {
    module.exports = { DeploymentCreateCard };
}
