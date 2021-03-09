import { createStore } from '../lib/todox';

const ACTION_INIT_BOARDS = 'ACTION_INIT_BOARDS';
const ACTION_ADD_BOARD = 'ACTION_ADD_BOARD';

function reducer(state = {}, { type, payload }) {
  switch (type) {
    case ACTION_INIT_BOARDS:
      return {
        ...state,
        boards: [...payload.boards],
      };
    case ACTION_ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, payload.board],
      };
    default:
      return {
        ...state,
      };
  }
}

const boardStore = createStore({ initialState: { boards: [] }, reducer });

export default boardStore;
