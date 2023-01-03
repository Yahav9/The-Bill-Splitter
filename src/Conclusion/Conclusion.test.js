import { logRoles, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import Conclusion from './Conclusion';
import { testData } from '../ItemCollector/ItemCollector.test';

it('Conclusion component with data prop', () => {
    render(<Conclusion data={testData} />);
    const namesList = screen.getByRole('list');
    const { queryAllByRole } = within(namesList);
    const names = queryAllByRole('listitem');
    const total = screen.getByText('Total: 128.80₪');
    expect(names[0]).toHaveTextContent('Ross46.80₪');
    expect(names[1]).toHaveTextContent('Chandler25.90₪');
    expect(names[2]).toHaveTextContent('Joey56.10₪');
    expect(total).toBeInTheDocument();
});
