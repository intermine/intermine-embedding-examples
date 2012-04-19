# Object.watch shim.
unless Object::watch
  Object.defineProperty Object::, "watch",
    enumerable:   false
    configurable: true
    writable:     false
    
    value: (prop, handler) ->
      oldval = this[prop]
      newval = oldval
      getter = -> newval

      setter = (val) ->
        oldval = newval
        newval = handler.call(this, prop, oldval, val)

      if delete this[prop]
        Object.defineProperty this, prop,
          get:          getter
          set:          setter
          enumerable:   true
          configurable: true

# Slugify a string (use on pathways).
slugify = (text) -> text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, "_").replace(/\s/gi, "-").toLowerCase()

# On DOM ready.
$ () ->

  # The mines we will be 'querying'.
  mines = [ 'FlyMine', 'CoalMine', 'GoldMine' ]

  # Data for each 'mine'.
  data = [
    'name':     "FlyMine"
    'pathways': [ "glycoLysiS", "Glucuronic acid", "Citric acid cycle", ]
  ,
    'name':     "GoldMine"
    'pathways': [ "Glycolysis", "Inositol", "glucuronic acid" ]
  ,
    'name':     "CoalMine"
    'pathways': [ "citric acid CYCLE", "Inositol" ]
  ]

  # The grid/table.
  window.Grid = grid = {}

  # Generate the `<thead>`.
  row = $('<tr/>')
  row.append $('<th/>')
  for mine in mines
    row.append $('<th/>', { 'text': mine })
  row.appendTo $('table#pathways thead')

  # Traverse the server data.
  for mine in data then do (mine) ->
    for pathway in mine.pathways then do (mine, pathway) ->

      # Slugify pathway to get a 'unique' identifier.
      slug = slugify pathway

      # Do we have this pathway already?
      if not grid[slug]?

        # Create the row.
        $("table#pathways tbody").append row = $("<tr/>").append($("<td/>",
          'text': pathway
        ))
        
        # Add row columns for each mine.
        do ->
          p = grid[slug] = {}
          for mine in mines
            p[mine] = do ->
              row.append el = $ '<td/>'
              el
            do ->
              # Watch for changes on each mine for this pathway and re-render view.
              p.watch mine, (a, el, newvalue) ->
                el.html $("<span/>",
                  'class': "label label-success"
                  'text':  newvalue
                )

      # Now add the pathway for this mine into the grid.
      grid[slug][mine['name']] = 'Yes'