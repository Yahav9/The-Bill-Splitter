import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ItemCollector from './ItemCollector';

it('ItemCollector component', async () => {
    const user = userEvent.setup();

    render(<ItemCollector />);

    const itemList = screen.getByRole('list');
    const { getAllByRole } = within(itemList);
    let items = getAllByRole('listitem');
    const nextButton = screen.getByRole('button', { name: 'NEXT' });
    const plusButton = screen.getByRole('button', { name: '+' });
    const itemInput = screen.getByPlaceholderText('Item (optional)');
    const priceInput = screen.getByPlaceholderText('Price');
    const total = screen.getByText('0.00₪');

    // Initial tests
    expect(items.length).toBe(1);
    expect(nextButton).toBeDisabled();
    expect(plusButton).toBeDisabled();
    expect(itemInput.value).toBe('');
    expect(priceInput.value).toBe('');

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
    items = getAllByRole('listitem');
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent('Fries20.00₪');
    expect(nextButton).toBeEnabled();
    expect(plusButton).toBeDisabled();
    expect(itemInput.value).toBe('');
    expect(priceInput.value).toBe('');
    expect(total).toHaveTextContent('20.00₪');

    await user.type(itemInput, 'פיצה');
    expect(itemInput.value).toBe('פיצה');
    expect(plusButton).toBeDisabled();

    await user.type(priceInput, '55.9');
    expect(priceInput.value).toBe('55.9');
    expect(plusButton).toBeEnabled();

    await user.click(plusButton);
    items = getAllByRole('listitem');
    expect(items.length).toBe(3);
    expect(items[1]).toHaveTextContent('פיצה55.90₪');
    expect(nextButton).toBeEnabled();
    expect(plusButton).toBeDisabled();
    expect(itemInput.value).toBe('');
    expect(priceInput.value).toBe('');
    expect(total).toHaveTextContent('75.90₪');

    await user.type(priceInput, '37.3');
    expect(priceInput.value).toBe('37.3');
    expect(plusButton).toBeEnabled();

    await user.click(plusButton);
    items = getAllByRole('listitem');
    expect(items.length).toBe(4);
    expect(items[2]).toHaveTextContent('Item37.30₪');
    expect(nextButton).toBeEnabled();
    expect(plusButton).toBeDisabled();
    expect(itemInput.value).toBe('');
    expect(priceInput.value).toBe('');
    expect(total).toHaveTextContent('113.20₪');
});
