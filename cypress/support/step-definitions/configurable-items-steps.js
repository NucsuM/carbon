import { draggableItemByText, draggableItemByTextNoIframe, draggableItemByPosition } from '../../locators/configurable-items';
import { dragAndDrop } from '../helper';

When('I drag Configurable Items {string} to {int}', (record, destinationId) => {
  const startPosition = 110;
  dragAndDrop(draggableItemByText(record), destinationId, startPosition);
});

When('I drag Configurable Items with iFrame {string} to {int}', (record, destinationId) => {
  const startPosition = 110;
  dragAndDrop(draggableItemByTextNoIframe(record), destinationId, startPosition);
});

Then('Configurable Items {string} is dragged to {int}', (record, destinationId) => {
  draggableItemByPosition(destinationId).should('have.text', record);
});
