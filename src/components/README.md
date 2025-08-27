# MVC

This directory contains the MVC components of the application, including controllers, views, and models. Each component is organized into its own subdirectory for better maintainability and scalability.

I Wish to highlight the following key aspects of this structure:

- **Models**: Represent the data and business logic of the application.
- **Controllers**: Handle user input and interactions, updating models and views accordingly.
- **Views**: Responsible for the presentation layer, rendering the user interface.
- **Factories**: Each controller has an associated factory class to facilitate the creation and configuration of controller instances.

This structure promotes a clear separation of concerns, making it easier to manage and extend the application as it grows in complexity.

## Key Features

- **Index File**: The `index.js` file in this directory serves as a central export point for all controllers, making it easier to import them elsewhere in the application.
