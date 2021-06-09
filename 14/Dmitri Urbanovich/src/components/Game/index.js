import React from 'react';
import './styles.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: this.initializeCells(),
      isGameRunning: false,
    };

    setInterval(() => this.live(), 500);
  }

  static field = {
    columnsAmount: 80,
    rowsAmount: 20,
  };

  static cellState = {
    alive: true,
    dead: false,
  };

  initializeCells() {
    let cells = [];

    for (let columnIndex = 0; columnIndex < Game.field.columnsAmount; columnIndex++) {
      cells[columnIndex] = [];
      for (let rowIndex = 0; rowIndex < Game.field.rowsAmount; rowIndex++) {
        cells[columnIndex][rowIndex] = Game.cellState.dead;
      }
    }

    return cells;
  }

  live() {
    if (!this.state.isGameRunning) {
      return;
    }

    const newCells = [];

    for (let columnIndex = 0; columnIndex < Game.field.columnsAmount; columnIndex++) {
      newCells[columnIndex] = [];

      for (let rowIndex = 0; rowIndex < Game.field.rowsAmount; rowIndex++) {
        newCells[columnIndex][rowIndex] = this.computeNewCellState(columnIndex, rowIndex);
      }
    }

    this.setState({ cells: newCells });
  }

  render() {
    return (
      <div>
        <h1>Game</h1>
        {this.renderCells()}
        {this.renderStartGameButton()}
      </div>
    );
  }

  renderStartGameButton() {
    const buttonLabel = this.state.isGameRunning ? 'Stop' : 'Start';
    return (
      <button className='Game__startGameButton' onClick={() => this.handleToggleIsGameRunning()}>
        {buttonLabel}
      </button>
    );
  }

  renderCells() {
    return (
      <div className='Game__cells'>
        {this.state.cells.map((rows, columnIndex) => {
          return this.renderColumn(rows, columnIndex);
        })}
      </div>
    );
  }

  handleToggleCellState = (columnIndex, rowIndex) => {
    const newCellsState = this.state.cells;

    newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];

    this.setState({ state: newCellsState });
  };

  handleToggleIsGameRunning = () => {
    this.setState(prevState => ({ ...prevState, isGameRunning: !this.state.isGameRunning }));
  };

  renderColumn(rows, columnIndex) {
    return (
      <div className='Game__column' key={`column_${columnIndex}`}>
        {rows.map((cellState, rowIndex) => {
          const cellModifier = cellState === Game.cellState.dead ? 'dead' : 'alive';
          return (
            <div
              className={`Game__cell Game__cell--${cellModifier}`}
              key={`cell_${columnIndex}_${rowIndex}`}
              onClick={() => this.handleToggleCellState(columnIndex, rowIndex)}
            />
          );
        })}
      </div>
    );
  }

  computeNewCellState(columnIndex, rowIndex) {
    const aliveNeighboursAmont = this.computeAliveNeighbourAmount(columnIndex, rowIndex);
    const currentCellState = this.state.cells[columnIndex][rowIndex];

    if (currentCellState === Game.cellState.alive) {
      if (aliveNeighboursAmont < 2) {
        return Game.cellState.dead;
      } else if (aliveNeighboursAmont === 2 || aliveNeighboursAmont === 3) {
        return Game.cellState.alive;
      } else if (aliveNeighboursAmont > 3) {
        return Game.cellState.dead;
      }
    } else {
      if (aliveNeighboursAmont === 3) {
        return Game.cellState.alive;
      }
    }
    return Game.cellState.dead;
  }

  computeAliveNeighbourAmount(columnIndex, rowIndex) {
    let aliveNeighboursAmont = 0;

    const neighbourOffsets = [
      [-1, 0], // left
      [-1, 1], // top left
      [0, 1], // top
      [1, 1], // top right
      [1, 0], //right
      [1, -1], //bottom right
      [0, -1], // bottom
      [-1, -1], // bottom left
    ];

    for (const neighbourOffsetsKey in neighbourOffsets) {
      const [x, y] = neighbourOffsets[neighbourOffsetsKey];
      let newColumnOffset = columnIndex + x;
      let newRowOffset = rowIndex + y;

      if (newColumnOffset < 0 || newColumnOffset > Game.field.columnsAmount - 1) {
        continue;
      }
      if (newRowOffset < 0 || newRowOffset > Game.field.rowsAmount - 1) {
        continue;
      }

      const neighbourState = this.state.cells[newColumnOffset][newRowOffset];
      if (neighbourState === Game.cellState.alive) {
        aliveNeighboursAmont++;
      }
    }

    return aliveNeighboursAmont;
  }
}

export default Game;
