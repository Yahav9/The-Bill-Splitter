import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ItemCollector from './ItemCollector';

export const testData = {
    expiration: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
    items: [
        { name: 'Pitcher of Lemonade', price: 15, index: 0 },
        { name: 'Fries', price: 32, index: 1 },
        { name: 'Pizza', price: 70, index: 2 }
    ],
    people: [
        { name: 'Ross', payment: 46.8, index: 0 },
        { name: 'Chandler', payment: 25.9, index: 1 },
        { name: 'Joey', payment: 56.1, index: 2 },
    ],
    tip: 1.1
};

let itemList;
let nextButton;
let plusButton;
let itemInput;
let priceInput;
let total;

function setVariables(data) {
    render(<ItemCollector data={data} />);
    itemList = screen.getByRole('list');
    nextButton = screen.getByRole('button', { name: 'NEXT' });
    plusButton = screen.getByRole('button', { name: '+' });
    itemInput = screen.getByPlaceholderText('Item (optional)');
    priceInput = screen.getByPlaceholderText('Price');
    total = data ? screen.getByText('117.00₪') : screen.getByText('0.00₪');
}

function checkExpectations(
    expectedItemsLength,
    itemIndex,
    expectedItemTextContent,
    isNextButtonEnabled,
    isPlusButtonEnabled,
    expectedItemInputValue,
    expectedPriceInputValue,
    expectedTotal
) {
    const { getAllByRole } = within(itemList);
    let items = getAllByRole('listitem');
    expect(items.length).toBe(expectedItemsLength);
    expect(items[itemIndex]).toHaveTextContent(expectedItemTextContent);
    isNextButtonEnabled ? expect(nextButton).toBeEnabled() : expect(nextButton).toBeDisabled();
    isPlusButtonEnabled ? expect(plusButton).toBeEnabled() : expect(plusButton).toBeDisabled();
    expect(itemInput.value).toBe(expectedItemInputValue);
    expect(priceInput.value).toBe(expectedPriceInputValue);
    expect(total).toHaveTextContent(expectedTotal);
}

it('ItemCollector component w/o data prop', async () => {
    const user = userEvent.setup();
    setVariables();

    // Initial tests
    checkExpectations(1, 0, 'Total: 0.00₪', false, false, '', '', '0.00₪');

    await user.type(itemInput, 'Fries');
    expect(itemInput.value).toBe('Fries');
    expect(plusButton).toBeDisabled();

    // Test invalid input.
    await user.type(priceInput, 'abcd');
    expect(priceInput.value).toBe('');

    // Value should change when entering valid data.
    await user.type(priceInput, '20');
    expect(priceInput.value).toBe('20');
    expect(plusButton).toBeEnabled();

    // Testing what happens after an item is added to the list.
    await user.click(plusButton);
    checkExpectations(2, 0, 'Fries20.00₪', true, false, '', '', '20.00₪');

    await user.type(itemInput, 'פיצה');
    expect(itemInput.value).toBe('פיצה');
    expect(plusButton).toBeDisabled();

    await user.type(priceInput, '55.9');
    expect(priceInput.value).toBe('55.9');
    expect(plusButton).toBeEnabled();

    await user.click(plusButton);
    checkExpectations(3, 1, 'פיצה55.90₪', true, false, '', '', '75.90₪');

    await user.type(priceInput, '37.3');
    expect(priceInput.value).toBe('37.3');
    expect(plusButton).toBeEnabled();

    await user.click(plusButton);
    checkExpectations(4, 2, 'Item37.30₪', true, false, '', '', '113.20₪');
});

it('ItemCollector component with data prop', async () => {
    const user = userEvent.setup();
    setVariables(testData);

    // Initial tests
    checkExpectations(4, 2, 'Pizza70.00₪', true, false, '', '', '117.00₪');

    const deleteButtons = screen.getAllByRole('button', { name: 'delete' });

    // Delete Pizza
    await user.click(deleteButtons[2]);
    checkExpectations(3, 1, 'Fries32.00₪', true, false, '', '', '47.00₪');
});
