import http from 'axios'

export default {
    selectMusic({ commit }, data) {
        http
            .get(`/song/url?id=${data.id}`)
            .then(response => {
                data.music=response.data.data[0].url;
                data.type=0
                commit('upDatePlay', data);
            })
            .catch(error => {
                throw error(error)
            });
    },
    
}