import Model from '@/model/model';

class Like extends Model {
    constructor() {
        super();
        this.collection = "like";
    }
    get(videoId) {
        this.updateUser();
        return this.db
            .collection(this.collection)
            .where("videoId", "==", videoId)
            .where("userId", "==", this.uid)
            .get()
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }
    set(videoId) {
        this.updateUser();
        return this.db
            .collection(this.collection)
            .doc()
            .set({
                videoId: videoId,
                userId: this.uid,
                createdAt: new Date(),
            })
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    }

}

export default new Like();
