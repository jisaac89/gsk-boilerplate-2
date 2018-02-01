import { observable, action } from 'mobx';
import routes from '../routes';

class UserStore {

  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;

  @action pullUser() {
    this.loadingUser = true;
    return routes.Auth.current()
      .then(action(({ user }) => { this.currentUser = user; }))
      .finally(action(() => { this.loadingUser = false; }))
  }

  @action updateUser(newUser) {
    this.updatingUser = true;
    return routes.Auth.save(newUser)
      .then(action(({ user }) => { this.currentUser = user; }))
      .finally(action(() => { this.updatingUser = false; }))
  }

  @action forgetUser() {
    this.currentUser = undefined;
  }

}

export default new UserStore();