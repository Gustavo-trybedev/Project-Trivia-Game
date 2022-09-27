import { USER_LOGGED, REFRESH_SCORE, EMPTY_STORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarImg: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGGED:
    return {
      ...state,
      name: action.infoUser.playerName,
      gravatarEmail: action.infoUser.email,
      gravatarImg: action.infoUser.gravatarImg,
    };
  case REFRESH_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  case EMPTY_STORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default player;
