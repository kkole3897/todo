import { createStore } from '../lib/todox';

const ACTION_INIT_BOARDS = 'ACTION_INIT_BOARDS';
const ACTION_ADD_BOARD = 'ACTION_ADD_BOARD';
const ACTION_UPDATE_NAME = 'ACTION_UPDATE_NAME';

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
    case ACTION_UPDATE_NAME:
      return {
        ...state,
        boards: updateName(state.boards, {
          id: payload.id,
          name: payload.name,
        }),
      };
    default:
      return {
        ...state,
      };
  }
}

function updateName(boards, { id, name }) {
  return boards.map(board => {
    if (board.id === id) {
      board.name = name;
    }
    return board;
  });
}

const boardStore = createStore({ initialState: { boards: [] }, reducer });

export default boardStore;
