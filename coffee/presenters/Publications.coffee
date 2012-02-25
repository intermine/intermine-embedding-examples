# Returned object.
class Publications extends Displayers.Presenter

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
Displayers.Callbacks.call("g5VekAcU", Publications)