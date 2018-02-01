import * as superagentPromise from 'superagent-promise';
import {_superagent} from 'superagent';
import {appStore} from './stores/AppStore';
import {authStore} from './stores/AuthStore';

let global : any;

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://ec2-34-226-168-251.compute-1.amazonaws.com:3000/api/cloud.aperio.viiv.';

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

const requests = {
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
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (email, password) =>
    requests.post('/users', { user: { email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Prescriptions = {
  all: () =>
    requests.get(`Prescriptions`)
};

const Patients = {
  all: () =>
    requests.get(`Patients`)
};

export default {
  Auth,
  Patients,
  Prescriptions
};