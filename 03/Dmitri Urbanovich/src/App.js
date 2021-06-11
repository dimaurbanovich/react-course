import React from 'react';
import Form from './components/Form';
import Table from './components/Table';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
`;

class App extends React.Component {
  state = {
    value: [],
    row: {
      brand: '',
      model: '',
      year: '',
      price: '',
    },
  };

  handleClick = val => {
    this.setState(pervState => ({
      ...pervState,
      value: [...pervState.value, val],
    }));
  };

  handleRowClick = clickedRow => {
    this.setState(
      prevState => ({
        ...prevState,
        row: clickedRow,
      }),
      prevState => ({
        ...prevState,
        row: {
          firstname: '',
          lastname: '',
          phone: '',
        },
      })
    );
  };

  render() {
    return (
      <Wrapper>
        <Form onClick={this.handleClick} row={this.state.row} />
        <Table value={this.state.value} onRowClick={this.handleRowClick} />
      </Wrapper>
    );
  }
}

export default App;
