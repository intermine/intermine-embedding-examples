(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Displayers = (window.Displayers && console.log("things may go #@!")) || {};

  Displayers.Presenter = (function() {

    function Presenter(o) {
      this.templatize = __bind(this.templatize, this);
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
    }

    Presenter.prototype.templatize = function(key, data) {
      return _.template(this.templates[key].html(), data);
    };

    return Presenter;

  })();

  Displayers.Callbacks = (function() {

    function Callbacks() {
      this.call = __bind(this.call, this);
      this.me = __bind(this.me, this);
    }

    Callbacks.prototype.store = {};

    Callbacks.prototype.me = function(key, options, callback) {
      return this.store[key] = {
        "options": options,
        "callback": callback
      };
    };

    Callbacks.prototype.call = function(key, object) {
      var _ref;
      return (_ref = this.store[key]) != null ? _ref.callback(object, this.store[key].options) : void 0;
    };

    return Callbacks;

  })();

  Displayers.Client = (function() {

    function Client() {
      this.render = __bind(this.render, this);
      this.load = __bind(this.load, this);      Displayers.Callbacks = new Displayers.Callbacks();
    }

    Client.prototype.load = function(imObj, displayerName, el) {
      var config, head, o, options, script, template, templates, _i, _len, _ref;
      options = {
        "imObj": imObj,
        "displayerName": displayerName,
        "el": el,
        "templates": {},
        "data": {}
      };
      console.log("loading " + options.displayerName + " in " + options.el);
      config = {
        "Publications": {
          templates: "_publications.html",
          presenter: "Publications.js",
          callback: "g5VekAcU"
        },
        "backbone.js Publications": {
          templates: "_publications.html",
          presenter: "Publications.backboned.js",
          callback: "xEnEYa35"
        }
      };
      templates = (function() {
        var result;
        result = "";
        $.ajax({
          async: false,
          url: "js/templates/" + config[options.displayerName].templates,
          success: function(data) {
            return result = data;
          }
        });
        return result;
      })();
      _ref = $(templates);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        template = _ref[_i];
        o = $(template)[0];
        if (o.tagName === "SCRIPT") options.templates[$(o).attr("id")] = $(o);
      }
      options.data = [
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
      script.src = "js/presenters/" + config[options.displayerName].presenter;
      head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
      return Displayers.Callbacks.me(config[displayerName].callback, options, this.render);
    };

    Client.prototype.render = function(Clazz, options) {
      var p;
      p = new Clazz(options);
      return p.render();
    };

    return Client;

  })();

  $(function() {
    var client;
    client = new Displayers.Client();
    client.load("PPARG", "Publications", "#displayer");
    return client.load("PPARG", "backbone.js Publications", "#backbone");
  });

}).call(this);
