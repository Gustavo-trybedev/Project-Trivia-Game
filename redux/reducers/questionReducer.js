import { QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  code: '',
  results: [],
};

function questionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS_SUCCESS:
    return {
      ...state,
      code: action.questions.response_code,
      results: action.questions.results,
    };
  default:
    return state;
  }
}

export default questionReducer;
