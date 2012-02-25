class Publication extends Backbone.Model

class Publications extends Backbone.Collection
    
    model: Publication

class Backboned extends Backbone.View

    # Which page are we on?
    page: 0

    # This is where we keep a Collection of data per page.
    pages: []

    events:
        "click .btn-group a": "paginate"

    initialize: (o) ->
        # Expand on me.
        @[k] = v for k, v of o

        # Make data into Collections of 3 Models.
        publications = @data[0].publications
        while publications.length
            @pages.push new Publications( publications.splice(0, 3) )

        # The header.
        $(@el).append @templates["_header"]?(
            "imObj": @imObj
            "displayerName": @displayerName
        )
        # Targets so that render works with re-rendering too.
        $(@el).append ($('<div/>', { "class": "table" }))
        $(@el).append ($('<div/>', { "class": "btn-group" }))

    paginate: (e) =>
        # Change the page.
        @page = parseInt($(e.target).text())
        @render()

    render: ->
        # The table.
        $(@el).find(".table").html @templates["_table"]?("data": @pages[@page].toJSON())

        # The paginator.
        $(@el).find(".btn-group").html @templates["_paginator"]?({ "pages": @pages.length - 1, "current": @page })

# Save on a callback and trigger us being ready (rendered by the server with our callback key).
Displayers.Resources.loaded("xEnEYa35", "presenter", Backboned)