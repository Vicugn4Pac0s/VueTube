import firestore from '@/firebase/firestore';
import Model from '@/model/model';

class Comment extends Model {
    constructor() {
        super();
        this.collection = "comment";
    }
    get(videoId) {
        return firestore
            .collection(this.collection)
            .where("videoId", "==", videoId)
            .orderBy("updatedAt", "desc")
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
}

export default new Comment();
