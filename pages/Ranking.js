import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.getPlayersFromLocalStorage();
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  getPlayersFromLocalStorage = () => {
    const players = JSON.parse(localStorage.getItem('player')) || [];
    this.setState({ players });
  };

  render() {
    const { players } = this.state;
    players.sort((a, b) => b.playerScore - a.playerScore);
    console.log(players);

    return (
      <main>
        <section>
          <h1 data-testid="ranking-title">Ranking</h1>
        </section>
        <section>
          {
            players.map((player, index) => {
              const { playerName, playerScore, playerImg } = player;
              return (
                <section key={ index }>
                  <img src={ playerImg } alt={ playerName } />
                  <h2 data-testid={ `player-name-${index}` }>
                    { playerName }
                  </h2>
                  <h3 data-testid={ `player-score-${index}` }>
                    { playerScore }
                  </h3>
                </section>
              );
            })
          }
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect()(Ranking);
