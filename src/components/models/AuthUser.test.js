const {
    AuthUser,
    AuthUserBuilder
} = require('./AuthUser.js');

describe('AuthUser Model Tests', () => {
    test("AuthUser should be defined", () => {
        expect(AuthUser).toBeDefined();
    });

    test("AuthUser should have a default constructor", () => {
        const authUser = new AuthUser();
        expect(authUser).toBeDefined();
        expect(authUser.getUserId()).toBeNull();
        expect(authUser.getUserCountry()).toBeNull();
        expect(authUser.getUserTimezone()).toBeNull();
        expect(authUser.getUserLicense()).toBeDefined();
        expect(authUser.getUserLocaleCode()).toBe("en");
    });

    test("AuthUser should set and get user properties correctly", () => {
        const authUser = new AuthUser();
        authUser.setUserId("123");
        authUser.setUserCountry("USA");
        authUser.setUserTimezone("PST");
        authUser.setUserLicense("premium");
        authUser.setUserLocaleCode("en-US");

        expect(authUser.getUserId()).toBe("123");
        expect(authUser.getUserCountry()).toBe("USA");
        expect(authUser.getUserTimezone()).toBe("PST");
        expect(authUser.getUserLicense()).toBe("premium");
        expect(authUser.getUserLocaleCode()).toBe("en-US");
    });

    test("AuthUser should serialize and deserialize correctly", () => {
        const authUser = new AuthUser();
        authUser.setUserId("123");
        authUser.setUserCountry("USA");
        authUser.setUserTimezone("PST");
        authUser.setUserLicense("premium");
        authUser.setUserLocaleCode("en-US");

        const jsonString = authUser.toJsonString();
        const deserializedAuthUser = AuthUser.fromJsonString(jsonString);

        expect(deserializedAuthUser).toBeDefined();
        expect(deserializedAuthUser.getUserId()).toBe("123");
        expect(deserializedAuthUser.getUserCountry()).toBe("USA");
        expect(deserializedAuthUser.getUserTimezone()).toBe("PST");
        expect(deserializedAuthUser.getUserLicense()).toBe("premium");
        expect(deserializedAuthUser.getUserLocaleCode()).toBe("en-US");
    });

    test("AuthUserBuilder should build AuthUser correctly", () => {
        const authUser = new AuthUserBuilder()
            .setUserId("123")
            .setUserCountry("USA")
            .setUserTimezone("PST")
            .setUserLicense("premium")
            .setUserLocaleCode("en-US")
            .build();

        expect(authUser).toBeDefined();
        expect(authUser.getUserId()).toBe("123");
        expect(authUser.getUserCountry()).toBe("USA");
        expect(authUser.getUserTimezone()).toBe("PST");
        expect(authUser.getUserLicense()).toBe("premium");
        expect(authUser.getUserLocaleCode()).toBe("en-US");
    });
});