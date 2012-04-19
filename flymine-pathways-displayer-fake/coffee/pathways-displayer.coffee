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

# On DOM ready.
$ () ->

  # Data for each 'mine'.
  mines = [
    'name':     "mine1"
    'pathways': [ "pathway1", "pathway2", "pathway3" ]
  ,
    'name':     "mine2"
    'pathways': [ "pathway2", "pathway3" ]
  ,
    'name':     "mine3"
    'pathways': [ "pathway1", "pathway2" ]
  ]

  # The grid/table.
  window.Grid = grid = {}

  # Generate the `<thead>`.
  row = $('<tr/>')
  row.append $('<th/>')
  for mine in mines
    row.append $('<th/>', { 'text': mine['name'] })
  row.appendTo $('table#pathways thead')

  # Traverse the server data.
  for mine in mines then do (mine) ->
    for pathway in mine.pathways then do (mine, pathway) ->

      # Do we have this pathway already?
      if not grid[pathway]?

        # Create the row.
        $("table#pathways tbody").append row = $("<tr/>").append($("<td/>",
          'text': pathway
        ))
        
        # Add row columns for each mine.
        do ->
          p = grid[pathway] = {}
          for mine in mines
            p[mine['name']] = do ->
              row.append el = $ '<td/>'
              el
            do ->
              # Watch for changes on each mine for this pathway and re-render view.
              p.watch mine['name'], (a, el, newvalue) ->
                el.html $("<span/>",
                  'class': "label label-success"
                  'text':  newvalue
                )

      # Now add the pathway for this mine into the grid.
      grid[pathway][mine['name']] = 'Yes'