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

let referee = {
    // 返回一个节流函数，此函数的调用将会被delay限制
    throttle: (fun, delay) => {
        let last, deferTimer
        return function () {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            } else {
                last = now
                fun.apply(that, _args)
            }
        }
    },
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


export {storage,cookie,referee};