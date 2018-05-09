import { routerRedux } from 'dva/router';
import { accountLogin } from '../services/auth';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import token from '../utils/token';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'saveLoginStatus',
        payload: response,
      });

      token.save(response.data.token);

      // Login successfully
      if (response.errno === 0) {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        token.remove();

        // // get location pathname
        // const urlParams = new URL(window.location.href);
        // console.log(urlParams);
        // const pathname = yield select(state => state.routing.location.pathname);
        // console.log(pathname);
        // // add the parameters in the url
        // urlParams.searchParams.set('redirect', pathname);
        // console.log(urlParams);
        // window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    saveLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      setAuthority('admin');
      return {
        ...state,
        status: payload.errno === 0 ? 'ok' : 'error',
        token: payload.data.token,
        user: payload.data.userInfo,
      };
    },
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      setAuthority('admin');
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
