(function() {
  var Backboned, Publication, Publications,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Publication = (function(_super) {

    __extends(Publication, _super);

    function Publication() {
      Publication.__super__.constructor.apply(this, arguments);
    }

    return Publication;

  })(Backbone.Model);

  Publications = (function(_super) {

    __extends(Publications, _super);

    function Publications() {
      Publications.__super__.constructor.apply(this, arguments);
    }

    Publications.prototype.model = Publication;

    return Publications;

  })(Backbone.Collection);

  Backboned = (function(_super) {

    __extends(Backboned, _super);

    function Backboned() {
      this.paginate = __bind(this.paginate, this);
      Backboned.__super__.constructor.apply(this, arguments);
    }

    Backboned.prototype.page = 0;

    Backboned.prototype.pages = [];

    Backboned.prototype.events = {
      "click .btn-group a": "paginate"
    };

    Backboned.prototype.initialize = function(o) {
      var k, publications, v, _base;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
      publications = this.data[0].publications;
      while (publications.length) {
        this.pages.push(new Publications(publications.splice(0, 3)));
      }
      $(this.el).append(typeof (_base = this.templates)["_header"] === "function" ? _base["_header"]({
        "imObj": this.imObj,
        "displayerName": this.displayerName
      }) : void 0);
      $(this.el).append($('<div/>', {
        "class": "table"
      }));
      return $(this.el).append($('<div/>', {
        "class": "btn-group"
      }));
    };

    Backboned.prototype.paginate = function(e) {
      this.page = parseInt($(e.target).text());
      return this.render();
    };

    Backboned.prototype.render = function() {
      var _base, _base2;
      $(this.el).find(".table").html(typeof (_base = this.templates)["_table"] === "function" ? _base["_table"]({
        "data": this.pages[this.page].toJSON(),
        "page": this.page
      }) : void 0);
      return $(this.el).find(".btn-group").html(typeof (_base2 = this.templates)["_paginator"] === "function" ? _base2["_paginator"]({
        "pages": this.pages.length - 1,
        "current": this.page
      }) : void 0);
    };

    return Backboned;

  })(Backbone.View);

  Displayers.Resources.loaded("xEnEYa35", "presenter", Backboned);

}).call(this);
