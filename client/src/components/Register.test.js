import React from 'react';
import { render, screen } from '@testing-library/react';

// mock react-router-dom to avoid resolution issues
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

import Register from './Register';

test('renders Register component', () => {
    render(<Register />);
    const heading = screen.getByText(/registro/i);
    expect(heading).toBeInTheDocument();
});

test('has a register button', () => {
    render(<Register />);
    const buttonElement = screen.getByRole('button', { name: /registrarse/i });
    expect(buttonElement).toBeInTheDocument();
});