define(['thirdparty/underscore-min.js', 'thirdparty/backbone-min.js'], function(_, Backbone) {
    "use strict";
    require();

    // A Node is a single textra processing unit
    var Node = Backbone.Model.extend({

        // A node must always have a module
        validate: function() {
            return this.has('module');
        },

        initialize: function(){
            var module = this.get('module');
            // initialize parameters by extracting default values from module
            var params = _.reduce(module.parameters, {}, function(m, p) { m[p.name] = p.value; });
            this.set('parameters', params);
        },

        process: function() {
            var module = this.get('module');
            this.set('process', module.process());
        }
    });

    // A Chain is a series of Nodes which form a textra processing graph
    var Chain = Backbone.Collection.extend({
        model: Node,

        defaults: function() {
            return {
            };
        },

        intialize: function() {
            this.on('add', this.addNode, this);
        },

        addNode: function(node) {
            node.process();
        }
    });

    return {
        Node: Node,
        Chain: Chain
    };
});
