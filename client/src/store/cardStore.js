import { createStore } from '../lib/todox';

const ACTION_INIT_CARDS = 'ACTION_INIT_CARDS';
const ACTION_ADD_CARDS = 'ACTION_ADD_CARDS';
const ACTION_ADD_CARD = 'ACTION_ADD_CARD';

function reducer(state = {}, { type, payload }) {
  switch (type) {
    case ACTION_INIT_CARDS:
      return {
        ...state,
        cards: [...payload.cards],
      };
    case ACTION_ADD_CARDS:
      return {
        ...state,
        cards: [...state.cards, ...payload.cards],
      };
    case ACTION_ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, payload.card],
      };
    default:
      return {
        ...state,
      };
  }
}

const cardStore = createStore({ initialState: { cards: [] }, reducer });

export default cardStore;
