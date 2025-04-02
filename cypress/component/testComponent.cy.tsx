import React from 'react';
import TestComponent from './TestComponent';

describe('testComponent.cy.tsx', () => {
  it("playground", () => {
    // add a few tests
    cy.mount(<TestComponent />);
    cy.get("h1").should("exist");
    cy.get("h1").should("have.text", "Hello, world!");
    cy.get("button").should("exist");
    cy.get("button").should("have.text", "Click me");
    cy.get("button").click();
    cy.get("h1").should("have.text", "Hello, world! (clicked)");
  });
})