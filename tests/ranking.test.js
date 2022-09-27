import { screen } from "@testing-library/react"
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from "../App";

// const INITIAL_STATE = [
//     {
//         name: 'Pedro',
//         score: 120,
//         gravatarImg: 'https://www.gravatar.com/avatar/4c50aad286c8fef9c047652b60fed3cc',
//     },
//     {
//         name: 'Laís',
//         score: 100,
//         gravatarImg: 'https://www.gravatar.com/avatar/f881192fc66cff818f1448986d50fbed',
//     },
//     {
//         name: 'Son Goku',
//         score: 220,
//         gravatarImg: 'https://www.gravatar.com/avatar/7e170c2f6b6f648eac7d3fd7ebbd9440',
//     },
// ];

describe('Testing the Ranking page', () => {
    test('If Ranking info are on screen', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/ranking');
        const { location: { pathname } } = history;
        expect(pathname).toBe('/ranking');

        const rankingTitle = screen.getByTestId('ranking-title');
        const playAgainButton = screen.getByTestId('btn-go-home');

        expect(rankingTitle).toBeInTheDocument();
        expect(playAgainButton).toBeInTheDocument();
    });

    test('If after click Play Again Button, the page is redirected to Home', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/ranking');
        const { location: { pathname } } = history;
        expect(pathname).toBe('/ranking');
        const playAgainButton = screen.getByTestId('btn-go-home');

        expect(playAgainButton).toBeInTheDocument();

        userEvent.click(playAgainButton);

        expect(pathname).toBe('/');

    });
    // test('If after the user play the game, his score, name and picture info are on screen', () => {
        
    //     renderWithRouterAndRedux(<App />, INITIAL_STATE) 
    //     const { history } = renderWithRouterAndRedux(<App />);
    //     history.push('/ranking');
    //     const { location: { pathname } } = history;
    //     expect(pathname).toBe('/ranking');

    //     const playerOneName = screen.getByTestId('player-name-0');
    //     const playerTwoName = screen.getByTestId('player-name-1');
    //     const playerOneScore = screen.getByTestId('player-score-0');
    //     const playerTwoScore = screen.getByTestId('player-score-1');
    //     expect(playerOneName).toBeInTheDocument();
    //     expect(playerTwoName).toBeInTheDocument();
    //     expect(playerOneScore).toBeInTheDocument();
    //     expect(playerTwoScore).toBeInTheDocument();
    // });
});