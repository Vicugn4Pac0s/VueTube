import { firestore } from '@/firebase/firebase';
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
            .catch((err) => {
                console.log("Error getting documents", err);
            });
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
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }
}

export default new Comment();
