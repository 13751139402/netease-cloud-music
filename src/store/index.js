import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	userData: false,  // 用户数据
	playData: false,  //  播放数据
	audio: {
		type: false,  // 播放状态 true:播放 Data
		time: false,  // 音乐播放进度条
		skip: false,  // 音乐播放进度条 跳转
		currentTime: 0, //当前播放时间
		duration: 0, 	 // 音乐总时长
		volume: 0,  // 音量
	},
	showRecord: false, // 播放歌单是否显示
	scrollLyric: false, // 歌词页面的滚动条
	playListId: 766744781,   //当前歌单id
	commentData: {}     // 评论数据
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})