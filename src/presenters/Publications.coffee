# Returned object.
class Presenter
    
    constructor: (@options) ->
        options.output($('<p/>', {"html": "Building #{options.displayerName} displayer for #{options.imObj} object"}))

# Save on a callback and trigger us being ready.
window.Callbacks.call("g5VekAcU", Presenter)