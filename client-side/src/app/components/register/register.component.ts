import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

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

  constructor(private validateService: ValidateService) { }
 
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
      console.log("Please fill in all fields");
      return false;
    }

    // Required Email for Registration
    if (!this.validateService.validateEmail(user.email)) {
      console.log("Please use a valid email");
      return false;
    }
  }

}
