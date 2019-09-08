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
    }
}

export default mixin;