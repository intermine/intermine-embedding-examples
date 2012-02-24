# The WebService root.
flymine = new intermine.Service(root: "localhost:8080/flymine")

flymine.fetchDisplayer
    id: "1439020182"
    name: "publications"
    , (q) ->
        $("div#displayer").html(q.displayer)