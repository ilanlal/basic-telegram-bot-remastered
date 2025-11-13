require('../../../tests');
const { NavigationController } = require('./NavigationController');

describe('NavigationController', () => {
    let navigationController;

    beforeEach(() => {
        navigationController =
            NavigationController.create(
                UserStoreFactory.create().current,
                CardService,
                SpreadsheetApp.getActiveSpreadsheet(),
                PropertiesService.getUserProperties()
            );
    });

    it('should create an instance of NavigationController', () => {
        expect(navigationController).toBeInstanceOf(NavigationController);
    });

    it('should navigate to home card', () => {
        const response = navigationController.navigateToHomeCard();
        expect(response).toBeDefined();
    });

    it('should navigate to account card', () => {
        const response = navigationController.navigateToAccountCard();
        expect(response).toBeDefined();
    });

    // Test for navigating to home card
    it('should navigate to home card', () => {
        const response = navigationController.navigateToHomeCard();
        expect(response).toBeDefined();
        const builtResponse = response.build();
        expect(builtResponse).toBeDefined();
        const data = builtResponse.getData();
        expect(data).toBeDefined();
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    // Test for navigating to about card
    it('should navigate to about card', () => {
        const response = navigationController.navigateToAboutCard();
        expect(response).toBeDefined();
        const builtResponse = response.build();
        expect(builtResponse).toBeDefined();
        const data = builtResponse.getData();
        expect(data).toBeDefined();
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    // Test for navigating to account card
    it('should navigate to account card', () => {
        const response = navigationController.navigateToAccountCard();
        expect(response).toBeDefined();
        const builtResponse = response.build();
        expect(builtResponse).toBeDefined();
        const data = builtResponse.getData();
        expect(data).toBeDefined();
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });
});