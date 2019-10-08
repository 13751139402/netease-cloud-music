/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-23 09:47:47
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 13:05:21
 */
import http from 'axios'

export default {
    selectMusic({ commit, state }, id) {
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
                artists: detail.ar,
                isLike: state.likeArr.indexOf(id)!==-1
            }
            commit("musicId", data.id);
            commit("upDatePlay", data);
        })
    },
    selectLikeMuisc({ commit, state }) {
        http
            .get(`/likelist?uid=32953014?id=${state.userData.userId}`)
            .then(({ data }) => {
                commit('likeArr', data.ids);
            })
            .catch(error => {
                throw error(error)
            });
    }
}