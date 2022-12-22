import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import NamesCollector from './NamesCollector';

it('ItemCollector component', async () => {
    const user = userEvent.setup();
    render(<NamesCollector />);

    const namesList = screen.getByRole('list');
    const { queryAllByRole } = within(namesList);
    let names = queryAllByRole('listitem');
    const nextButton = screen.getByRole('button', { name: 'NEXT' });
    const plusButton = screen.getByRole('button', { name: '+' });
    const nameInput = screen.getByPlaceholderText('Name');

    // Initial tests.
    expect(names.length).toBe(0);
    expect(nextButton).toBeDisabled();
    expect(plusButton).toBeDisabled();
    expect(nameInput.value).toBe('');

    // Test what happens after inserting a value to nameInput.
    await user.type(nameInput, 'רוס');
    expect(nameInput.value).toBe('רוס');
    expect(plusButton).toBeEnabled();
    expect(nextButton).toBeDisabled();

    // Test what happens after submitting the form.
    await user.click(plusButton);
    names = queryAllByRole('listitem');
    expect(names.length).toBe(1);
    expect(names[0]).toHaveTextContent('רוס');
    expect(nextButton).toBeDisabled();
    expect(plusButton).toBeDisabled();
    expect(nameInput.value).toBe('');

    // Test what happens after inserting a value to nameInput.
    await user.type(nameInput, 'Chandler');
    expect(nameInput.value).toBe('Chandler');
    expect(plusButton).toBeEnabled();
    expect(nextButton).toBeDisabled();

    // Test what happens after submitting the form.
    await user.click(plusButton);
    names = queryAllByRole('listitem');
    expect(names.length).toBe(2);
    expect(names[1]).toHaveTextContent('Chandler');
    expect(nextButton).toBeEnabled();
    expect(plusButton).toBeDisabled();
    expect(nameInput.value).toBe('');

    // Test what happens after inserting a value to nameInput.
    await user.type(nameInput, 'Joey');
    expect(nameInput.value).toBe('Joey');
    expect(plusButton).toBeEnabled();

    // Test what happens after submitting the form.
    await user.click(plusButton);
    names = queryAllByRole('listitem');
    expect(names.length).toBe(3);
    expect(names[2]).toHaveTextContent('Joey');
    expect(nextButton).toBeEnabled();
    expect(plusButton).toBeDisabled();
    expect(nameInput.value).toBe('');
});
