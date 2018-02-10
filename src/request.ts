import * as superagentPromise from 'superagent-promise';
import * as _superagent from 'superagent';
import {appStore} from './stores/AppStore';
import {authStore} from './stores/AuthStore';

let global : any;

const superagent = superagentPromise(_superagent, Promise);

const API_ROOT = 'http://ec2-35-169-99-210.compute-1.amazonaws.com:5984/';

const encode = encodeURIComponent;

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.signout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (appStore.token) {
    req.set('authorization', `Token ${appStore.token}`);
  }
};

export const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .withCredentials()
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
};