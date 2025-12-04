require('../../../tests');

const { CustomerController } = require('./CustomerController');

describe('CustomerController', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    it('should create an instance', () => {
        const userProperties = PropertiesService.getDocumentProperties();
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const controller = CustomerController.create(userProperties, activeSpreadsheet);
        expect(controller).toBeInstanceOf(CustomerController);
    });

    // addNewCustomer
    it('should add a new customer', () => {
        const userProperties = PropertiesService.getDocumentProperties();
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const controller = CustomerController.create(userProperties, activeSpreadsheet);
        const mockedMessage = {
            from: {
                id: '12345',
                is_bot: false,
                first_name: 'Jane',
                last_name: 'Smith',
                username: 'janesmith',
                language_code: 'en'
            }
        };
        // ["2025-11-15T17:20:53.211Z", "12345", false, "Jane", "Smith", "janesmith", "en"]
        const addedCustomer = controller.verifyCustomer(mockedMessage);
        expect(addedCustomer).toEqual(expect.arrayContaining([expect.any(String), ...Object.values(mockedMessage.from)]));

        // Verify that the customer was added
        const fetchedCustomer = controller.verifyCustomer({ from: mockedMessage.from });
        expect(Array.isArray(fetchedCustomer)).toBe(true);

        // Ensure no duplicate is added
        const allCustomers = [];
        const sheet = activeSpreadsheet.getSheetByName(CustomerModel.SHEET_NAME);
        const data = sheet.getDataRange().getValues();
        for (let row of data) {
            if (row[1] === mockedMessage.from.id) {
                allCustomers.push(row);
            }
        }
        expect(allCustomers.length).toBe(1);
    });
});
