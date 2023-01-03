import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import NamesCollector from './NamesCollector';
import { testData } from '../ItemCollector/ItemCollector.test';

let namesList;
let nextButton;
let plusButton;
let nameInput;

function setVariables(data) {
    render(<NamesCollector data={data} />);
    namesList = screen.getByRole('list');
    nextButton = screen.getByRole('button', { name: 'NEXT' });
    plusButton = screen.getByRole('button', { name: '+' });
    nameInput = screen.getByPlaceholderText('Name');
}

function checkExpectations(
    expectedNamesLength,
    expectedName,
    isNextButtonEnabled,
    isPlusButtonEnabled,
    expectedInputValue
) {
    const { queryAllByRole } = within(namesList);
    let names = queryAllByRole('listitem');
    expect(names.length).toBe(expectedNamesLength);
    expectedNamesLength > 1 && expect(names[expectedNamesLength - 1]).toHaveTextContent(expectedName);
    isNextButtonEnabled ? expect(nextButton).toBeEnabled() : expect(nextButton).toBeDisabled();
    isPlusButtonEnabled ? expect(plusButton).toBeEnabled() : expect(plusButton).toBeDisabled();
    expect(nameInput.value).toBe(expectedInputValue);
}

it('NamesCollector component w/o data prop', async () => {
    const user = userEvent.setup();
    setVariables();

    // Initial tests.
    checkExpectations(0, null, false, false, '');

    // Test what happens after inserting a value to nameInput.
    await user.type(nameInput, 'רוס');
    checkExpectations(0, null, false, true, 'רוס');

    // Test what happens after submitting the form.
    await user.click(plusButton);
    checkExpectations(1, 'רוס', false, false, '');

    // Test what happens after inserting a value to nameInput.
    await user.type(nameInput, 'Chandler');
    checkExpectations(1, 'רוס', false, true, 'Chandler');

    // Test what happens after submitting the form.
    await user.click(plusButton);
    checkExpectations(2, 'Chandler', true, false, '');
});

it('NamesCollector component with data prop', async () => {
    const user = userEvent.setup();
    setVariables(testData);

    // Initial tests.
    checkExpectations(3, 'Joey', true, false, '');

    const deleteButtons = screen.getAllByRole('button', { name: 'delete' });

    // deleting Joey and Chandler
    await user.click(deleteButtons[2]);
    checkExpectations(2, 'Chandler', true, false, '');
    await user.click(deleteButtons[1]);
    checkExpectations(1, 'Ross', false, false, '');
});
