(function() {
  var Publications,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Publications = (function(_super) {

    __extends(Publications, _super);

    function Publications() {
      this.render = __bind(this.render, this);
      Publications.__super__.constructor.apply(this, arguments);
    }

    Publications.prototype.render = function() {
      var _base, _base2;
      $(this.el).append(typeof (_base = this.templates)["_header"] === "function" ? _base["_header"]({
        "imObj": this.imObj,
        "displayerName": this.displayerName
      }) : void 0);
      return $(this.el).append(typeof (_base2 = this.templates)["_table"] === "function" ? _base2["_table"]({
        "data": this.data[0].publications.slice(0, 3)
      }) : void 0);
    };

    return Publications;

  })(Displayers.Presenter);

  Displayers.Resources.loaded("g5VekAcU", "presenter", Publications);

}).call(this);
