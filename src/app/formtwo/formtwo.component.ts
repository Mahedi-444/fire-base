import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formtwo',
  templateUrl: './formtwo.component.html',
  styleUrls: ['./formtwo.component.scss']
})
export class FormtwoComponent implements OnInit {
  employeedata:any
  getIdData:any
  queryParams: any;
  
  constructor(private firestore:AngularFirestore,private activatedRout: ActivatedRoute ,private router:Router) { }

  ngOnInit(): void {
    
    this.activatedRout.queryParams.subscribe((params: any) => {
      if (params && params.id) {
        this.queryParams =params.id;
        console.log( this.queryParams);
        this.getemployee()
      }
    });

  }

  getemployee(){
    this.firestore.collection("Employee")
    .doc(this.queryParams).get().subscribe((res)=>{
      this.getIdData = res.data()
      console.log(this.getIdData)
    });
  }

  delete(data:any) {
  console.log(data);

    this.firestore
    .collection("Employee")
    .doc(this.queryParams)
    .delete().then((res)=>{
      alert("Successfully deleted");
      console.log(res);
      this.getemployee()

    }).catch((err)=>{
      console.log(err);
      
    })
    
}

    edit(id:any){
      
      let navigationExtra: NavigationExtras = {
        queryParams: {
          id: id
        }
      };
      this.router.navigate(['form'], navigationExtra);
    };

    }



