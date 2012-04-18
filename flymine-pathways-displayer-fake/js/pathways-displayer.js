(function() {
  var mines, pathway, pathways, _fn;

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

  if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function(prop) {
        var val;
        val = this[prop];
        delete this[prop];
        return this[prop] = val;
      }
    });
  }

  pathways = {
    pathway1: {
      mine1: '?',
      mine2: '?'
    },
    pathway2: {
      mine1: '?',
      mine2: '?'
    },
    pathway3: {
      mine1: '?',
      mine2: '?'
    }
  };

  _fn = function(pathway, mines) {
    var mine, status, _results;
    _results = [];
    for (mine in mines) {
      status = mines[mine];
      _results.push(mines.watch(mine, function(mine, oldvalue, newvalue) {
        console.log("" + mine + " " + pathway + " changed from " + oldvalue + " to " + newvalue);
        return newvalue;
      }));
    }
    return _results;
  };
  for (pathway in pathways) {
    mines = pathways[pathway];
    _fn(pathway, mines);
  }

  pathways.pathway1.mine1 = 'Y';

  pathways.pathway2.mine2 = 'N';

}).call(this);
