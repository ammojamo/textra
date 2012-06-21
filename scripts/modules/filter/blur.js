define(function() {
    "use strict";

    function blur(canvas, params, onProgress, onComplete) {
        var ctx = params.source.getContext('2d'),
            w = canvas.width,
            h = canvas.height,
            r = parseFloat(params.radius),
            x, y, c,
            imageData = ctx.getImageData(0, 0, w, h),
            data = imageData.data,
            buf = new Uint8Array(new ArrayBuffer(Math.max(w, h) * 4)),
            cancel = false;

        if(Math.min(w, h) < 2 * r + 1) return;

        setTimeout(function process() {
            if(cancel) return;

            for(c = 0; c < 4; c++)
                for(y = 0; y < h; y++) {
                    blur1d(data, y * w * 4 + c, 4, w, r, buf);
                }

            onProgress(1, 2);
            setTimeout(function() {

                for(c = 0; c < 4; c++)
                    for(x = 0; x < w; x++) {
                        blur1d(data, x * 4 + c, w * 4, h, r, buf);
                    }
                onProgress(2, 2);
                onComplete(imageData);
            }, 0);

        }, 0);

        return {
            cancel: function() { cancel = true; }
        };
    }


    function blur1d(data, offset, stride, len, r, tmp) {
        var i, j = offset, k = offset,
            a = 0, b = 0, c = 0, d = 0;

        for(i = -r; i < len; i++) {
            if(i < len - r) {
                a += tmp[i + r] = data[j];
                j += stride;
                c++;
            }
            if(i >= r) {
                a += tmp[i - r];
                c++;
            }
            if(i >= 0) {
                a -= 2 * tmp[i];
                c -= 2;
            }
            b += a;
            d += c;
            if(i >= 0) {
                data[k] = b / d;
                k += stride;
            }
        }
    }

    return {
        gaussian: blur,
        modules: [
            {
                name: 'Gaussian Blur',
                process: blur,
                parameters: [
                    {
                        id: 'source',
                        name: 'Source',
                        type: 'image'
                    },
                    {
                        id: 'radius',
                        name: 'Radius',
                        type: 'range',
                        min: 1,
                        max: 30,
                        value: 5
                    }
                ]
            }
        ]
    };
});
