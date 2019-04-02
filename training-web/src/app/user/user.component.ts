import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../models/user.model';
import {UserService} from './user.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit, OnDestroy {

  users: User[];
  userFirstNameFromList: Array<String> = new Array<String>();
  userFirstNameFromBackEnd: Array<String>;
  usersFirstName: Array<String>;

  usersSubscription: Subscription;
  deleteSubscription: Subscription;
  usersFirstNameSubscription: Subscription;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
    this.getAllUsersFirstNameFromBE();
  };

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
    this.usersFirstNameSubscription.unsubscribe();
  }

  public deleteUser(user: User): void {
    this.deleteSubscription = this.userService.deleteUser(user)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  private getUsers() {
    this.usersSubscription = this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.getAllUsersFirstNameFromFE(data);
    });
  }

  private getAllUsersFirstNameFromBE() {
    this.usersFirstNameSubscription = this.userService.getAllUsersFirstName().subscribe(usersFirstName => {
      this.usersFirstName = usersFirstName;
    });
  }

  private getAllUsersFirstNameFromFE(usersList: User[]) {
    usersList.forEach(user => {
      this.userFirstNameFromList.push(user.firstName);
    })
  }
}


