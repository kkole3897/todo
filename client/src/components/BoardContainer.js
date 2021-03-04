import Board from './Board';

function BoardContainer() {
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

    getInitialBoards().then(boards => {
      boards.map(board => {
        $boardContainer.appendChild(Board({ title: board.name }));
      });
    });

    return $boardContainer;
  }

  return render();
}

export default BoardContainer;
