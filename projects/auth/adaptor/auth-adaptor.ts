import { ProviderToken } from './../../../node_modules/injection-js/provider-token.d';
import { Login } from './../src/lib/interfaces/login';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthAdaptor {

  //adapt the response from the backend to the Login interface
  //you will make an interface from the res of backend andchange the type of data to that interface and then adapt it to the Login interface
  
}
