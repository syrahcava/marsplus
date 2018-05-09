import request from '../utils/request';

const baseURL = 'http://127.0.0.1:8360/admin';

export async function accountLogin(params) {
  return request(baseURL + '/auth/login', {
    method: 'POST',
    body: params,
  });
}
