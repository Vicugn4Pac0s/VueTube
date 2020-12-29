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
    }
    set() {}
    delete(id) {
        return firestore
            .collection(this.collection)
            .doc(id)
            .delete();
    }
}