require(
    [
        'modules/gen/noise',
        'modules/gen/dla',
        'modules/filter/blur',
        'modules/filter/compose',
        'modules/filter/threshold',
        'modules/filter/colorize'
    ],
    function() {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);

    window.modules = [];

    args.forEach(function(module) {
        window.modules = window.modules.concat(module.modules || []);
    });
/*
    window.modules = [
        {
            name: 'Random Walk Noise',
            process: noise.randomWalk,
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
            name: 'Compose',
            process: compose.compose,
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
        },
        {
            name: 'Worley Noise'
        },
        {
            name: 'Diffusion Limited Aggregation'
        },
        {
            name: 'Differential Hysteresis Processing'
        },
        {
            name: 'Elementary Cellular Automata',
            tilable: false
        },
        {
            name: 'Gaussian Blur',
            process: blur.gaussian,
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
        },
        {
            name: 'Box Blur'
        },
        {
            name: 'Threshold',
            process: threshold.threshold,
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
        },
        {
            name: 'Soblel Edge Detection'
        }
    ];
*/
    if(window.onModulesLoaded) window.onModulesLoaded();
});
