import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveUser } from '../actions';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isButtonDisabled: true,
    redirect: false,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    this.validation();
  }

  handleClick = () => {
    const { login } = this.props;
    const { inputEmail } = this.state;
    login(inputEmail);
    this.setState(
      { redirect: true },
    );
  }

  validation = () => {
    const MIN_CHARACTERS = 5;
    const { inputEmail, inputPassword } = this.state;
    if (inputEmail.includes('@')
    && inputEmail.includes('.com')
    && inputPassword.length >= MIN_CHARACTERS) {
      this.setState(
        { isButtonDisabled: false },
      );
    } else {
      this.setState(
        { isButtonDisabled: true },
      );
    }
  }

  render() {
    const { inputEmail, inputPassword, isButtonDisabled, redirect } = this.state;
    return (
      <div>
        TRYBE
        {redirect && <Redirect to="/carteira" /> }
        <form>
          <input
            type="email"
            placeholder="E-Mail"
            name="inputEmail"
            value={ inputEmail }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            placeholder="Senha"
            name="inputPassword"
            value={ inputPassword }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(saveUser(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
