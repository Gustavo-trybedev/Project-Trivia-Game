import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const {
      name,
      email,
      score,
      gravatarImg,
    } = this.props;

    return (
      <header>
        <span>{ email }</span>

        <img
          src={ `https://www.gravatar.com/avatar/${gravatarImg}` }
          alt="Perfil do Usuário"
          data-testid="header-profile-picture"
        />

        <span data-testid="header-player-name">
          { name }
        </span>

        <span data-testid="header-score">
          { score }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  gravatarImg: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  gravatarImg: state.player.gravatarImg,
});

export default connect(mapStateToProps)(Header);
