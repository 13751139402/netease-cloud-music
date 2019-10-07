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
        },
        getImageColor: {
            bind(img, binding) {
                // console.log("set Image");
                // var canvas = document.getElementById('m_canvas');
                // var ctx = canvas.getContext('2d');
                // var image = new Image();
                // image.src = 'image.png';

                // image.οnlοad = function () {
                //     ctx.drawImage(image, 10, 10);
                //     var imagedata = ctx.getImageData(50, 50, 400, 400);
                //     ctx.createImageData(imagedata);
                // }

                img.onload = () => {
                    let canvas = document.getElementById('backGroundCanvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    var context = canvas.getContext("2d");

                    context.drawImage(img, 0, 0);

                    // 获取像素数据
                    var data = context.getImageData(0, 0, img.width, img.height).data;

                    // 取所有像素的平均值
                    for (var row = 0; row < img.height; row++) {
                        for (var col = 0; col < img.width; col++) {
                            r += data[(img.width * row + col) * 4];
                            g += data[(img.width * row + col) * 4 + 1];
                            b += data[(img.width * row + col) * 4 + 2];
                        }
                    }

                    // 求取平均值
                    r /= img.width * img.height;
                    g /= img.width * img.height;
                    b /= img.width * img.height;

                    // 将最终的值取整
                    r = Math.round(r);
                    g = Math.round(g);
                    b = Math.round(b);

                    return "rgb(" + r + "," + g + "," + b + ")";
                }
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