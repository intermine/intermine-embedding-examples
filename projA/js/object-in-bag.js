(function() {
  var flymine, query;

  flymine = new intermine.Service({
    root: "www.flymine.org/query"
  });

  query = {
    select: ["symbol", "primaryIdentifier"],
    from: "Gene",
    where: {
      symbol: {
        contains: "ze"
      }
    },
    limit: 10
  };

  flymine.query(query, function(q) {
    return q.records(function(rs) {
      return _(rs).each(function(row, index) {
        return $('<tr/>').append($('<td/>', {
          "text": index + 1
        })).append($('<td/>', {
          "text": row["symbol"]
        })).append($('<td/>', {
          "text": row["primaryIdentifier"]
        })).append($('<td/>', {
          "text": row["objectId"]
        })).append($('<td/>', {
          "html": function() {
            var _this = this;
            return flymine.fetchListsContaining({
              "id": row["objectId"]
            }, function(q) {
              if (q.length) {
                return $(_this).append($('<span/>', {
                  "class": "label label-success",
                  "text": "Yes"
                }));
              } else {
                return $(_this).append($('<span/>', {
                  "class": "label",
                  "text": "No"
                }));
              }
            });
          }
        })).appendTo($("table#ze-genes tbody"));
      });
    });
  });

}).call(this);
