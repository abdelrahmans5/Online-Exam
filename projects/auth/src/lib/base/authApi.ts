import { Observable } from "rxjs";
import { confirmEmailVerification } from "../interfaces/confirmEmailVerification";
import { emailVerification } from "../interfaces/emailVerification";
import { forgotPassword } from "../interfaces/forgotPassword";
import { Login, LoginResponse } from "../interfaces/login";
import { register } from "../interfaces/register";
import { resetPassword } from "../interfaces/resetPassword";


export abstract class AuthAPI {
    abstract emailVerification(data: emailVerification): Observable<any>;
    abstract confirmEmailVerification(data: confirmEmailVerification): Observable<any>;
    abstract register(data: register): Observable<LoginResponse>;
    abstract login(data: Login): Observable<LoginResponse>;
    abstract forgotPassword(data: forgotPassword): Observable<any>;
    abstract resetPassword(data: resetPassword): Observable<any>;
}