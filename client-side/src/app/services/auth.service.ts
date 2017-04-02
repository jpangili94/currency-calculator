import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	authToken: any; //type is any
	user: any;

  constructor(private http:Http) { } // inject Http into constructor

  // Connects Backend api to make post req to register
  registerUser(user){
  	// Set Headers
  	let headers = new Headers();
  	// Content-Type
  	headers.append('Conent-Type', 'application/JSON');
  	// Return observable with response
  	return this.http.post('http://localhost:8005/users/register', user, {headers: headers})
  		.map(res => res.json());
  }
}
