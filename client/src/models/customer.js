import lodash from 'lodash';
import {
  queryCustomerOverview,
  queryCustomerOverviewMap,
  queryCustomerList,
} from '../services/api';

export default {
  namespace: 'customer',

  state: {
    customerList: {
      customerArray: [],
    },
    overview: {
      ageRatio: [],
      genderRatio: [],
      tagRatio: [],
      areaRatio: [],
    },
    overviewMap: {
      features: [],
    },
  },

  effects: {
    *fetchOverview(_, { call, put }) {
      const response = yield call(queryCustomerOverview);
      yield put({
        type: 'saveOverview',
        payload: response,
      });
    },
    *fetchOverviewMap(_, { call, put }) {
      const response = yield call(queryCustomerOverviewMap);
      yield put({
        type: 'saveOverviewMap',
        payload: response,
      });
    },
    *fetchCustomerList(_, { call, put }) {
      const response = yield call(queryCustomerList);
      yield put({
        type: 'saveCustomerList',
        payload: response,
      });
    },
  },

  reducers: {
    saveOverview(state, action) {
      return {
        ...state,
        overview: action.payload,
      };
    },
    saveOverviewMap(state, action) {
      return {
        ...state,
        overviewMap: action.payload,
      };
    },
    saveCustomerList(state, action) {
      return {
        ...state,
        customerList: action.payload,
      };
    },
  },
};
