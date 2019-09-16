// localStorage 设置
let storage = {
    get: function (key) {
        var value = localStorage.getItem(key);
        if (value) {
            try {
                var value_json = JSON.parse(value);
                if (typeof value_json === 'object') {
                    return value_json;
                } else if (typeof value_json === 'number') {
                    return value_json;
                }
            } catch (e) {
                return value;
            }
        } else {
            return false;
        }
    },
    set: function (key, value) {
        localStorage.setItem(key, value);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    },
    setList: function (data) {
        for (var i in data) {
            localStorage.setItem(i, data[i]);
        }
    },
    removeList: function (list) {
        for (var i = 0, len = list.length; i < len; i++) {
            localStorage.removeItem(list[i]);
        }
    }
};

// cookies设置
let cookie = {
    /**
     * 设置cookie
     * @param name cookie的名称
     * @param value cookie的值
     * @param day cookie的过期时间
     */
    setCookie: function (name, value, day) {
        if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
        } else {
            document.cookie = name + "=" + escape(value);
        }
    },
    /**
     * 获取对应名称的cookie
     * @param name cookie的名称
     * @returns {null} 不存在时，返回null
     */
    getCookie: function (name) {
        var arr = document.cookie.match(reg);
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr) {
            let data = unescape(arr[2]);
            if (data === "undefined") {
                return null;
            }
            return unescape(data);
        }
        else
            return null;
    },
}

// 函数节流
let referee = {
    // 返回一个节流函数，此函数的调用将会被delay限制
    throttle: (fun, delay) => {
        let last, defertimer;
        return function () {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(defertimer)
                defertimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            } else {
                last = now
                fun.apply(that, _args)
            }
        }
    },
    // 防抖
    debounce: (fun, delay) => {
        return function (args) {
            let that = this
            let _args = args
            clearTimeout(fun.id)
            fun.id = setTimeout(function () {
                fun.call(that, _args)
            }, delay)
        }
    }
}

// 当前时间转换
var Time = {
    //获取当前时间戳
    getUnix: function () {
        var date = new Date();
        return date.getTime();
    },

    //获取今天0点0分0秒的时间戳
    getTodayUnix: function () {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    //获取今年1月1日0点0秒的时间戳
    getYearUnix: function () {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取标准年月日
    getLastDate: function (time) {
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '年' + month + '月' + day + '日';
    },
    //获取标准月日
    getMonthDate: function (time) {
        var date = new Date(time);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return `${month}月${day}日`;
    },
    //转换时间
    getFormateTime: function (timestamp) {
        var now = this.getUnix();
        var today = this.getTodayUnix();
        //var year = this.getYearUnix();
        var timer = (now - timestamp) / 1000;
        var tip = '';

        if (timer <= 0) {
            tip = '刚刚';
        } else if (Math.floor(timer / 60) <= 0) {
            tip = '刚刚';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (timestamp - today >= 0)) {
            //tip = Math.floor(timer / 3600) + '小时前';
            let time = new Date(timestamp);
            tip = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
        } else if (timer / 86400 <= 31) {
            tip = Math.ceil(timer / 86400) + '天前';
        } else if (timer / 86400 <= 365) {
            tip = this.getMonthDate(timestamp);
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }

}

export { storage, cookie, referee, Time };