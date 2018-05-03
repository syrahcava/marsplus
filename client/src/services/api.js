import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryChannels() {
  return request('/api/channels');
}

export async function queryOperationOverview() {
  return request('/api/operation/overview');
}

export async function queryAnalysisUser() {
  return request('/api/operation/analysis/user');
}

export async function queryAnalysisInteractive() {
  return request('/api/operation/analysis/interactive');
}

export async function queryAnalysisArticle() {
  return request('/api/operation/analysis/article');
}

export async function queryAnalysisQR() {
  return request('/api/operation/analysis/qr');
}

export async function queryAutoResponseKeyword() {
  return request('/api/operation/auto_res/keyword');
}

export async function queryManageQR() {
  return request('api/operation/manage_qr');
}

export async function queryManageTag() {
  return request('api/operation/manage_tag');
}

export async function queryManageMessage() {
  return request('api/operation/manage_message');
}

export async function queryManageMaterialArticle() {
  return request('api/operation/manage_material/article');
}

export async function queryManageMaterialPicture() {
  return request('api/operation/manage_material/picture');
}

export async function queryManageMaterialComposition() {
  return request('api/operation/manage_material/composition');
}

export async function queryApplicationForm() {
  return request('api/marketing/application_form');
}

export async function queryCustomerList() {
  return request('api/customer/list');
}
