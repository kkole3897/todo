import { createStore } from '../lib/todox';

const ACTION_INIT_CARDS = 'ACTION_INIT_CARDS';
const ACTION_ADD_CARDS = 'ACTION_ADD_CARDS';
const ACTION_ADD_CARD = 'ACTION_ADD_CARD';
const ACTION_UPDATE_DESCRIPTION = 'ACTION_UPDATE_DESCRIPTION';

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
        cards: [payload.card, ...state.cards],
      };
    case ACTION_UPDATE_DESCRIPTION:
      return {
        ...state,
        cards: updateDescription(state.cards, {
          id: payload.id,
          description: payload.description,
        }),
      };
    default:
      return {
        ...state,
      };
  }
}

function updateDescription(cards, { id, description }) {
  return cards.map(card => {
    if (card.id === id) {
      card.description = description;
    }
    return card;
  });
}

const cardStore = createStore({ initialState: { cards: [] }, reducer });

export default cardStore;
