import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users$!: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  constructor() {
  }

  getUsers(): Observable<any[]>{
    const itemCollection = collection(this.firestore, 'users');
    return this.users$ = collectionData(itemCollection, { idField: 'firebaseId' });
  }
  async getUserData(uId: string) {
    try {
      const docRef = doc(this.firestore, 'users', uId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error getting document:", error);
      return null;
    }
  }
  async addUser(uId:string ,email:string, password:string,name:string,lastname:string) {
    await setDoc(doc(this.firestore,'users',uId), {
      userType:'user',
      email:email,
      name:name,
      lastname:lastname,
      isCurrentVoteUsed:false,
      pastVotes:[],
    });
  }
  async updateUser(id:string, data:any) {
    await updateDoc(doc(this.firestore, 'users', id), data);
  }
}
