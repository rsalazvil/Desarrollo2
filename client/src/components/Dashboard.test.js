import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

// The component is in Spanish, so we check for visible text accordingly
test('renders Dashboard component with welcome message', () => {
    render(<Dashboard />);
    const heading = screen.getByText(/bienvenido al panel/i);
    expect(heading).toBeInTheDocument();
});

test('has a logout button', () => {
    render(<Dashboard />);
    const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
    expect(logoutButton).toBeInTheDocument();
});