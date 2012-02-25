(function() {
  var Callbacks, DisplayerClient;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Callbacks = (function() {

    function Callbacks() {
      this.call = __bind(this.call, this);
      this.me = __bind(this.me, this);
    }

    Callbacks.prototype.store = {};

    Callbacks.prototype.me = function(key, callback) {
      return this.store[key] = callback;
    };

    Callbacks.prototype.call = function(key, object) {
      var _base;
      return typeof (_base = this.store)[key] === "function" ? _base[key](object) : void 0;
    };

    return Callbacks;

  })();

  DisplayerClient = (function() {

    function DisplayerClient() {
      this.render = __bind(this.render, this);
      this.load = __bind(this.load, this);      window.Callbacks = new Callbacks();
    }

    DisplayerClient.prototype.load = function(imObj, displayerName, el) {
      var head, o, script, template, templates, _i, _len, _ref;
      this.imObj = imObj;
      this.displayerName = displayerName;
      this.el = el;
      templates = (function() {
        var result;
        result = "";
        $.ajax({
          async: false,
          url: "js/templates/_publications.html",
          success: function(data) {
            return result = data;
          }
        });
        return result;
      })();
      this.templates = {};
      _ref = $(templates);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        template = _ref[_i];
        o = $(template)[0];
        if (o.tagName === "SCRIPT") this.templates[$(o).attr("id")] = $(o);
      }
      this.data = [
        {
          title: "An age-dependent diet-modified effect of the PPARγ Pro12Ala polymorphism in children.",
          authors: "Dedoussis GV",
          journal: "Metabolism",
          year: 2011
        }, {
          title: "Peroxisome proliferator-activated receptor-gamma (PPAR-γ) expression is downreg...",
          authors: "Yamamoto-Furusho JK",
          journal: "Inflamm Bowel Dis",
          year: 2011
        }, {
          title: "Gender differences in the effects of peroxisome proliferator-activated receptor ...",
          authors: "Chen CH",
          journal: "Prog Neuropsychopharmacol Biol Psychiatry",
          year: 2011
        }
      ];
      script = document.createElement("script");
      script.type = "text/javascript";
      script.language = "javascript";
      script.src = "js/presenters/Publications.js";
      head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
      return window.Callbacks.me("g5VekAcU", this.render);
    };

    DisplayerClient.prototype.render = function(Presenter) {
      return new Presenter({
        "imObj": this.imObj,
        "displayerName": this.displayerName,
        "el": this.el,
        "data": this.data,
        "templates": this.templates
      });
    };

    return DisplayerClient;

  })();

  $(function() {
    var client;
    client = new DisplayerClient();
    return client.load("PPARG", "Publications", $("#displayer"));
  });

}).call(this);
