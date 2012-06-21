define(function() {
    function compose(canvas, params, onProgress, onComplete) {
        var ctx = canvas.getContext('2d');

        setTimeout(function process() {
            ctx.save();
            ctx.drawImage(params.sourceA, 0, 0);
            ctx.globalCompositeOperation = params.operation;
            ctx.globalAlpha = params.alpha / 100;
            ctx.drawImage(params.sourceB, 0, 0);
            ctx.restore();
            onComplete(true);
        }, 0);

        return {
            cancel: function() { }
        };
    }

    return {
        compose: compose,
        modules: [
            {
                name: 'Compose',
                process: compose,
                parameters: [
                    {
                        id: 'sourceA',
                        name: 'Source A',
                        type: 'image'
                    },
                    {
                        id: 'sourceB',
                        name: 'Source B',
                        type: 'image'
                    },
                    {
                        id: 'operation',
                        name: 'Operation',
                        type: 'text',
                        value: 'source-over'
                    },
                    {
                        id: 'alpha',
                        name: 'Alpha',
                        type: 'range',
                        min: 0,
                        max: 100,
                        value: 50
                    }
                ]
            }
        ]
    };
});
