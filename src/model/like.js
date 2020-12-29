import firestore from '@/firebase/firestore';
import Model from '@/model/model';

class Like extends Model {
    constructor() {
        super();
        this.collection = "like";
    }
    get(videoId) {
        return firestore
            .collection(this.collection)
            .where("videoId", "==", videoId)
            .get()
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }
    set(videoId) {
        return firestore
            .collection(this.collection)
            .doc()
            .set({
                videoId: videoId,
                createdAt: new Date(),
            })
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }

}

export default new Like();
