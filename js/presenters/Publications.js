(function() {
  var Presenter;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Presenter = (function() {

    function Presenter(o) {
      this.render = __bind(this.render, this);
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
    }

    Presenter.prototype.render = function() {
      $(this.el).append(_.template(this.templates["header-template"].html(), {
        "imObj": this.imObj,
        "displayerName": this.displayerName
      }));
      return $(this.el).append(_.template(this.templates["table-template"].html(), {
        "data": this.data
      }));
    };

    return Presenter;

  })();

  window.Callbacks.call("g5VekAcU", Presenter);

}).call(this);
