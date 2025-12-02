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

Copy the contents of the `src/lib/TelegramBotProxy.js` file into new file named `TelegramBotProxy.gs` in your Google Apps Script project.

> Note: the file extension should be `.gs` for Google Apps Script.

Then, you can use the following code to send a message using your Telegram bot:

```javascript

// Replace the placeholders with your chat_id and bot token
const chat_id = '[YOUR_CHAT_ID]';
const token = '[YOUR_BOT_TOKEN]';

// Create a new instance of the TelegramBotProxy class
const proxy = new TelegramBotProxy(token);

// Send a message to the chat
const response = proxy.executeApiRequest('sendMessage', { chat_id, text: 'Hello from Google Apps Script!' });

if (response?.getResponseCode() !== 200) {
    throw new Error(`Failed to execute action: ${response?.getContentText() || 'No response'}`);
}

```

## Advanced Usage

First, copy the contents of the `src/lib/TelegramBotClient.js` file into a new file named `TelegramBotClient.gs` in your Google Apps Script project.
Then, you can use the following code snippets to set up a webhook and handle incoming updates:

```javascript
// Replace the placeholders with your bot token you generated from BotFather
const token = '[YOUR_BOT_TOKEN]';
// Google Apps Script Web App URL after deployment
const webDeploymentUrl = 'https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec';

const client = new TelegramBotClient(token);

client.setWebhook(webDeploymentUrl);
```

Handling incoming updates:

```javascript
// Handle incoming inline updates from Telegram
function doPost(e) {
    const update = JSON.parse(e.postData.contents);
    
    if (update.message) {
        const chat_id = update.message.chat.id;
        const text = update.message.text;

        // Echo the received message
        const token = '[YOUR_BOT_TOKEN]';
        const proxy = new TelegramBotProxy(token);

        const response = proxy.executeApiRequest('sendMessage', { chat_id, text: `You said: ${text}` });
        if (response?.getResponseCode() !== 200) {
            throw new Error(`Failed to execute action: ${response?.getContentText() || 'No response'}`);
        }
    }
}
```

## Roadmap

- Backoffice to manage multiple bots and users

## Overview

This project is a remastered version of the original [Basic Telegram Bot](https://github.com/ilanlal/basic-telegram-bot).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT license.
