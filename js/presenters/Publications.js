(function() {
  var Presenter;

  Presenter = (function() {

    function Presenter(o) {
      this.o = o;
      o.el.append($('<h3/>', {
        "text": "" + o.imObj + " " + o.displayerName + " displayer"
      }));
      o.el.append(_.template(o.templates["table-template"].html(), {
        data: o.data
      }));
    }

    return Presenter;

  })();

  window.Callbacks.call("g5VekAcU", Presenter);

}).call(this);
