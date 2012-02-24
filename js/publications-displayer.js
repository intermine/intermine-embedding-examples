(function() {
  var flymine;

  flymine = new intermine.Service({
    root: "localhost:8080/flymine"
  });

  flymine.fetchDisplayer({
    id: "1439020182",
    name: "publications"
  }, function(q) {
    return $("div#displayer").html(q.displayer);
  });

}).call(this);
