import React from 'react';
import './styles.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      formErrors: {
        name: '',
        email: '',
        password: '',
      },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let { nameValid, emailValid, passwordValid } = this.state;
    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 3 && value.length < 30;
        fieldValidationErrors.name = nameValid ? '' : 'Поле должно содержать больше 3 и менее 30 символов';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Некорректный формат email';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '' : 'Поле должно содержать больше 8 символов';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    const { nameValid, emailValid, passwordValid } = this.state;
    this.setState({ formValid: nameValid && emailValid && passwordValid });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(pervState => ({
      ...pervState,
      [name]: value,
    }));
    this.validateField(name, value);
  };

  render() {
    const { name, email, password, formErrors, formValid } = this.state;
    return (
      <>
        <form className='form'>
          <input value={name} name='name' placeholder='Name' onChange={this.handleChange} className={formErrors.name ? 'error' : ''} />
          <p className='textError'>{formErrors.name}</p>
          <input
            value={email}
            name='email'
            type='email'
            placeholder='Email'
            onChange={this.handleChange}
            className={formErrors.email ? 'error' : ''}
          />
          <p className='textError'>{formErrors.email}</p>
          <input
            value={password}
            name='password'
            type='password'
            placeholder='Password'
            onChange={this.handleChange}
            className={formErrors.password ? 'error' : ''}
          />
          <p className='textError'>{formErrors.password}</p>
          <button disabled={!formValid}>Send</button>
        </form>
      </>
    );
  }
}

export default Form;
