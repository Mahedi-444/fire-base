import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';

import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

var config = {
    apiKey: "AIzaSyA3MuqQ0gfoOIBVRnfq2lZB5QhV3o09Roc",
    authDomain: "fir-crud-80515.firebaseapp.com",
    projectId: "fir-crud-80515",
    storageBucket: "fir-crud-80515.appspot.com",
    messagingSenderId: "1013098944853",
    appId: "1:1013098944853:web:cc5927af731be1499577dc",
    measurementId: "G-WQC6H3L28X"
  }
  
export class phoneNumber{
  country='';
  mobilenumber='';
  

  get e164(){
    const num = this.country + this.mobilenumber 
    return `+${num}`
  } 
}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {
appverifier:any

 

  windowRef:any;

  phoneNumber = new phoneNumber()

  verificationCode='';

  user:any;
  

  constructor(private win:WindowService,private router:Router) { }

  ngOnInit(): void {

    firebase.initializeApp(config)


    setTimeout(() => {
      this.windowRef = this.win.windowRef
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier
      ('recaptcha-container')
        this.appverifier = this.windowRef.recaptchaVerifier
   console.log(this.windowRef.recaptchaVerifier);
   
      this.windowRef.recaptchaVerifier.render()
    }, 1500);


  }

  sendLoginCode(){
    let appVerifier = this.appverifier;
    console.log(appVerifier);
    

    const phonenum = this.phoneNumber.country + this.phoneNumber.mobilenumber 
    console.log(phonenum);
    


  firebase.auth().signInWithPhoneNumber(phonenum, appVerifier)

          .then(result =>{
            this.windowRef.confirmationResult = result;
          }).catch(error => console.log(error));
  }
  
  verifyLoginCode(){  
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result:any) => {
                    this.user = result.user;
                    localStorage.setItem("seaways",JSON.stringify(result.user));
                   
                    this.router.navigate(['form']);
                   
                  }).catch((error:any) => console.log(error, "Incorrect code entered?"));

                       

  }


}

