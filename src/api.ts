import {requests} from './connections/request';
import {hyperledger_requests} from './connections/hyperledger_request';
import { IPrescription } from './interfaces/data/IPrescription';

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
    hyperledger_requests.get(`Prescription`),
  create: (prescription) => 
    hyperledger_requests.post(`Prescription`, prescription),
  delete: (prescriptionuuid : string) => 
    hyperledger_requests.del(`Prescription/`+ prescriptionuuid)
};

const Patients = {
  all: () =>
    hyperledger_requests.get(`Patient`)
};

const All = {
  history: () =>
    hyperledger_requests.getHistory()
};

export default {
  All,
  Auth,
  Patients,
  Prescriptions
};