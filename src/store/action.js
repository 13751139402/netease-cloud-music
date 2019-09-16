import http from 'axios'

export default {
    selectMusic({ commit }, id) {
        let musicUrl = () => {
            return http
                .get(`/song/url?id=${id}`)
                .then(response => {
                    return response.data.data[0].url;
                })
                .catch(error => {
                    throw error(error)
                });
        }
        let musicDetail = () => {
            return http
                .get(`/song/detail?ids=${id}`)
                .then(response => {
                    return response.data.songs[0];
                })
                .catch(error => {
                    throw error(error)
                });
        }
        http.all([musicUrl(), musicDetail()]).then(([url, detail]) => {
            let data = {
                id: id,
                music: url,
                name: detail.name,
                pic: detail.al.picUrl,
                type: 0,
                artists:detail.ar,
            }
            commit("upDatePlay", data);
        })
    },

}