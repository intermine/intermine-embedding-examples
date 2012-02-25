(function() {
  var Publications;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Publications = (function() {

    __extends(Publications, Displayers.Presenter);

    function Publications() {
      this.render = __bind(this.render, this);
      Publications.__super__.constructor.apply(this, arguments);
    }

    Publications.prototype.render = function() {
      $(this.el).append(this.templatize("header-template", {
        "imObj": this.imObj,
        "displayerName": this.displayerName
      }));
      return $(this.el).append(this.templatize("table-template", {
        "data": this.data
      }));
    };

    return Publications;

  })();

  Displayers.Callbacks.call("g5VekAcU", Publications);

}).call(this);
