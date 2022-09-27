import getTokenApi from '../../services/api';

export const USER_LOGGED = 'USER_LOGGED';
export const LOADING = 'LOADING';
export const TOKEN_SUCESS = 'TOKEN_SUCESS';
export const TOKEN_FAIL = 'TOKEN_FAIL';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';
export const REFRESH_SCORE = 'REFRESH_SCORE';
export const EMPTY_STORE = 'EMPTY_STORE';

export function logUser(infoUser) {
  return {
    type: USER_LOGGED,
    infoUser,
  };
}

export const emptyStore = () => ({
  type: EMPTY_STORE,
});

const loading = () => ({
  type: LOADING,
});

const getTokenSucess = (token) => ({
  type: TOKEN_SUCESS,
  token,
});

const getTokenFail = (error) => ({
  type: TOKEN_FAIL,
  error,
});

const getQuestionSuccess = (questions) => ({
  type: QUESTIONS_SUCCESS,
  questions,
});

export const fetchTokenAndQuestions = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await getTokenApi();
    const { token } = response;
    console.log(`token: ${token}`);
    dispatch(getTokenSucess(token));
    localStorage.setItem('token', token);
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await fetchQuestions.json();
    console.log(json);
    dispatch(getQuestionSuccess(json));
  } catch (error) {
    dispatch(getTokenFail(error));
  }
};

export const refreshScore = (gameScore, gameAssertions) => ({
  type: REFRESH_SCORE,
  score: gameScore,
  assertions: gameAssertions,
});
