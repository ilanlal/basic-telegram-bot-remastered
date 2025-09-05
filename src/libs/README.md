# Basic Telegram Bot

A simple Telegram bot client library for Node.js and Google Apps Script.

## Features

- Send messages to Telegram chats
- Handle incoming updates from Telegram
- Easy-to-use API for common bot tasks
- User management with a built-in user store

## Installation

You can install the library via npm:

```bash
npm install @ilanlal/basic-telegram-bot
```

## Usage

### Node.js

Here's an example of how to use the `TelegramBotClient` class in a Node.js environment:

```javascript
const { TelegramBotClientFactory } = require('@ilanlal/basic-telegram-bot');

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

### Google Apps Script

The class is available as a library in Google Apps Script. To use it, follow these steps:

1. Open the Apps Script editor.
2. Click on the `+` icon to create a new script.
3. In the Apps Script editor, click on the menu item `Resources > Libraries...`.
4. In the "Add a library" field, enter the Script ID `1DDZlfXvzArILhaX1IPakwcrPXW-aaMatA3JRJYmlFaBKZsUaKen7F5-y` and click "Look up".
5. In the "Version" dropdown, select the latest version of the library. If you want to use a specific version, select it from the dropdown. selecting the 'head' will always give you the latest version.
6. In the "Identifier" field, enter a name for the library, for example, `Lib`.

Now you can use the `TelegramBotClient` class in your Apps Script project. Here is an example of how to use it:

```javascript
function sendHelloWorld() {
    // Replace the placeholders with your chat_id and bot token
    const chat_id = '[YOUR_CHAT_ID]';
    const token = '[YOUR_BOT_TOKEN]';

    // Create a new instance of the TelegramBotClient class
    const client = Lib.getTelegramBotClient(token);
    const text = 'Hello, world!';
    // Send a message to the chat
    const response = client.sendMessage({chat_id, text});
    Logger.log(response);
}
```
