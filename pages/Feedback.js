import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { emptyStore } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    this.updateEverything();
  }

  updateEverything = () => {
    const { score, name, gravatarImg } = this.props;
    const player = {
      playerName: name,
      playerScore: score,
      playerImg: gravatarImg,
    };
    const getStorage = JSON.parse(localStorage.getItem('player')) || [];
    const union = [...getStorage, player];
    localStorage.setItem('player', JSON.stringify(union));
  };

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(emptyStore());
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    const num = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions < num
            ? 'Could be better...' : 'Well Done!'}
        </h1>
        <h2 data-testid="feedback-total-score">
          { score }
        </h2>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  gravatarImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarImg: state.player.gravatarImg,
});

export default connect(mapStateToProps)(Feedback);
