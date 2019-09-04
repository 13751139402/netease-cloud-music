import http from 'axios'

export default {
    selectPlayer({ commit }, data) {
        http
            .get(`/song/url?id=${data.id}`)
            .then(response => {
                data.music=response.data.data[0].url;
                commit('upDatePlay', data);
            })
            .catch(error => {
                throw error(error)
            });
    }
}