import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
   sumOfExpenses = () => {
     const { expenses } = this.props;

     const sumTotal = expenses?.reduce((acc, item) => {
       const { value, currency, exchangeRates } = item;

       acc += value * (exchangeRates[currency].ask);

       return acc;
     }, 0);

     return sumTotal.toFixed(2);
   }

   render() {
     const { user } = this.props;

     return (
       <header>
         <h4 data-testid="email-field">
           Email:
           {' '}
           {user}
         </h4>

         <h4 data-testid="total-field">
           Despesas Total:
           {' '}
           {this.sumOfExpenses()}
         </h4>

         <h4 data-testid="header-currency-field">
           BRL
         </h4>
       </header>
     );
   }
}

Header.defaultProps = {
  expenses: [],
};

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
