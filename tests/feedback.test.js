import { screen } from "@testing-library/react"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from "../App";

const EMAIL = 'email@teste.com';

const initialState = {
  player: {
    name: 'Maria',
    assertions: 4,
    score: 310,
    gravatarEmail: EMAIL,
  }
};

describe('Testing the Feedback page', () => {
  it('1- Checks if the Feedback page contains the requested items', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const playerEmail = screen.getByText(EMAIL);
    expect(playerEmail).toBeInTheDocument();
    const imgGravatar = screen.getByTestId('header-profile-picture');
    expect(imgGravatar).toBeInTheDocument();
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();
    expect(playerName).toHaveTextContent('Maria');
    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();
    expect(playerScore).toHaveTextContent('310');
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackText).toHaveTextContent('Well Done!');
    const totalScore = screen.getByTestId('feedback-total-score');
    expect(totalScore).toBeInTheDocument();
    expect(totalScore).toHaveTextContent('310');
    const assertions = screen.getByTestId('feedback-total-question');
    expect(assertions).toBeInTheDocument();
    expect(assertions).toHaveTextContent('4');
    const btnRanking = screen.getByRole('button', { name: 'Ranking'});
    expect(btnRanking).toBeInTheDocument();
    const btnPlayAgain = screen.getByRole('button', { name: 'Play Again'});
    expect(btnPlayAgain).toBeInTheDocument();
  });
  it('2- Checks if inputs and button "Ranking" work correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const btnRanking = screen.getByRole('button', { name: 'Ranking'});
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  });
  it('3- Checks if inputs and button "Play Again" work correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: 'Play Again'});
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });
  it('4- checks if the correct message is displayed if you have more than 3 assertions', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Well Done!');
  });
  it('5- checks if the correct message is displayed if you have less than 3 assertions', () => {
    const fewAssertions = {
      player: {
        name: 'Maria',
        assertions: 2,
        score: 310,
        gravatarEmail: EMAIL,
      }
    };
    renderWithRouterAndRedux(<App />, fewAssertions, '/feedback');
    
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Could be better...');
  });
});
