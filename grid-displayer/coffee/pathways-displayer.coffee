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

class Grid

  columns: []
  grid:    {}

  constructor: (el, head) ->
    # Add target for body of the grid.
    $(el).append @body = $ '<tbody/>'

    # Generate the `<thead>`.
    row = $ '<tr/>'
    row.append $ '<th/>'
    for column in head
      # Add the el.
      row.append $('<th/>', { 'text': column })
      # Add the slug.
      @columns.push @slugify column
    row.appendTo $('<thead/>').appendTo $(el)

  # Add an element to the grid.
  add: (row, column, data) ->
    # Slugify the row and column.
    rowS = @slugify row
    columnS = @slugify column

    # Do we have this pathway already?
    if not @grid[rowS]?
      # Create the row.
      @body.append row = $("<tr/>").append($("<td/>",
        'text': row
      ))

      # Add row columns.
      do =>
        p = @grid[rowS] = {}
        for column in @columns
          p[column] = do ->
            row.append el = $ '<td/>'
            el

    # We have the grid in place, add the element.
    @grid[rowS][columnS].html data

  # Slugify a string.
  slugify: (text) -> text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, "_").replace(/\s/gi, "-").toLowerCase()


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

  grid = new Grid('table#pathways', mines)

  # Traverse the server data.
  for mine in data then do (mine) ->
    for pathway in mine.pathways then do (mine, pathway) ->

      # Now add the pathway for this mine into the grid.
      grid.add pathway, mine['name'], $("<span/>", 'class': 'label label-success', 'text':  'Yes')