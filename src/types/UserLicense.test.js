/* eslint-disable no-undef */
const { UserLicense } = require('./UserLicense');

describe('UserLicense Model Tests', () => {
    test('UserLicense should have a default constructor', () => {
        const license = new UserLicense();
        expect(license).toBeInstanceOf(UserLicense);
        expect(license.getUserId()).toBe('');
        expect(license.getPlanId()).toBe('');
        expect(license.getCreatedOn()).toBeNull();
        expect(license.getExpirationDate()).toBeNull();
        expect(license.getAmount()).toBe(0);
    });

    test('UserLicense should set and get properties correctly', () => {
        const license = new UserLicense();
        license.setUserId('user123')
            .setPlanId('plan456')
            .setCreatedOn(new Date('2023-01-01'))
            .setExpirationDate(new Date('2024-01-01'))
            .setAmount(100);

        expect(license.getUserId()).toBe('user123');
        expect(license.getPlanId()).toBe('plan456');
        expect(license.getCreatedOn()).toEqual(new Date('2023-01-01'));
        expect(license.getExpirationDate()).toEqual(new Date('2024-01-01'));
        expect(license.getAmount()).toBe(100);
    });

    test('UserLicense should serialize and deserialize correctly', () => {
        const license = new UserLicense()
            .setUserId('user123')
            .setPlanId('plan456')
            .setCreatedOn(new Date('2023-01-01'))
            .setExpirationDate(new Date('2024-01-01'))
            .setAmount(100);

        const jsonString = license.toJsonString();
        const deserializedLicense = UserLicense.fromJsonString(jsonString);

        expect(deserializedLicense.getUserId()).toBe('user123');
        expect(deserializedLicense.getPlanId()).toBe('plan456');
        expect(deserializedLicense.getCreatedOn()).toEqual(new Date('2023-01-01'));
        expect(deserializedLicense.getExpirationDate()).toEqual(new Date('2024-01-01'));
        expect(deserializedLicense.getAmount()).toBe(100);
    });

    test('UserLicense isActive method works correctly', () => {
        const license = new UserLicense()
            .setUserId('user123')
            .setPlanId('plan456')
            .setCreatedOn(new Date('2023-01-01'))
            .setExpirationDate(new Date().getTime() + 100000) // future date
            .setAmount(100);

        expect(license.isActive()).toBe(true);

        license.setExpirationDate(new Date('2022-01-01'));
        // by amount
        expect(license.isActive()).toBe(true);

        license.setAmount(0);
        expect(license.isActive()).toBe(false);
    });
});