define(['util/random'], function(random) {
    function dla(canvas, params, onProgress, onComplete) {
        var x, y, x1, y1,
            w = canvas.width,
            h = canvas.height,
            i = 0,
            n = w * h / 2,
            dir,
            cancel,
            buf = new ArrayBuffer(w * h),
            data = new Uint8Array(buf),
            prng = random.Alea(params.seed).uint32,
            rand = (prng() >>> 1) | 0x40000000;


        // place seeds
        for(i = 0; i < params.seeds; i++) {
            data[Math.floor((prng() / 0x100000000) * w * h)] = 255;
        }

        i = 0;
        setTimeout(function process() {
            var k = 300;
            if(cancel) return;
            for(; i < n; i++) {
                if(k-- === 0) {
                    k *= 2;
                    setTimeout(process, 0);
                    onProgress(i, n);
                    return;
                }
                x = Math.floor((prng() / 0x100000000) * w);
                y = Math.floor((prng() / 0x100000000) * h);
                while(true) {
                    dir = rand & 7;
                    rand >>= 3;
                    if(rand < 8) rand = (prng() >>> 1) | 0x40000000;

                    x1 = (x + [-1, 0, 1, 1, 1, 0, -1, -1][dir] + w) % w;
                    y1 = (y + [-1, -1, -1, 0, 1, 1, 1, 0][dir] + h) % h;
                    if(data[y1 * w + x1] > 0) {
                        data[y * w + x] = Math.floor(256 * (n - 1 - i) / n);
                        break;
                    }
                    x = x1;
                    y = y1;
                }
            }
            onComplete(data);
        }, 0);

        return {
            cancel: function() {
                cancel = true;
            }
        };
    }

    return {
        dla: dla,
        modules: [
            {
                name: 'Diffusion Limited Aggregation',
                process: dla,
                parameters: [
                    {
                        id: 'seed',
                        name: 'Seed',
                        type: 'text',
                        value: ''
                    },
                    {
                        id: 'seeds',
                        name: 'Seeds',
                        type: 'range',
                        min: 1,
                        max: 100,
                        value: 10
                    }
                ]
            }
        ]
    };
});
