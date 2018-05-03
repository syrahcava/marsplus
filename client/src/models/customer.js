import lodash from 'lodash';
import { queryCustomerList } from '../services/api';

export default {
  namespace: 'customer',

  state: {
    customerList: {
      customerArray: [],
    },
  },

  effects: {
    *fetchCustomerList(_, { call, put }) {
      const response = yield call(queryCustomerList);
      yield put({
        type: 'saveCustomerList',
        payload: response,
      });
    },
  },

  reducers: {
    saveCustomerList(state, action) {
      return {
        ...state,
        customerList: action.payload,
      };
    },
  },
};
