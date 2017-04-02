import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'; // Redirect router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: String;
	employeeId: String;
	email: String;
	password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }
 
  ngOnInit() { }

  onRegisterSubmit() {
  	const user = { 
  		name: this.name,
  		email: this.email,
  		employeeId: this.employeeId,
  		password: this.password
  	}

    // Required Fields for Registration
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please fill in all fields", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Required Email for Registration
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please use a valid email", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Register User - is an observable so I need to subscribe to it
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show("There are no mistakes, only happy accidents - Bob Ross. \nCongrats on registering!", {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate([ '/login' ]);
      } else {
        this.flashMessage.show("But it's a journey and the sad thing is you only learn from experience, so as much as someone can tell you things, you have to go out there and make your own mistakes in order to lear - Emma Watson. Re-register.", {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate([ '/register' ]);
      }
    });
  }

}
