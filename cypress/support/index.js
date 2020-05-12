import { radioButtonComponent } from '../locators/radioButton';

// Configure custom commands eyes-cypress
import '@applitools/eyes-cypress/commands';

import applitoolsSettings from '../../applitools.config';

export const DEBUG_FLAG = false;
require('cypress-plugin-retries');


// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// You can mock if needed. Example below
// beforeEach(() => {
//     cy.server();
//     cy.route('/countries*', {});
// })

/* returning false here prevents Cypress from failing the test */
Cypress.on('uncaught:exception', (err, runnable) => false);

Cypress.Commands.overwrite(
  'type',
  (originalFn, subject, string, options) => originalFn(
    subject,
    string,
    Object.assign({}, options, { delay: 75 }),
  ),
);

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));

Cypress.Commands.add('radioButtonComponent', (radioButtonLabel) => {
  radioButtonComponent().each(($el) => {
    const labelText = $el.find('label').text();
    if (labelText.includes(radioButtonLabel)) {
      cy.wrap($el);
    }
  });
});

Cypress.Commands.add('radioButton', (radioButtonLabel, findBy) => {
  radioButtonComponent().each(($el) => {
    const labelText = $el.find('label').text();
    if (labelText.includes(radioButtonLabel)) {
      cy.wrap($el).find(findBy);
    }
  });
});

function getItem(selector, counter) {
  if ((document.readyState === 'loading' || document.readyState === 'interactive') && document.readyState !== 'completed') { // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', getItem);
  } else {
    cy.wait(100, { log: DEBUG_FLAG })
      .get('#storybook-preview-iframe', { log: DEBUG_FLAG })
      .then(($iframe) => {
        const doc = $iframe.contents();
        if (!doc.find(selector).length && counter > 0) {
          return getItem(selector, --counter);
        }
        return cy.wrap(doc.find(selector));
      });
  }
}

Cypress.Commands.add('iFrame', (selector) => { getItem(selector, 50); });

Cypress.Screenshot.defaults({ screenshotOnRunFailure: DEBUG_FLAG });

const {
  Before,
  After,
} = require('cypress-cucumber-preprocessor/steps');


if (Cypress.env('CYPRESS_APPLITOOLS')) {
  Before({ tags: '@applitools' }, () => {
    applitoolsSettings.testName = cy.state('ctx').test.title;
    applitoolsSettings.batchName = cy.state('ctx').test.parent.title;
    cy.eyesOpen(applitoolsSettings);
  });

  After({ tags: '@applitools' }, () => {
    cy.eyesClose();
  });
}
