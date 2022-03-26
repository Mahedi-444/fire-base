import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CrudService } from '../service/crud.service';
import { ThisReceiver } from '@angular/compiler';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  colors: any
  hide = true;
  baseImage: any;
  loginForm: FormGroup
  queryParams: any;
  getIdData:any;
  editprofile=false;
  fileimage=''

  constructor(private firestore:AngularFirestore,private crudservice: CrudService, private router: Router, public formBuilder: FormBuilder,private activatedRout: ActivatedRoute, ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ["", ([Validators.required, Validators.email])],
      mobile: ["", ([Validators.required, Validators.minLength(10),Validators.maxLength(10)])],
      radio: [Validators.required],
      cricket: [false, Validators.required],
      football: [false, Validators.required],
      volleyball: [false, Validators.required],
      address: ['', Validators.required],
      file: [null, Validators.required],
      date: ['', Validators.required],
      color: ['', Validators.required],
      switch: [false, Validators.required],
    })
  }

  

  ngOnInit(): void {

    this.activatedRout.queryParams.subscribe((params: any) => {
      if (params && params.id) {
        this.queryParams =params.id;
        
        if(this.queryParams){

          this.editprofile = true;
          console.log(this.editprofile);
          
        }
        console.log( this.queryParams);
        this.getemployee()
      }
    });

  }
  
  getemployee(){
    this.firestore.collection("Employee")
    .doc(this.queryParams).get().subscribe((res:any)=>{
      this.getIdData = res.data()
      this.loginForm.patchValue({ 
        "username":this.getIdData.username,
        "password":this.getIdData.password,
        "email":this.getIdData.email,
        "mobile":this.getIdData.mobile,
        "radio":this.getIdData.radio,
        "cricket":this.getIdData.cricket,
        "football":this.getIdData.football,
        "volleyball":this.getIdData.volleyball,
        "address":this.getIdData.address,
        "file":this.getIdData.file,
        "date":this.getIdData.date,
        "color":this.getIdData.color,
        "switch":this.getIdData.switch,
      });
      console.log(this.getIdData);
      this.fileimage=this.getIdData.file
    });

  }

  onChange(ev: any) {

    const file = ev?.target.files[0];

    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((Subscriber: Subscriber<any>) => {
      this.readFile(file, Subscriber);
    });
    observable.subscribe((d) => {
      this.loginForm.patchValue({
        file: d,
      })
      this.fileimage=d;
      console.log(this.loginForm.value);
    })
  }


  readFile(file: File, Subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      Subscriber.next(filereader.result)
      Subscriber.complete();
    }
    filereader.onerror = (error) => {
      Subscriber.error(error);
      Subscriber.complete();

    }
  }

  update(){
    this.firestore.collection("Employee").doc(this.queryParams).set(this.loginForm.value).then((res)=>{
      console.log(res);

      let navigationExtra: NavigationExtras = {
        queryParams: {
          id: this.queryParams,
        }
      };
      this.router.navigate(['formtwo'],navigationExtra);

      
    }).catch((err)=>{
      console.log(err);
      

    })
    // this.crudservice.create_Newemployee(this.loginForm.value).then((response: any) => {
    //   console.log(response.id);
    //   localStorage.setItem('response.id', response.id);
    //   let navigationExtra: NavigationExtras = {
    //     queryParams: {
    //       id: response.id
    //     }
    //   };
    //   this.router.navigate(['formtwo'], navigationExtra);
    // });

  }

  fun() {
    console.log(this.editprofile);


    if(this.editprofile == false){
      this.crudservice.create_Newemployee(this.loginForm.value).then((response: any) => {
        console.log(response.id);
        localStorage.setItem('response.id', response.id);
        let navigationExtra: NavigationExtras = {
          queryParams: {
            id: response.id
          }
        };
        this.router.navigate(['formtwo'],navigationExtra);
      });
  
    }else{
      console.log(this.editprofile);
      this.update()
    }

   

  }

  //color picker start.
  onColorChange(colorcode: string) {
    this.loginForm.patchValue({ "color": colorcode });
  }
  //color picker end


  get username() {
    return this.loginForm.get('username')
  }
  get password() {
    return this.loginForm.get('password')
  }
  get email() {
    return this.loginForm.get('email')
  }
  get mobile() {
    return this.loginForm.get('mobile')
  }
  get radio() {
    return this.loginForm.get('radio')
  }
  get cricket() {
    return this.loginForm.get('cricket')
  }
  get football() {
    return this.loginForm.get('football')
  }
  get volleyball() {
    return this.loginForm.get('volleyball')
  }
  get address() {
    return this.loginForm.get('address')
  }
  get file() {
    return this.loginForm.get('file')
  }
  get date() {
    return this.loginForm.get('date')
  }
  get color() {
    return this.loginForm.get('color')
  }
  get switch() {
    return this.loginForm.get('switch')
  }

}
