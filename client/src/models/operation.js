import lodash from 'lodash';
import { queryOperationOverview } from '../services/api';

export default {
  namespace: 'operation',

  state: {
    overview: {
      salesVolume: [],
      classRatio: [],
      channelRatio: [],
    },
  },

  effects: {
    *fetchOverview(_, { call, put }) {
      const response = yield call(queryOperationOverview);
      if (response) {
        yield put({
          type: 'saveOverview',
          payload: response,
        });
      }
    },
  },

  reducers: {
    saveOverview(state, action) {
      return {
        ...state,
        overview: action.payload,
      };
    },
  },
};
