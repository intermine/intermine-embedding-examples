(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.getResource = function(url, options) {
    options = $.extend(options || {}, {
      dataType: "script",
      cache: true,
      url: url
    });
    return $.ajax(options);
  };

  window.Displayers = (window.Displayers && console.log("things may go #@!")) || {};

  Displayers.Presenter = (function() {

    function Presenter(o) {
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
    }

    return Presenter;

  })();

  Displayers.Resources = (function() {

    function Resources() {
      this.getData = __bind(this.getData, this);
      this.getTemplate = __bind(this.getTemplate, this);
      this.loaded = __bind(this.loaded, this);
      this.set = __bind(this.set, this);
    }

    Resources.prototype.store = {};

    Resources.prototype.service = new intermine.Service({
      root: "www.flymine.org/query"
    });

    Resources.prototype.eco = function() {
      return window.JST;
    };

    Resources.prototype.set = function(key, prefix, count, options, callback) {
      return this.store[key] = {
        "options": options,
        "count": count,
        "prefix": prefix,
        "callback": callback
      };
    };

    Resources.prototype.loaded = function(key, type, object) {
      var bar, i, k, p, resource, v, _ref;
      resource = this.store[key];
      if (resource) {
        resource.count -= 1;
        bar = $("#progress .bar");
        p = parseInt(bar.attr("data-percent"));
        for (i = 0; i <= 9; i++) {
          bar.width("" + (p += 1) + "%");
        }
        bar.attr("data-percent", p);
        if (p === 100) bar.parent().delay(500).fadeOut(500);
        switch (type) {
          case "presenter":
            resource["object"] = object;
            break;
          case "data":
            resource.options.data = object;
            break;
          case "template":
            _ref = this.eco();
            for (k in _ref) {
              v = _ref[k];
              p = "./" + resource.prefix + "/";
              if (!k.indexOf(p)) {
                resource.options.templates[k.substr(p.length)] = v;
              }
            }
        }
        if (!resource.count) {
          return resource.callback(resource["object"], resource["options"]);
        } else {
          return this.store[key] = resource;
        }
      } else {
        return console.log("" + key + " resource not recognized");
      }
    };

    Resources.prototype.getTemplate = function(cb, prefix, path) {
      var k, v, _ref,
        _this = this;
      _ref = this.eco();
      for (k in _ref) {
        v = _ref[k];
        if (!("./" + prefix + "/" + path).indexOf(k)) {
          return this.loaded(cb, "template");
        }
      }
      return $.getResource("js/templates/" + prefix + "/" + path).done(function() {
        return _this.loaded(cb, "template");
      });
    };

    Resources.prototype.getPresenter = function(cb, prefix, path) {
      return $.getResource("js/presenters/" + prefix + "/" + path);
    };

    Resources.prototype.getData = function(cb, query) {
      var _this = this;
      return this.service.query(query, function(q) {
        console.log(q.toXML());
        return q.records(function(json) {
          return _this.loaded(cb, "data", json);
        });
      });
    };

    return Resources;

  })();

  Displayers.Client = (function() {

    function Client() {
      this.render = __bind(this.render, this);
      this.load = __bind(this.load, this);      this.resources = Displayers.Resources = new Displayers.Resources();
    }

    Client.prototype.load = function(imObj, displayerName, el) {
      var cb, config, options, path, prefix, _i, _len, _ref;
      config = {
        "Publications": {
          prefix: "publications",
          templates: ["_header.js", "_table.js", "_paginator.js"],
          presenter: "Publications.js",
          callback: "g5VekAcU"
        },
        "backbone.js Publications": {
          prefix: "publications",
          templates: ["_header.js", "_table.js", "_paginator.js"],
          presenter: "Publications.backboned.js",
          callback: "xEnEYa35"
        }
      };
      options = {
        "imObj": imObj,
        "displayerName": displayerName,
        "prefix": config[displayerName].prefix,
        "el": el,
        "templates": {},
        "data": {}
      };
      console.log("loading " + options.displayerName + " in " + options.el);
      cb = config[displayerName].callback;
      prefix = config[options.displayerName].prefix;
      this.resources.set(cb, config[displayerName].prefix, 5, options, this.render);
      this.resources.getData(cb, {
        select: ["publications.title", "publications.year", "publications.journal", "publications.pubMedId", "publications.authors.name"],
        from: "Gene",
        where: {
          "ncbiGeneNumber": {
            "=": 34430
          }
        },
        joins: ["publications.authors"]
      });
      _ref = config[options.displayerName].templates;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        this.resources.getTemplate(cb, prefix, path);
      }
      return this.resources.getPresenter(cb, prefix, config[options.displayerName].presenter);
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
    client.load("TfIIB", "Publications", "#displayer");
    return client.load("TfIIB", "backbone.js Publications", "#backbone");
  });

}).call(this);
