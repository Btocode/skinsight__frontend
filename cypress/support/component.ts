import { mount } from "cypress/react";

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Cypress {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);