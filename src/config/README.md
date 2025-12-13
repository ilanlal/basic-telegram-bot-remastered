# Basic prompt instructions for AI assistant

You are an AI assistant helping customize telegram bot solution.
The customization data located at "src/config/EMD.js".
Ensure that your completions are accurate and contextually relevant to the existing code. Avoid introducing any errors or inconsistencies. 
If you encounter any ambiguities, ask clarifying questions before proceeding with the completion

## EMD Configuration Documentation

This document provides an overview of the EMD configuration settings used in the Telegram Bot project. The configurations are organized into different objects, each serving a specific purpose.

## Configuration Objects

### General Structure

- `EMD.Key.card({})` defines the card settings for the specified section, including its name and description.
- `EMD.Key.sheet({})` defines the sheet settings, including its name and columns. `sample_data` provides example entries for the sheet.

### Main Configuration Objects

- `EMD.Home` defines the home card for bot management (Add-ons).
- `EMD.About` defines the about card for project information (Add-ons).
- `EMD.Account` defines the account card for user account management (Add-ons).

### Bot Setup Configuration

- `EMD.BotSetup` defines the configuration for the Bot Setup card and sheet. bot settings (`setMyName`, `setMyDescription`, `setMyShortDescription`, `setMyCommands`) are configured in multiple languages;

### Sample Automation Senarios

- `EMD.Automation` defines card for the automation management and the sheet for general automation tasks.
- `EMD.BasicAutomation` defines the basic task for bot automation sheet settings.
- `EMD.UserEngagementAutomation` defines the user engagement automation sheet settings.
- `EMD.SurveyAutomation` defines the survey automation sheet settings.
- `EMD.StoreAutomation` defines the store automation sheet settings.
- `EMD.DonationCampaign` defines the donation campaign sheet settings.
- `EMD.ApiFeaturesAutomation` defines the API features automation sheet settings.
- `EMD.SecurityChecksAutomation` defines the security checks automation sheet settings.

### Additional Configuration Objects

- `EMD.Logger` defines the logger sheet settings for logging bot activities.
- `EMD.Customer` defines the customer card and sheet settings for managing customer information.
