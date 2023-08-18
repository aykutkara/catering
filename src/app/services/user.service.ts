import {inject, Injectable} from '@angular/core';
import { doc, Firestore, getDoc, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firestore: Firestore = inject(Firestore);

  constructor() {
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
      postVotes:[],
    });
  }
}
