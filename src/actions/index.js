export const SAVE_USER = 'SAVE_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: user,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});
