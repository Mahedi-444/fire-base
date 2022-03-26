import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
   
  constructor(public fireservice:AngularFirestore) { }

  create_Newemployee(Record:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fireservice.collection('Employee').add(Record).then((info)=>{
        resolve(info);
        console.log(info);
        
      }).catch((err)=>{
        reject(err)
        console.log(err);
        
      })

    })   
}

}
