import firestore from '@/firebase/firestore';
import firebaseAuth from "@/firebase/firebaseAuth";

export default class Model {
    constructor() {
        this.db = firestore;
        this.auth = firebaseAuth;
        this.collection;

        this.user = null;
        this.uid = null;
    }
    updateUser() {
        this.user = this.auth.getUser();
        this.uid = this.user.uid;
    }
    get() {}
    getAll() {
        this.updateUser();
        return this.db
            .collection(this.collection)
            .where("userId", "==", this.uid)
            .orderBy("createdAt", "desc")
            .get()
            .catch((err) => {
                console.log("Error getting documents", err);
            });        
    }
    set() {}
    delete(id) {
        return this.db
            .collection(this.collection)
            .doc(id)
            .delete()
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }
}