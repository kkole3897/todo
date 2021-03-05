import './BoardContainer.css';

import Board from './Board';
import AddBoardModal from './AddBoardModal';

function BoardContainer() {
  const clickCreateBoardHandler = async event => {
    event.preventDefault();
    const $boardContainer = event.target.closest('.board-container');
    const $addBoardButton = $boardContainer.querySelector(
      '.board-container__add-button',
    );
    const $addBoardModal = $boardContainer.querySelector('.add-board-modal');
    const $input = $addBoardModal.querySelector('.add-board-modal__text-input');

    const title = $input.value;

    try {
      const uri = '/api/boards';
      const body = {
        name: title,
      };
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      return;
    }

    $boardContainer.insertBefore(Board({ title }), $addBoardButton);

    $addBoardModal.remove();
  };
  const clickAddBoardButtonHandler = async event => {
    event.preventDefault();
    const $boardContainer = event.target.closest('.board-container');

    $boardContainer.appendChild(
      AddBoardModal({ onSubmit: clickCreateBoardHandler }),
    );
  };

  async function getInitialBoards() {
    const uri = '/api/boards';
    try {
      const response = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      const boards = data.data;
      return boards;
    } catch (err) {
      console.log(err.message);
    }
  }

  function render() {
    const $boardContainer = document.createElement('div');
    $boardContainer.className = 'board-container';

    const $addButton = document.createElement('button');
    $addButton.className = 'board-container__add-button';
    $addButton.innerText = 'Add Board';
    $addButton.addEventListener('click', clickAddBoardButtonHandler);

    $boardContainer.appendChild($addButton);
    getInitialBoards().then(boards => {
      boards.map(board => {
        $boardContainer.insertBefore(Board({ title: board.name }), $addButton);
      });
    });

    return $boardContainer;
  }

  return render();
}

export default BoardContainer;
