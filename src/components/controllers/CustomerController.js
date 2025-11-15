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
            username: message.from.username || '',
            first_name: message.from.first_name,
            last_name: message.from.last_name || '',
            language_code: message.from.language_code || '',
            is_bot: message.from.is_bot || false,
            message: JSON.stringify(message)
        }

        return CustomerModel
            .create(this.userProperties, this.activeSpreadsheet)
            .addNewCustomer(Object.values(customer));
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CustomerController };
}