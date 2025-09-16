# ![Logo](https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/logo24.png) Basic Telegram Bot (REMASTERED)
A simple Telegram bot client for Google Apps Script.

[![GitHub release](https://img.shields.io/github/release/ilanlal/basic-telegram-bot-remastered.svg)](https://github.com/ilanlal/basic-telegram-bot-remastered/releases)

[![GitHub stars](https://img.shields.io/github/stars/ilanlal/basic-telegram-bot-remastered?style=social)](https://github.com/ilanlal/basic-telegram-bot-remastered/stargazers)
[![GitHub repo size](https://img.shields.io/github/repo-size/ilanlal/basic-telegram-bot-remastered)](https://github.com/ilanlal/basic-telegram-bot-remastered)
[![GitHub last commit](https://img.shields.io/github/last-commit/ilanlal/basic-telegram-bot-remastered)](https://github.com/ilanlal/basic-telegram-bot-remastered)
[![GitHub issues](https://img.shields.io/github/issues/ilanlal/basic-telegram-bot-remastered)](https://github.com/ilanlal/basic-telegram-bot-remastered/issues)
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ilanlal/basic-telegram-bot-remastered/blob/main/LICENSE.md)

## Crash Course

Copy the contents of the `src/lib/TelegramBotClient.js` file into new file named `TelegramBotClient.gs` in your Google Apps Script project.

Then, you can use the following code to send a message using your Telegram bot:

```javascript

// Replace the placeholders with your chat_id and bot token
const chat_id = '[YOUR_CHAT_ID]';
const token = '[YOUR_BOT_TOKEN]';

// Create a new instance of the TelegramBotClient class
const client = new TelegramBotClient(token);

// Send a message to the chat
client.sendMessage({ chat_id, text: 'Hello, world!' })
    .then(response => {
        console.log('Message sent:', response);
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
```

## Roadmap

- Backoffice to manage multiple bots and users

## Overview

This project is a remastered version of the original [Basic Telegram Bot](https://github.com/ilanlal/basic-telegram-bot).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT license.
