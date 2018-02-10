import { Component } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user: User = null;

  constructor(private userService: UserService) {
    this.userService.getUser().toPromise().then(user => {
      console.log(user);
    });
  }
}

class User {
  name: string;
  email: string;
  isStaff: boolean;
}
