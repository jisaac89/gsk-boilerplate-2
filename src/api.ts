import {requests} from './request';

let Doctor  = (email, password)  =>{
  return {
    email : email,
    password: password
  } 
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/loginhcp', Doctor(email, password)),
  register: (email, password) =>
    requests.put('/doctor/'+email, Doctor(email, password)),
  save: (email, user) =>
    requests.put('/patients/'+email, user)
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