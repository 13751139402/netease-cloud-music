export default {
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
    }
}