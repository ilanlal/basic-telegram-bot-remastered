/* eslint-disable no-undef */
require('./'); // index.js

describe('TelegramUser Model Tests', () => {
    test('TelegramUser model', () => {
        const user = TelegramUser.newTelegramUser()
            .setIsBot(true)
            .setUserId(123)
            .setFirstName('John')
            .setLastName('Doe')
            .setUsername('johndoe')
            .setLanguageCode('en')
            .setIsPremium(true)
            .setAddedToAttachmentMenu(true)
            .setCanJoinGroups(true)
            .setCanReadAllGroupMessages(true)
            .setSupportsInlineQueries(true)
            .setCanConnectToBusiness(true)
            .setHasMainWebApp(true);

        expect(user.getIsBot()).toBe(true);
        expect(user.getUserId()).toBe(123);
        expect(user.getFirstName()).toBe('John');
        expect(user.getLastName()).toBe('Doe');
        expect(user.getUsername()).toBe('johndoe');
        expect(user.getLanguageCode()).toBe('en');
        expect(user.getIsPremium()).toBe(true);
        expect(user.getAddedToAttachmentMenu()).toBe(true);
        expect(user.getCanJoinGroups()).toBe(true);
        expect(user.getCanReadAllGroupMessages()).toBe(true);
        expect(user.getSupportsInlineQueries()).toBe(true);
        expect(user.getCanConnectToBusiness()).toBe(true);
        expect(user.getHasMainWebApp()).toBe(true);
    });

    test('TelegramUser should serialize and deserialize correctly', () => {
        const user = TelegramUser.newTelegramUser()
            .setIsBot(true)
            .setUserId(123)
            .setFirstName('John')
            .setLastName('Doe')
            .setUsername('johndoe')
            .setLanguageCode('en')
            .setIsPremium(true)
            .setAddedToAttachmentMenu(true)
            .setCanJoinGroups(true)
            .setCanReadAllGroupMessages(true)
            .setSupportsInlineQueries(true)
            .setCanConnectToBusiness(true)
            .setHasMainWebApp(true);

        const jsonString = user.toJsonString();
        const expectedUser = TelegramUser.fromJsonString(jsonString);

        expect(expectedUser.getIsBot()).toBe(true);
        expect(expectedUser.getUserId()).toBe(123);
        expect(expectedUser.getFirstName()).toBe('John');
        expect(expectedUser.getLastName()).toBe('Doe');
        expect(expectedUser.getUsername()).toBe('johndoe');
        expect(expectedUser.getLanguageCode()).toBe('en');
        expect(expectedUser.getIsPremium()).toBe(true);
        expect(expectedUser.getAddedToAttachmentMenu()).toBe(true);
        expect(expectedUser.getCanJoinGroups()).toBe(true);
        expect(expectedUser.getCanReadAllGroupMessages()).toBe(true);
        expect(expectedUser.getSupportsInlineQueries()).toBe(true);
        expect(expectedUser.getCanConnectToBusiness()).toBe(true);
        expect(expectedUser.getHasMainWebApp()).toBe(true);
    });
});
