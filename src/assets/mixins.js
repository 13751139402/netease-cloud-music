/*
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-09-09 09:19:16
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-09-09 09:19:16
 */
import { Time } from './common'

var mixin = {
    directives: {
        time: {
            bind: function (el, binding) {
                el.innerHTML = Time.getFormateTime(binding.value);
                el.__timeout__ = setInterval(() => {
                    el.innerHTML = Time.getFormateTime(binding.value);
                }, 60000);
            },
            unbind: function (el) {
                clearInterval(el.__timeout__);
                delete el.__timeout__;
            }
        }
    },
    filters: {
        lookNumAbbr: function (count) {
            if (count > 100000) {
                let num = Math.floor(count / 10000);
                let fixed = String(count % 10000).slice(0, 1);
                count =
                    fixed === "0" ? `${num}万` : `${num}.${fixed}万`;
            }
            return count;
        }
    }
}

export default mixin;