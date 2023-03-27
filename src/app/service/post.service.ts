import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import * as firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private fs: AngularFirestore) {}

  loadFeatured() {
    return this.fs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadLatest() {
    return this.fs
      .collection('posts', (ref) => ref.orderBy('createdAt'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            // console.log(data);
            return { id, data };
          });
        })
      );
  }

  loadCategoryPost(categoryId:string) {
    return this.fs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadSingleData(postId:string){
    return this.fs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilar(catId:string){
    return this.fs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', catId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  countViews(id:string){
    const viewCount = {
      view : firebase.default.firestore.FieldValue.increment(1)
    }

    this.fs.doc(`posts/${id}`).update(viewCount).then(()=>{
      console.log('view updated');

    })
  }
}
