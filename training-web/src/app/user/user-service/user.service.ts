import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  private FIRST_NAME_FOR_ALL_USERS: String = 'first-name';
  private userUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + "/" + user.id);
  }

  public createUser(user) {
    return this.http.post<User>(this.userUrl, user);
  }

  getAllUsersFirstName() {
    return this.http.get<Array<String>>(this.userUrl + '/' + this.FIRST_NAME_FOR_ALL_USERS)
  }

}
