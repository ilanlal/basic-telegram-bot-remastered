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
> This library provides a simple interface to interact with the Telegram Bot API. all API methods are accessible via the `executeApiRequest` method.

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

### Getting payments

To handle payments using your Telegram bot, you can use one of the following strategies:

#### 1. Sending an Invoice

```javascript
function sendInvoice() {
    // Replace the placeholders with your chat_id and bot token
    const chat_id = '[YOUR_CHAT_ID]';
    const token = '[YOUR_BOT_TOKEN]';
    const proxy = new TelegramBotProxy(token);
    // Create & send an invoice
    const invoiceResponse = proxy.executeApiRequest('sendInvoice', {
        chat_id,
        title: 'Test Product',
        description: 'This is a test product',
        payload: 'test_payload',
        currency: 'XTR',
        prices: JSON.stringify([
            { label: 'Total', amount: 1000 } // Amount in smallest units (e.g., cents)
        ]),
        photo_url: 'https://www.gstatic.com/webp/gallery/1.jpg',
        photo_width: 240
    });

    if (invoiceResponse?.getResponseCode() !== 200) {
        throw new Error(`Failed to send invoice: ${invoiceResponse?.getContentText() || 'No response'}`);
    }
}
```

#### 2. Sending a Paid media

To send a paid media (like a photo) after receiving a successful payment, you can use the following code snippet:

> Paid media should be sent only after confirming the payment via the `pre_checkout_query` and `successful_payment` updates from Telegram.

```javascript
function sendPaidPhoto(chat_id) {
    // Replace the placeholder with your bot token
    const token = '[YOUR_BOT_TOKEN]';
    const proxy = new TelegramBotProxy(token);

    // Send a paid photo
    const photoResponse = proxy.executeApiRequest('sendPaidMedia', {
                                chat_id,
                                title: 'Paid Photo',
                                description: 'This is a paid photo content.',
                                payload: 'paid_photo_payload',
                                protect_content: true,
                                star_count: 1000,
                                media: [
                                    {
                                        type: 'photo',
                                        media: 'https://www.gstatic.com/webp/gallery/1.jpg',
                                        caption: 'Thank you for your purchase! Here is your paid media content.'
                                    }
                                ]
                            });

    if (photoResponse?.getResponseCode() !== 200) {
        throw new Error(`Failed to send paid photo: ${photoResponse?.getContentText() || 'No response'}`);
    }
}
```

### Setting up a Webhook

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

#### Handling Incoming Updates

When Telegram sends updates to your webhook URL, you can handle them using the following code snippet:

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

- Define "Addon" framework for building Telegram bots with Google Apps Script.
- Integrate Google Chat API support.
- Improve error handling and logging mechanisms.
- Create a comprehensive set of examples and documentation.

## Overview

This project is a remastered version of the original [Basic Telegram Bot](https://github.com/ilanlal/basic-telegram-bot).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT license.
