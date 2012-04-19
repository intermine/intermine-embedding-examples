// Generated by CoffeeScript 1.3.1
(function() {
  var slugify;

  if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function(prop, handler) {
        var getter, newval, oldval, setter;
        oldval = this[prop];
        newval = oldval;
        getter = function() {
          return newval;
        };
        setter = function(val) {
          oldval = newval;
          return newval = handler.call(this, prop, oldval, val);
        };
        if (delete this[prop]) {
          return Object.defineProperty(this, prop, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
          });
        }
      }
    });
  }

  slugify = function(text) {
    return text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, "_").replace(/\s/gi, "-").toLowerCase();
  };

  $(function() {
    var data, grid, mine, mines, row, _i, _j, _len, _len1, _results;
    mines = ['FlyMine', 'CoalMine', 'GoldMine'];
    data = [
      {
        'name': "FlyMine",
        'pathways': ["glycoLysiS", "Glucuronic acid", "Citric acid cycle"]
      }, {
        'name': "GoldMine",
        'pathways': ["Glycolysis", "Inositol", "glucuronic acid"]
      }, {
        'name': "CoalMine",
        'pathways': ["citric acid CYCLE", "Inositol"]
      }
    ];
    window.Grid = grid = {};
    row = $('<tr/>');
    row.append($('<th/>'));
    for (_i = 0, _len = mines.length; _i < _len; _i++) {
      mine = mines[_i];
      row.append($('<th/>', {
        'text': mine
      }));
    }
    row.appendTo($('table#pathways thead'));
    _results = [];
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      mine = data[_j];
      _results.push((function(mine) {
        var pathway, _k, _len2, _ref, _results1;
        _ref = mine.pathways;
        _results1 = [];
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          pathway = _ref[_k];
          _results1.push((function(mine, pathway) {
            var slug;
            slug = slugify(pathway);
            if (!(grid[slug] != null)) {
              $("table#pathways tbody").append(row = $("<tr/>").append($("<td/>", {
                'text': pathway
              })));
              (function() {
                var mine, p, _l, _len3, _results2;
                p = grid[slug] = {};
                _results2 = [];
                for (_l = 0, _len3 = mines.length; _l < _len3; _l++) {
                  mine = mines[_l];
                  p[mine] = (function() {
                    var el;
                    row.append(el = $('<td/>'));
                    return el;
                  })();
                  _results2.push((function() {
                    return p.watch(mine, function(a, el, newvalue) {
                      return el.html($("<span/>", {
                        'class': "label label-success",
                        'text': newvalue
                      }));
                    });
                  })());
                }
                return _results2;
              })();
            }
            return grid[slug][mine['name']] = 'Yes';
          })(mine, pathway));
        }
        return _results1;
      })(mine));
    }
    return _results;
  });

}).call(this);