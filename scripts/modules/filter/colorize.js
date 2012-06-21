define(function() {

    function colorize(canvas, params, onProgress, onComplete) {
        var ctx = canvas.getContext('2d');

        setTimeout(function process() {
            console.log(params.source);

            var w = canvas.width,
                h = canvas.height,
                sourceCtx = params.source.getContext('2d'),
                imageData = sourceCtx.getImageData(0, 0, w, h),
                data = imageData.data,
                i, k;

            for(i = 0; i < w * h * 4; i+=4) {
                k = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = k * params.r / 256.0;
                data[i + 1] = k * params.g / 256.0;
                data[i + 2] = k * params.b / 256.0;
            }
            ctx.putImageData(imageData, 0, 0);
            onComplete(true);
        }, 0);

        return {
            cancel: function() { }
        };
    }

    return {
        threshold: colorize,
        modules: [
            {
                name: 'Colorize',
                process: colorize,
                parameters: [
                    {
                        id: 'source',
                        name: 'Source',
                        type: 'image'
                    },
                    {
                        id: 'r',
                        name: 'Red',
                        type: 'range',
                        min: 0,
                        max: 255,
                        value: 128
                    },
                    {
                        id: 'g',
                        name: 'Green',
                        type: 'range',
                        min: 0,
                        max: 255,
                        value: 128
                    },
                    {
                        id: 'b',
                        name: 'Blue',
                        type: 'range',
                        min: 0,
                        max: 255,
                        value: 128
                    }
                ]
            }
        ]
    };
});
