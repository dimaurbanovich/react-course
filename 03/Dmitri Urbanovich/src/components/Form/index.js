import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 500px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    outline: none;
    width: 100%;
    background: #fff;
    margin-bottom: 3%;
    border: 1px solid #ccc;
    padding: 3%;
    color: #555;
  }
  button {
    margin-top: 2%;
    width: 30%;
    padding: 3%;
    background: #007bff;
    border: 1px solid #007bff;
    outline: none;
    color: #fff;
    :hover {
      cursor: pointer;
      background-color: #225fbf;
      transition-duration: 0.5s;
    }
  }
`;

class Form extends React.Component {
  state = {
    brand: '',
    model: '',
    year: '',
    price: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleClick = e => {
    e.preventDefault();
    const { brand, model, year, price } = this.state;

    if (!brand || !model || !year || !price) {
      alert('Все поля должны быть заполнены');
      return;
    }
    this.props.onClick(this.state);
    this.setState({
      brand: '',
      model: '',
      year: '',
      price: '',
    });
  };

  render() {
    const { brand, model, year, price } = this.state;
    const { row } = this.props;
    return (
      <StyledForm>
        <h1>Form</h1>
        <input value={brand || row.brand} name='brand' onChange={this.handleChange} />
        <input value={model || row.model} name='model' onChange={this.handleChange} />
        <input value={year || row.year} name='year' onChange={this.handleChange} />
        <input value={price || row.price} name='price' onChange={this.handleChange} />
        <button onClick={this.handleClick}>Добавить</button>
      </StyledForm>
    );
  }
}

export default Form;
