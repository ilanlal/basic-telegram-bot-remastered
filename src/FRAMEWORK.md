# Framework Documentation

This document provides an overview of the framework used in the Telegram Bot project. It outlines the key components and their interactions within the system.

## TelegramBotProxy Library

To use the Telegram Bot API in your Google Apps Script project, you need to include the `TelegramBotProxy` library.
Copy the contents of the `src/lib/TelegramBotProxy.js` file into a new file named `TelegramBotProxy.gs` in your Google Apps Script project.
> Note: the file extension should be `.gs` for Google Apps Script.
This library provides a simple interface to interact with the Telegram Bot API. All API methods are accessible via the `executeApiRequest` method.

## MVC/MVVM "MVW" Architecture

The project follows a Model-View-Whatever (MVW) architecture, which is a flexible approach to organizing code. The key components are:

- **Models**: Responsible for data management and business logic. They interact with the Telegram Bot API and handle data storage and retrieval.
- **Views**: Handle the presentation layer, rendering the user interface and displaying data to users.
- **Controllers/Handlers**: Act as intermediaries between Models and Views, processing user input and updating the Models and Views accordingly.
