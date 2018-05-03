import lodash from 'lodash';
import { queryApplicationForm } from '../services/api';

export default {
  namespace: 'marketing',

  state: {
    applicationForm: {
      applicationFormArray: [],
    },
  },

  effects: {
    *fetchApplicationForm(_, { call, put }) {
      const response = yield call(queryApplicationForm);
      yield put({
        type: 'saveApplicationForm',
        payload: response,
      });
    },
  },

  reducers: {
    saveApplicationForm(state, action) {
      return {
        ...state,
        applicationForm: action.payload,
      };
    },
  },
};
