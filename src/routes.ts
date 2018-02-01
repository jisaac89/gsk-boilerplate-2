import {requests} from './request';

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