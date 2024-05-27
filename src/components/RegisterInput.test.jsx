/* eslint-disable no-trailing-spaces */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should handle name typing correctly
 *   - should call login function when login button is clicked
 */
import React from 'react';
import {
  describe, it, expect, afterEach, vi, 
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'emailtest');

    // Assert
    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Kata Sandi');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama');

    // Action
    await userEvent.type(nameInput, 'nama panjang');

    // Assert
    expect(nameInput).toHaveValue('nama panjang');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Kata Sandi');
    await userEvent.type(passwordInput, 'passwordtest');
    const nameInput = await screen.getByPlaceholderText('Nama');
    await userEvent.type(nameInput, 'nama panjang');
    const registerButton = await screen.getByRole('button', { name: 'Daftar' });
    
    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
      name: 'nama panjang',
    });
  });
});
