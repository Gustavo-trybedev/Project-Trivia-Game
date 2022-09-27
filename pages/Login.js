import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenAndQuestions, logUser } from '../redux/actions';

class Login extends Component {
  state = {
    playerName: '',
    email: '',
    gravatarImg: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { playerName, email } = this.state;
      const minLength = 1;
      const rule = !(email.length >= minLength && playerName.length >= minLength);
      this.setState({ isButtonDisabled: rule }, () => {
        this.createSRCImg();
      });
    });
  };

  createSRCImg = () => {
    const {
      email,
    } = this.state;
    const gravatarImg = md5(email).toString();
    console.log(gravatarImg);
    this.setState({
      gravatarImg,
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { playerName, email, gravatarImg } = this.state;
    dispatch(fetchTokenAndQuestions());
    dispatch(logUser({ playerName, email, gravatarImg }));
    history.push('/game');
  };

  clickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { playerName, email, isButtonDisabled, gravatarImg } = this.state;
    console.log(gravatarImg);
    return (
      <main>
        <form>
          <label
            htmlFor="name-input"
            className="password-label"
          >
            Seu Nome
            <input
              type="text"
              data-testid="input-player-name"
              placeholder="Nickname"
              name="playerName"
              id="name-input"
              value={ playerName }
              onChange={ this.handleChange }
            />

          </label>
          <label
            htmlFor="email-input"
          >
            Seu e-mail
            <input
              type="email"
              data-testid="input-gravatar-email"
              placeholder="exemplo@provedor.com"
              name="email"
              id="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.clickSettings }
          >
            Configurações
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  gravatarImg: state.player.gravatarImg,
});

export default connect(mapStateToProps)(Login);
