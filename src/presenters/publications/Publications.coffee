# Returned object.
class Publications extends Displayers.Presenter

    render: =>
        # The header.
        $(@el).append @templates["_header"]?(
            "imObj": @imObj
            "displayerName": @displayerName
        )

        # The table, show just first 3.
        $(@el).append @templates["_table"]?("data": @data[0].publications[0..2])

# Save on a callback and trigger us being ready (rendered by the server with our callback key).
Displayers.Resources.loaded("g5VekAcU", "presenter", Publications)