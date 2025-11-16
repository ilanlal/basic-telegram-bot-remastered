class CustomerModel {
    static get SHEET_NAME() {
        return EMD.Customer.sheet({}).name;
    }

    static create(userProperties = PropertiesService.getUserProperties(), activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new CustomerModel(userProperties, activeSpreadsheet);
    }

    constructor(userProperties, activeSpreadsheet) {
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.Customer.sheet({}));
    }

    getCustomerByChatId(chat_id) {
        const range = this.sheet.getDataRange();
        const values = range.getValues() || [];
        
        for (let row = 0; row < values.length; row++) { 
            if (values[row][1] === chat_id) {
                return values[row];
            }
        }
        return null;
    }

    addNewCustomer(customer) {
        const range = this.sheet.getDataRange();
        const values = range.getValues() || [];
        // add createdOn in the first column as ISO string
        const newRow = [
            new Date().toISOString(),
            ...customer
        ];
        this.sheet.appendRow(newRow);
        return newRow;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CustomerModel };
}