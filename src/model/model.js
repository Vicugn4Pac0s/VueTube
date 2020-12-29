import firestore from '@/firebase/firestore';

export default class Model {
    constructor() {
        this.collection;
    }
    get() {}
    getAll() {
        return firestore
            .collection(this.collection)
            .orderBy("createdAt", "desc")
            .get()
            .catch((err) => {
                console.log("Error getting documents", err);
            });        
    }
    set() {}
    delete(id) {
        return firestore
            .collection(this.collection)
            .doc(id)
            .delete()
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }
}