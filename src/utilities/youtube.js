import axios from "axios";

class Youtube {
    constructor() {
        this.key = "AIzaSyCsi0BGE6nKk0a14F5xZTkVqrGebmJ58Pc";
    }
    get(val) {
        let self = this;
        return axios
            .get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet",
                    id: val, // タグを取得したいYouTubeのvideoId
                    maxResults: 50,
                    key: self.key,
                }
            })
    }
    search(keyword) {
        let self = this;
        return axios
            .get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    q: keyword, // 検索クエリを指定します。
                    part: "snippet",
                    type: "video",
                    maxResults: "20", // 最大検索数
                    key: self.key,
                },
            })
    }
}

export default new Youtube();
