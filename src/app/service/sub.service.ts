import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private fs:AngularFirestore) { }

  addSub(data:any){
    this.fs.collection('subscribers').add(data).then(()=>{
      console.log('Success');

    })
  }

  checkSubs(subEmail:string){
    return this.fs.collection('subscribers',ref=> ref.where('email','==',subEmail)).get();
  }
}
