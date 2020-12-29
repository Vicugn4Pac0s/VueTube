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

}

export default new Like();
