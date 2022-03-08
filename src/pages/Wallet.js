import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  state = {
    expenses: 0,
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.state;

    return (
      <div>
        <header data-testid="header-component">
          <h5 data-testid="email-field">
            { email }
          </h5>
          <h2>Trybe Wallet</h2>
          <h5 data-testid="total-field">{ expenses }</h5>
          <h5 data-testid="header-currency-field">BRL</h5>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email });

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
