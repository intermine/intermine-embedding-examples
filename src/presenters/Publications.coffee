# Returned object.
class Publications extends Displayers.Presenter

    render: =>
        # The header.
        $(@el).append @templatize("header-template",
            "imObj": @imObj
            "displayerName": @displayerName
        )

        # The table.
        $(@el).append @templatize("table-template", "data": @data)

# Save on a callback and trigger us being ready (rendered by the server with our callback key).
Displayers.Callbacks.call("g5VekAcU", Publications)