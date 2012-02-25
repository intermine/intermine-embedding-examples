# Returned object.
class Presenter
    
    constructor: (@o) ->
        # Title.
        o.el.append( $('<h3/>', {"text": "#{o.imObj} #{o.displayerName} displayer"}) )

        # Render table.
        o.el.append( _.template( o.templates["table-template"].html(), { data: o.data } ) )

# Save on a callback and trigger us being ready.
window.Callbacks.call("g5VekAcU", Presenter)