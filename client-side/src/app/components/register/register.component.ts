import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }
 
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
  }

}
