let timeCompute = function (time) {
    let count = Math.round(time);
    let minute = `${Math.floor(count / 60)}`.padStart(2, 0);
    let second = `${Math.floor(count % 60)}`.padStart(2, 0);
    return `${minute}:${second}`;
}
export default {
    duration(state){
        return timeCompute(state.audio.duration)
    },
    currentTime(state){
        return timeCompute(state.audio.currentTime)
    }
}