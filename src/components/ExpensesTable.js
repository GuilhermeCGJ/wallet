import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tr>
          {
            expenses.map((expense) => (
              <tbody key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ (expense.exchangeRates[expense.currency].name).split('/')[0] }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }

                </td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency]
                    .ask * expense.value).toFixed(2) }
                </td>
                <td>Real</td>
              </tbody>
            ))
          }
        </tr>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(ExpensesTable);
