import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Users {
  constructor(data) {
    this.data = data;
    this.USER_SERVICE = 'users';
  }

  async save(todo){
    if(todo){
      let serverResponse = await this.data.post(user, this.TODO_SERVICE);
      return serverResponse;
    }
  }

  async save(user){
    if(user){
      let serverResponse = await this.data.post(user, this.USER_SERVICE);
      return serverResponse;
    }
  }
}
