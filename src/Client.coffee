# Global space.
window.Displayers = (window.Displayers and console.log "things may go #@!") or {}

class Displayers.Presenter

    constructor: (o) -> @[k] = v for k, v of o


# Store callbacks here.
class Displayers.Resources

    store: {}

    service: new intermine.Service(root: "www.flymine.org/query")

    # ----------- callbacks

    # Save my number and call me.
    set: (key, prefix, count, options, callback) =>
        @store[key] =
            "options":  options
            "count":    count # How many resources should we wait for?
            "prefix":   prefix
            "callback": callback

    # I am calling now.
    loaded: (key, type, object) =>
        resource = @store[key]
        if resource
            # One thing loaded.
            resource.count -= 1

            # Different handling based on resource type.
            switch type
                # Presenter.
                when "presenter" then resource["object"] = object
                # JSON data
                when "data" then resource.options.data = object
                # eco templates.
                when "template"
                    for k, v of window.eco # This is where the object is.
                        p = "./#{resource.prefix}/" # Would be nice to get rid of leading './'
                        if not k.indexOf(p) # Our prefix.
                            resource.options.templates[k.substr(p.length)] = v # Save the template f().

            # If no more, then just call the callback.
            if not resource.count then resource.callback(resource["object"], resource["options"])
            
            # Save it for the future.
            else @store[key] = resource
        else
            console.log "#{key} resource not recognized"

    # ----------- dynamic loading

    getTemplate: (cb, prefix, path) =>
        # Maybe the template exists already and we can ring the bell immediately?
        for k, v of window.eco # This is where the object is.
            return @loaded(cb, "template") if not "./#{prefix}/#{path}".indexOf(k)
        
        # Business as usual.
        $.getScript "js/templates/#{prefix}/#{path}", =>
            @loaded(cb, "template")

    getPresenter: (cb, prefix, path) =>
        script = document.createElement("script")
        script.type = "text/javascript"
        script.language = "javascript"
        script.src = "js/presenters/#{prefix}/#{path}"
        head = document.getElementsByTagName("head")[0]
        head.appendChild(script)

    getData: (cb, query) =>
        @service.query(query
        , (q) =>
            console.log q.toXML()
            q.records (json) =>
                @loaded(cb, "data", json)
        )


class Displayers.Client
    
    constructor: -> @resources = Displayers.Resources = new Displayers.Resources()

    # Render displayer.
    load: (imObj, displayerName, el) =>
        # The server in its infinite wisdom gives us this config.
        config =
            "Publications":
                prefix: "publications"
                templates: [ "_header.js", "_table.js", "_paginator.js" ]
                presenter: "Publications.js"
                callback:  "g5VekAcU"
            "backbone.js Publications":
                prefix: "publications"
                templates: [ "_header.js", "_table.js", "_paginator.js" ]
                presenter: "Publications.backboned.js"
                callback:  "xEnEYa35"

        options =
            "imObj": imObj
            "displayerName": displayerName
            "prefix": config[displayerName].prefix
            "el": el
            "templates": {}
            "data": {}
        
        console.log "loading #{options.displayerName} in #{options.el}"

        cb = config[displayerName].callback
        prefix = config[options.displayerName].prefix

        # Set up 5 resources on the callback (1x presenter, 3x templates, 1x payload).
        @resources.set(cb, config[displayerName].prefix, 5, options, @render)

        # Grab the data.
        @resources.getData(cb,
            select: [ "publications.title", "publications.year", "publications.journal", "publications.authors.name" ]
            from: "Gene"
            where:
                "ncbiGeneNumber":
                    "=": 34430 # TfIIB
            joins: [ "publications.authors" ]
        )

        # Grab templates, they go globally so we can use getScript and not pass anything to callback.
        for path in config[options.displayerName].templates
            @resources.getTemplate(cb, prefix, path)

        # Append a new presenter script.
        @resources.getPresenter(cb, prefix, config[options.displayerName].presenter)

    # Is called with a loaded object.
    render: (Clazz, options) =>
        p = new Clazz(options)
        p.render()


$ ->
    client = new Displayers.Client()
    # Ask for a TfIIB publications displayer and dump to output into a div.
    client.load("TfIIB", "Publications", "#displayer")
    # Ask for a TfIIB publications displayer and dump to output into a div (backboned).
    client.load("TfIIB", "backbone.js Publications", "#backbone")