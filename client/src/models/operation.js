import lodash from 'lodash';
import {
  queryOperationOverview,
  queryAnalysisUser,
  queryAnalysisInteractive,
  queryAnalysisArticle,
  queryAnalysisQR,
  queryAutoResponseKeyword,
  queryManageQR,
  queryManageTag,
  queryManageMessage,
  queryManageMaterialArticle,
  queryManageMaterialPicture,
  queryManageMaterialComposition,
} from '../services/api';

export default {
  namespace: 'operation',

  state: {
    overview: {
      tags: [],
    },
    filter: {
      hotArticles: [],
      userNumbers: [{ x: 0, y: 0 }],
      messageNumbers: [{ x: 0, y: 0 }],
    },
    analysisUser: {},
    analysisUserFilter: {
      followCountArray: [{ x: 0, y: 0 }],
    },
    analysisInteractive: {},
    analysisInteractiveFilter: {
      userInter: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
      userInterType: [{ x: 0, y: 0 }],
      messageCountArray: [{ x: 0, y: 0 }],
      messageInfoType: [{ x: 0, y: 0 }],
      keywordTop: [{ x: 0, y: 0 }],
      menuTop: [{ x: 0, y: 0 }],
    },
    analysisArticle: {
      articleCountTop: [],
    },
    analysisArticleFilter: {
      totalCountArray: [{ x: 0, y: 0 }],
    },
    analysisQR: {
      qrArray: [],
    },
    autoResponseKeyword: {
      ruleArray: [],
    },
    manageQR: {
      qrArray: [],
    },
    manageTag: {
      tagArray: [],
    },
    manageMessage: {
      messageArray: [],
    },
    manageMaterialArticle: {
      articleArray: [],
    },
    manageMaterialPicture: {
      pictureArray: [],
    },
    manageMaterialComposition: {
      compositionArray: [],
    },
  },

  effects: {
    *fetchOverview(_, { call, put }) {
      const response = yield call(queryOperationOverview);
      yield put({
        type: 'saveOverview',
        payload: response,
      });
    },
    *filterUserNumberFetch({ payload }, { put }) {
      yield put({
        type: 'appendUserNumber',
        payload: payload,
      });
    },
    *filterMessageNumberFetch({ payload }, { put }) {
      yield put({
        type: 'appendMessageNumber',
        payload: payload,
      });
    },
    *fetchAnalysisUser(_, { call, put }) {
      const response = yield call(queryAnalysisUser);
      yield put({
        type: 'saveAnalysisUser',
        payload: response,
      });
    },
    *filterFollowFetch({ payload }, { put }) {
      yield put({
        type: 'appendFollow',
        payload: payload,
      });
    },
    *fetchAnalysisInteractive(_, { call, put }) {
      const response = yield call(queryAnalysisInteractive);
      yield put({
        type: 'saveAnalysisInteractive',
        payload: response,
      });
    },
    *filterInteractiveFetch({ payload }, { put }) {
      yield put({
        type: 'appendInteractive',
        payload: payload,
      });
    },
    *fetchAnalysisArticle(_, { call, put }) {
      const response = yield call(queryAnalysisArticle);
      yield put({
        type: 'saveAnalysisArticle',
        payload: response,
      });
    },
    *filterArticleFetch({ payload }, { put }) {
      yield put({
        type: 'appendArticle',
        payload: payload,
      });
    },
    *fetchAnalysisQR(_, { call, put }) {
      const response = yield call(queryAnalysisQR);
      yield put({
        type: 'saveAnalysisQR',
        payload: response,
      });
    },
    *fetchAutoResponseKeyword(_, { call, put }) {
      const response = yield call(queryAutoResponseKeyword);
      yield put({
        type: 'saveAutoResponseKeyword',
        payload: response,
      });
    },
    *fetchManageQR(_, { call, put }) {
      const response = yield call(queryManageQR);
      yield put({
        type: 'saveManageQR',
        payload: response,
      });
    },
    *fetchManageTag(_, { call, put }) {
      const response = yield call(queryManageTag);
      yield put({
        type: 'saveManageTag',
        payload: response,
      });
    },
    *fetchManageMessage(_, { call, put }) {
      const response = yield call(queryManageMessage);
      yield put({
        type: 'saveManageMessage',
        payload: response,
      });
    },
    *fetchManageMaterialArticle(_, { call, put }) {
      const response = yield call(queryManageMaterialArticle);
      yield put({
        type: 'saveManageMaterialArticle',
        payload: response,
      });
    },
    *fetchManageMaterialPicture(_, { call, put }) {
      const response = yield call(queryManageMaterialPicture);
      yield put({
        type: 'saveManageMaterialPicture',
        payload: response,
      });
    },
    *fetchManageMaterialComposition(_, { call, put }) {
      const response = yield call(queryManageMaterialComposition);
      yield put({
        type: 'saveManageMaterialComposition',
        payload: response,
      });
    },
  },

  reducers: {
    saveOverview(state, action) {
      return {
        ...state,
        overview: action.payload,
        filter: {
          ...state.filter,
          hotArticles: lodash.slice(action.payload.hotArticles, 0, 5),
          userNumbers: lodash.slice(action.payload.userNumbers, 0, 7),
          messageNumbers: lodash.slice(action.payload.messageNumbers, 0, 7),
        },
      };
    },
    appendUserNumber(state, action) {
      return {
        ...state,
        filter: {
          ...state.filter,
          userNumbers: lodash.slice(state.overview.userNumbers, 0, action.payload.count),
        },
      };
    },
    appendMessageNumber(state, action) {
      return {
        ...state,
        filter: {
          ...state.filter,
          messageNumbers: lodash.slice(state.overview.messageNumbers, 0, action.payload.count),
        },
      };
    },
    saveAnalysisUser(state, action) {
      return {
        ...state,
        analysisUser: action.payload,
        analysisUserFilter: {
          ...state.analysisUserFilter,
          followCountArray: lodash.slice(action.payload.followCountArray, 0, 7),
        },
      };
    },
    appendFollow(state, action) {
      return {
        ...state,
        analysisUserFilter: {
          ...state.analysisUserFilter,
          followCountArray: lodash.slice(
            state.analysisUser.followCountArray,
            0,
            action.payload.count
          ),
        },
      };
    },
    saveAnalysisInteractive(state, action) {
      return {
        ...state,
        analysisInteractive: action.payload,
        analysisInteractiveFilter: {
          ...state.analysisInteractiveFilter,
          userInter: action.payload.userInter['7'],
          userInterType: action.payload.userInterType['7'],
          messageInfoType: action.payload.messageInfoType['7'],
          keywordTop: action.payload.keywordTop['7'],
          menuTop: action.payload.menuTop['7'],
          messageCountArray: lodash.slice(action.payload.messageCountArray, 0, 7),
        },
      };
    },
    appendInteractive(state, action) {
      return {
        ...state,
        analysisInteractiveFilter: {
          ...state.analysisInteractiveFilter,
          userInter: state.analysisInteractive.userInter[action.payload.count],
          userInterType: state.analysisInteractive.userInterType[action.payload.count],
          messageInfoType: state.analysisInteractive.messageInfoType[action.payload.count],
          keywordTop: state.analysisInteractive.keywordTop[action.payload.count],
          menuTop: state.analysisInteractive.menuTop[action.payload.count],
          messageCountArray: lodash.slice(
            state.analysisInteractive.messageCountArray,
            0,
            action.payload.count
          ),
        },
      };
    },
    saveAnalysisArticle(state, action) {
      return {
        ...state,
        analysisArticle: action.payload,
        analysisArticleFilter: {
          ...state.analysisArticleFilter,
          totalCountArray: lodash.slice(action.payload.totalCountArray, 0, 7),
        },
      };
    },
    appendArticle(state, action) {
      return {
        ...state,
        analysisArticleFilter: {
          ...state.analysisArticleFilter,
          totalCountArray: lodash.slice(
            state.analysisArticle.totalCountArray,
            0,
            action.payload.count
          ),
        },
      };
    },
    saveAnalysisQR(state, action) {
      return {
        ...state,
        analysisQR: action.payload,
      };
    },
    saveAutoResponseKeyword(state, action) {
      return {
        ...state,
        autoResponseKeyword: action.payload,
      };
    },
    saveManageQR(state, action) {
      return {
        ...state,
        manageQR: action.payload,
      };
    },
    saveManageTag(state, action) {
      return {
        ...state,
        manageTag: action.payload,
      };
    },
    saveManageMessage(state, action) {
      return {
        ...state,
        manageMessage: action.payload,
      };
    },
    saveManageMaterialArticle(state, action) {
      return {
        ...state,
        manageMaterialArticle: action.payload,
      };
    },
    saveManageMaterialPicture(state, action) {
      return {
        ...state,
        manageMaterialPicture: action.payload,
      };
    },
    saveManageMaterialComposition(state, action) {
      return {
        ...state,
        manageMaterialComposition: action.payload,
      };
    },
  },
};
