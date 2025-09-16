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

Here's an example of how to use the `TelegramBotClient` class in a Node.js environment:

```javascript
const { TelegramBotClientFactory } = require('@ilanlal/telegram2gas');

// Replace the placeholders with your chat_id and bot token
const chat_id = '[YOUR_CHAT_ID]';
const token = '[YOUR_BOT_TOKEN]';

// Create a new instance of the TelegramBotClient class
const client = new TelegramBotClientFactory()
    .withToken(token)
    .create();

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

- Set up new telegram bot with the latest version of the Telegram Bot API.

## Overview

This project is a remastered version of the original [Basic Telegram Bot](https://github.com/ilanlal/basic-telegram-bot).

## Development

### Testing

- #### just

  To run local tests, use the following command:

  ```bash
  npm test
  ```
