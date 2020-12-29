import firestore from '@/firebase/firestore';

class Comment {
    constructor() {
        this.collection = "comment";
    }
    get(videoId) {
        return firestore
            .collection(this.collection)
            .where("videoId", "==", videoId)
            .orderBy("updatedAt", "desc")
            .get()
    }
    getAll() {
        return firestore
            .collection(this.collection)
            .orderBy("createdAt", "desc")
            .get()        
    }
    set(videoId, comment) {
        return firestore
            .collection(this.collection)
            .doc()
            .set({
                videoId: videoId,
                comment: comment,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
    }
    delete(commentId) {
        return firestore
            .collection(this.collection)
            .doc(commentId)
            .delete();
    }
}

export default new Comment();
