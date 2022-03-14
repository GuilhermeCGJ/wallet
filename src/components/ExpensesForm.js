import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions';
import fetchApi from './fetchApi';

class ExpensesForm extends React.Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
    exchangeRates: {},
  }

  async componentDidMount() {
    const exchangeRates = await fetchApi();
    this.setState({ exchangeRates });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { expenses } = this.props;
    this.setState({ exchangeRates: await fetchApi() });
    expenses(this.state);
    this.setState((prevState) => ({ id: prevState.id + 1, value: 0, description: '' }));
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {Object.keys(exchangeRates)
                .filter((item) => item !== 'USDT')
                .map((option, index) => (
                  <option
                    value={ option }
                    key={ index }
                  >
                    {option}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

ExpensesForm.propTypes = {
  expenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  expenses: (expense) => dispatch(addExpense(expense)),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);
