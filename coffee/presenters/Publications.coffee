# Returned object.
class Presenter
    
    # Expand options on us.
    constructor: (o) -> @[k] = v for k, v of o

    render: =>
        # The header.
        $(@el).append _.template(@templates["header-template"].html(),
            "imObj": @imObj
            "displayerName": @displayerName
        )

        # The table.
        $(@el).append _.template(@templates["table-template"].html(),
            "data": @data
        )

# Save on a callback and trigger us being ready.
window.Callbacks.call("g5VekAcU", Presenter)