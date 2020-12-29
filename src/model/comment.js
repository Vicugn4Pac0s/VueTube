import firestore from '@/firebase/firestore';

class Comment {
    constructor() {
    }
    get(videoId) {
        return firestore
            .collection("comment")
            .where("videoId", "==", videoId)
            .orderBy("updatedAt", "desc")
            .get()
    }
    set(videoId, comment) {
        return firestore
            .collection("comment")
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
            .collection("comment")
            .doc(commentId)
            .delete();
    }
}

export default new Comment();
