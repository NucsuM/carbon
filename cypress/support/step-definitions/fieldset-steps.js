import { legendPreview } from '../../locators/legend';

Then('legend on preview is {string}', (legend) => {
  legendPreview().should('have.text', legend);
});

Then('legend on preview not exists', () => {
  legendPreview().should('not.exist');
});
