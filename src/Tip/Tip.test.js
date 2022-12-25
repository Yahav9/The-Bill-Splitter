import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Tip from './Tip';

it('Tip component', async () => {
    const user = userEvent.setup();
    render(<Tip />);

    const nextButton = screen.getByRole('button', { name: 'NEXT' });
    const tipInput = screen.getByRole('spinbutton');

    // Initial tests
    expect(tipInput.value).toBe('10');
    expect(nextButton).toBeEnabled();

    // Clear tip input
    await user.clear(tipInput);
    expect(tipInput.value).toBe('');
    expect(nextButton).toBeDisabled();

    // Insert data to tip input
    await user.type(tipInput, '12');
    expect(tipInput.value).toBe('12');
    expect(nextButton).toBeEnabled();

});
