(function() {
  var Grid,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Grid = (function() {

    Grid.prototype.columns = [];

    Grid.prototype.rows = [];

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
      var columnS, rowEl, rowS,
        _this = this;
      rowS = this.slugify(row);
      columnS = this.slugify(column);
      if (__indexOf.call(this.rows, rowS) < 0) {
        rowEl = $("<tr/>").append($("<td/>", {
          'text': row
        }));
        if (!this.rows.length) {
          this.body.append(rowEl);
          this.rows = [rowS];
        } else {
          (function() {
            var index, row, _ref;
            _ref = _this.rows;
            for (index in _ref) {
              row = _ref[index];
              if (rowS.localeCompare(row) < 0) {
                _this.rows.splice(index, 0, rowS);
                _this.grid[row]['el'].before(rowEl);
                return;
              }
            }
            _this.rows.push(rowS);
            return _this.body.append(rowEl);
          })();
        }
        (function() {
          var columnS, _i, _len, _ref, _results;
          _this.grid[rowS] = {
            'el': rowEl,
            'columns': {}
          };
          _ref = _this.columns;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            columnS = _ref[_i];
            _results.push(_this.grid[rowS]['columns'][columnS] = (function() {
              var el;
              rowEl.append(el = $('<td/>'));
              return el;
            })());
          }
          return _results;
        })();
      }
      return this.grid[rowS]['columns'][columnS].html(data);
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
        'pathways': ["glycoLysis", "Glucuronic acid", "Lipogenesis", "Citric acid cycle", "Oxidative phosphorylation"]
      }, {
        'name': "GoldMine",
        'pathways': ["Nitrogen metabolism", "Glycolysis", "Oxidative phosphorylation", "Inositol", "glucuronic acid"]
      }, {
        'name': "CoalMine",
        'pathways': ["citric acid CYCLE", "Lipogenesis", "inositol", "Nitrogen metabolism"]
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
