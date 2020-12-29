import firestore from '@/firebase/firestore';

class Like {
    constructor() {
        this.collection = "like";
    }
    get(videoId) {
        return firestore
            .collection(this.collection)
            .where("videoId", "==", videoId)
            .get()
    }
    set(videoId) {
        return firestore
            .collection(this.collection)
            .doc()
            .set({
                videoId: videoId,
                createdAt: new Date(),
            })
    }
    delete(likeId) {
        return firestore
            .collection(this.collection)
            .doc(likeId)
            .delete();
    }
}

export default new Like();
