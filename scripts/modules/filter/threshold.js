define(function() {

    function threshold(canvas, params, onProgress, onComplete) {
        var ctx = canvas.getContext('2d');

        setTimeout(function process() {
            console.log(params.source);

            var w = canvas.width,
                h = canvas.height,
                sourceCtx = params.source.getContext('2d'),
                imageData = sourceCtx.getImageData(0, 0, w, h),
                data = imageData.data,
                i;

            for(i = 0; i < w * h * 4; i++) {
                data[i] = data[i] > params.cutoff ? 255 : 0;
                i++;
                data[i] = data[i] > params.cutoff ? 255 : 0;
                i++;
                data[i] = data[i] > params.cutoff ? 255 : 0;
                i++;
            }
            ctx.putImageData(imageData, 0, 0);
            onComplete(true);
        }, 0);

        return {
            cancel: function() { }
        };
    }

    return {
        threshold: threshold,
        modules: [
            {
                name: 'Threshold',
                process: threshold,
                parameters: [
                    {
                        id: 'source',
                        name: 'Source',
                        type: 'image'
                    },
                    {
                        id: 'cutoff',
                        name: 'Cutoff',
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
