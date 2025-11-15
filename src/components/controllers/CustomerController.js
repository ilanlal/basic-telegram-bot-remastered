class CustomerController {
    static create(userProperties, activeSpreadsheet) {
        return new CustomerController(userProperties, activeSpreadsheet);
    }

    constructor(userProperties, activeSpreadsheet) {
        this.userProperties = userProperties;
        this.activeSpreadsheet = activeSpreadsheet;
    }

    verifyCustomer(message) {
        const chatId = message.from.id;
        const existingCustomer = CustomerModel
            .create(this.userProperties, this.activeSpreadsheet)
            .getCustomerByChatId(chatId);

        if (existingCustomer) {
            // Customer already exists, no need to update
            return existingCustomer;
        }

        const customer = {
            id: message.from.id,
            is_bot: message.from.is_bot,
            first_name: message.from.first_name,
            last_name: message.from.last_name || '',
            username: message.from.username || '',
            language_code: message.from.language_code || ''
        }

        return CustomerModel
            .create(this.userProperties, this.activeSpreadsheet)
            .addNewCustomer(Object.values(customer));
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CustomerController };
}