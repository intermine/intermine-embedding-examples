(function() {
  var Grid;

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

  Grid = (function() {

    Grid.prototype.columns = [];

    Grid.prototype.grid = {};

    function Grid(el, head) {
      var column, row, _i, _len;
      $(el).append(this.body = $('<tbody/>'));
      row = $('<tr/>');
      row.append($('<th/>'));
      for (_i = 0, _len = head.length; _i < _len; _i++) {
        column = head[_i];
        row.append($('<th/>', {
          'text': column
        }));
        this.columns.push(this.slugify(column));
      }
      row.appendTo($('<thead/>').appendTo($(el)));
    }

    Grid.prototype.add = function(row, column, data) {
      var columnS, rowS,
        _this = this;
      rowS = this.slugify(row);
      columnS = this.slugify(column);
      if (!(this.grid[rowS] != null)) {
        this.body.append(row = $("<tr/>").append($("<td/>", {
          'text': row
        })));
        (function() {
          var column, p, _i, _len, _ref, _results;
          p = _this.grid[rowS] = {};
          _ref = _this.columns;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            column = _ref[_i];
            _results.push(p[column] = (function() {
              var el;
              row.append(el = $('<td/>'));
              return el;
            })());
          }
          return _results;
        })();
      }
      return this.grid[rowS][columnS].html(data);
    };

    Grid.prototype.slugify = function(text) {
      return text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, "_").replace(/\s/gi, "-").toLowerCase();
    };

    return Grid;

  })();

  $(function() {
    var data, grid, mine, mines, _i, _len, _results;
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
    grid = new Grid('table#pathways', mines);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      mine = data[_i];
      _results.push((function(mine) {
        var pathway, _j, _len2, _ref, _results2;
        _ref = mine.pathways;
        _results2 = [];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          pathway = _ref[_j];
          _results2.push((function(mine, pathway) {
            return grid.add(pathway, mine['name'], $("<span/>", {
              'class': 'label label-success',
              'text': 'Yes'
            }));
          })(mine, pathway));
        }
        return _results2;
      })(mine));
    }
    return _results;
  });

}).call(this);
