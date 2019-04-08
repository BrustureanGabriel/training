import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../models/user.model';
import {UserService} from './user-service/user.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit, OnDestroy {

  private users: User[];
  userFirstNameFromList: Array<String> = new Array<String>();
  usersFirstName: Array<String>;
  userSubscription: Subscription;
  deleteSubscription: Subscription;
  usersFirstNameSubscription: Subscription;

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.getUsers();
    this.getAllUsersFirstNameFromBE();
    // TODO: trigger call to BE
  };

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.usersFirstNameSubscription.unsubscribe();
  };

  public deleteUser(user: User): void {
    this.deleteSubscription = this.userService.deleteUser(user)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  private getUsers() {
    this.userSubscription = this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.getAllUsersFristNameFromFE(data);
    })
  };

  private getAllUsersFirstNameFromBE() {
    this.usersFirstNameSubscription = this.userService.getAllUsersFirstName()
      .subscribe(usersFirstName => {
        this.usersFirstName = usersFirstName;
      })
  }

  private getAllUsersFristNameFromFE(userList: User[]) {
    userList.forEach(user => {
      this.userFirstNameFromList.push(user.firstName);
    })
  }

  userSelected($event: Event) {
    console.log($event.target.value);
  }
}




