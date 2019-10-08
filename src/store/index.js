/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-23 09:46:14
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 12:58:53
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    userData: false, // 用户数据
    playData: false, // palyer-播放数据
    musicId: false, // 音乐id
    playList: [], // 播放列表
    playIndex: 0, // 播放音乐在播放列表中的index
    playTypeIndex: 0, // 播放模式 0:列表循环 1:随机播放 2:单曲循环 3:心动模式

    audio: {
        type: false, // 播放状态 true:播放 Data
        time: false, // 音乐播放进度条
        skip: false, // 音乐播放进度条 跳转
        currentTime: 0, //当前播放时间
        duration: 0, // 音乐总时长
        volume: 0, // 音量
    },

    videoId: "", // 播放视频id

    showRecord: false, // 播放歌单是否显示
    scrollLyric: false, // 歌词页面的滚动条
    playListId: 2711160546, //当前歌单id
    commentData: {}, // 评论数据

    keywords: "",  //搜索关键字

    likeArr: [], // 喜欢音乐列表
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})