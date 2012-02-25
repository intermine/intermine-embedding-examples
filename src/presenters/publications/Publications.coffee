# Returned object.
class Publications extends Displayers.Presenter

    render: =>
        # The header.
        $(@el).append @templates["_header"]?(
            "imObj": @imObj
            "displayerName": @displayerName
        )

        # The table.
        $(@el).append @templates["_table"]?("data": @data)

# Save on a callback and trigger us being ready (rendered by the server with our callback key).
Displayers.Resources.loaded("g5VekAcU", "presenter", Publications)