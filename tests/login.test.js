import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const EMAIL = 'email@test.com';

describe('Testing the login page', () => {
  it('1- Checks if the login page contains the requested items', () => {
    renderWithRouterAndRedux(<App />);;
    expect(screen.getByLabelText('Seu Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Seu e-mail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Configurações' })).toBeInTheDocument();
  });
  it('2- Checks if inputs and button "Play" work correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', { name: 'Play' });
    expect(btnPlay).toBeDisabled();
    userEvent.type(screen.getByLabelText('Seu Nome'), 'Maria');
    expect(btnPlay).toBeDisabled();
    userEvent.type(screen.getByLabelText('Seu e-mail'), EMAIL);
    expect(btnPlay).not.toBeDisabled();
    userEvent.click(btnPlay);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/game');
  });
  it('3- Checks if button "Configurações" work correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Configurações' }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
  });
});