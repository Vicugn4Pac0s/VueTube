import firestore from '@/firebase/firestore';
import firebaseAuth from "@/firebase/firebaseAuth";
import Model from '@/model/model';

class Comment extends Model {
    constructor() {
        super();
        this.collection = "comment";
    }
    get(videoId) {
        this.updateUser();
        return this.db
            .collection(this.collection)
            .where("videoId", "==", videoId)
            .where("userId", "==", this.uid)
            .orderBy("updatedAt", "desc")
            .get()
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }
    set(videoId, comment) {
        this.updateUser();
        return this.db
            .collection(this.collection)
            .doc()
            .set({
                videoId: videoId,
                comment: comment,
                userId: this.uid,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }
}

export default new Comment();
