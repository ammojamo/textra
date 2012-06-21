define(['util/random'], function(random) {
    function hashString(str) {
        var hash = 0, i, char;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    function randomWalkNoise(canvas, params, onProgress, onComplete) {
        var
            x = 0,
            y = 0,
            w = canvas.width,
            h = canvas.height,
            l = w * h * 128,
            buf = new ArrayBuffer(w * h),
            data = new Uint8Array(buf),
            i = 0, d, p,
            cancel,
            prng = random.Alea(params.seed).uint32,
            rand = (prng() >>> 1) | 0x40000000;

        setTimeout(function process() {
            var n = 300000;
            if(cancel) return;
            for(; i < l; i++) {
                if(n-- === 0) {
                    setTimeout(process, 0);
                    onProgress(i, l);
                    return;
                }
                d = rand & 7;
                rand >>= 3;
                if(rand < 8) rand = (prng() >>> 1) | 0x40000000;

                x = (x + [-1, 0, 1, 1, 1, 0, -1, -1][d] + w) % w;
                y = (y + [-1, -1, -1, 0, 1, 1, 1, 0][d] + h) % h;
                p = (x + y * w);
                if(data[p] < 255) data[p]++;
                else i--;
            }
            onComplete(data);
        }, 0);

        return {
            cancel: function() {
                cancel = true;
            }
        };
    }

    function whiteNoise(canvas, params, onProgress, onComplete) {
        var
            w = canvas.width,
            h = canvas.height,
            l = w * h,
            i = 0,
            buf = new ArrayBuffer(w * h),
            data = new Uint8Array(buf),
            prng = random.Alea(params.seed).uint32,
            rand;

        setTimeout(function process() {
            for(i = 0; i < l; i++) {
                rand = ((i & 3) === 0) ? prng() : rand >> 8;
                data[i] = rand & 255;
            }
            onComplete(data);
        }, 0);

        return {
            cancel: function() { }
        };
    }


    return {
        randomWalk: randomWalkNoise,
        modules: [
            {
                name: 'Random Walk Noise',
                process: randomWalkNoise,
                parameters: [
                    {
                        id: 'seed',
                        name: 'Seed',
                        type: 'text',
                        value: ''
                    }
                ]
            },
            {
                name: 'White Noise',
                process: whiteNoise,
                parameters: [
                    {
                        id: 'seed',
                        name: 'Seed',
                        type: 'text',
                        value: ''
                    }
                ]
            }
        ]
    };
});
