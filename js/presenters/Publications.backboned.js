(function() {
  var Backboned, Publication, Publications;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Publication = (function() {

    __extends(Publication, Backbone.Model);

    function Publication() {
      Publication.__super__.constructor.apply(this, arguments);
    }

    return Publication;

  })();

  Publications = (function() {

    __extends(Publications, Backbone.Collection);

    function Publications() {
      Publications.__super__.constructor.apply(this, arguments);
    }

    Publications.prototype.model = Publication;

    Publications.prototype.comparator = function(publication) {
      return publication.get("authors");
    };

    return Publications;

  })();

  Backboned = (function() {

    __extends(Backboned, Backbone.View);

    function Backboned() {
      Backboned.__super__.constructor.apply(this, arguments);
    }

    Backboned.prototype.initialize = function(o) {
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
      return this.model = new Publications(this.data);
    };

    Backboned.prototype.render = function() {
      $(this.el).append(_.template(this.templates["header-template"].html(), {
        "imObj": this.imObj,
        "displayerName": this.displayerName
      }));
      return $(this.el).append(_.template(this.templates["table-template"].html(), {
        "data": this.model.toJSON()
      }));
    };

    return Backboned;

  })();

  Displayers.Callbacks.call("xEnEYa35", Backboned);

}).call(this);
