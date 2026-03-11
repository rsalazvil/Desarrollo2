import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// mock react-router-dom here as well
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

import Login from './Login';

test('renders login form fields and submit', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /enviar código 2fa/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});

test('allows users to input email and password', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
});