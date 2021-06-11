import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 500px;
  border: 2px solid black;
  border-collapse: collapse;
  color: black;
  margin-top: 15px;

  th,
  td {
    border: 2px solid black;
    text-align: center;
    :hover {
      cursor: pointer;
    }
  }
`;

class Table extends React.Component {
  handleClick = e => {
    const { value } = this.props;
    this.props.onRowClick(value[e.currentTarget.id]);
  };

  render() {
    const { value } = this.props;
    return (
      <StyledTable>
        <thead>
          <tr>
            <th>№</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {value.map((item, i) => {
            return (
              <tr key={i} id={i} onClick={this.handleClick}>
                <td>{i + 1}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.year}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    );
  }
}

export default Table;
