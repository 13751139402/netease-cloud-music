export default {
    musicId(state, data) {
        state.musicId = data;
    },
    upDateUser(state, data) {
        state.userData = data;
    },
    upDatePlay(state, data) {
        state.playData = data;
    },
    changePlayType(state, type) {
        state.audio.type = type;
    },
    changePlayTime(state, time) {
        state.audio.time = time;
    },
    changePlaySkip(state, time) {
        state.audio.skip = time;
    },
    currentTime(state, time) {
        state.audio.currentTime = time;
    },
    duration(state, duration) {
        state.audio.duration = duration;
    },
    showRecord(state) {
        state.showRecord = !state.showRecord;
    },
    volume(state, volume) {
        state.audio.volume = volume;
    },
    playListId(state, id) {
        state.playListId = id;
    },
    commentData(state, data) {
        state.commentData = data;
    },
    playList(state, list) {
        state.playList = list;
    },

    //-------------- 播放列表
    playIndex(state, index) {
        state.playIndex = index;
    },
    playIndexNext(state) {
        if (state.playIndex < state.playList.length - 1) {
            state.playIndex += 1;
        } else {
            state.playIndex = 0;
        }
    },
    playIndexLast(state) {
        if (state.playIndex > 0) {
            state.playIndex -= 1;
        } else {
            state.playIndex = state.playList.length - 1;
        }
    },
    changePlayTypeIndex(state) {
        if (state.playTypeIndex + 1 >= 3) {
            state.playTypeIndex = 0;
        } else {
            state.playTypeIndex += 1;
        }
    },

    //-------------- voide
    videoId(state, id) {
        state.videoId = id;
    },


    //-------------- search
    keywords(state, value) {
        state.keywords = value;
    }
}