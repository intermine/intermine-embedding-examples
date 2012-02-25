# Global space.
window.Displayers = (window.Displayers and console.log "things may go #@!") or {}

class Displayers.Presenter

    constructor: (o) -> @[k] = v for k, v of o


# Store callbacks here.
class Displayers.Resources

    store: {}

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


class Displayers.Client
    
    constructor: -> @resources = Displayers.Resources = new Displayers.Resources()

    # Render displayer.
    load: (imObj, displayerName, el) =>
        # The server in its infinite wisdom gives us this config.
        config =
            "Publications":
                prefix: "publications"
                templates: [ "_header.js", "_table.js" ]
                presenter: "Publications.js"
                callback:  "g5VekAcU"
            "backbone.js Publications":
                prefix: "publications"
                templates: [ "_header.js", "_table.js" ]
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

        # Set up 3 resources on the callback (1x presenter, 2x template).
        @resources.set(config[displayerName].callback, config[displayerName].prefix, 3, options, @render)

        # 'Fetch' the data.
        options.data = [
                title: "An age-dependent diet-modified effect of the PPARγ Pro12Ala polymorphism in children."
                authors: "Dedoussis GV"
                journal: "Metabolism"
                year: 2011
            ,
                title: "Peroxisome proliferator-activated receptor-gamma (PPAR-γ) expression is downreg..."
                authors: "Yamamoto-Furusho JK"
                journal: "Inflamm Bowel Dis"
                year: 2011
            ,
                title: "Gender differences in the effects of peroxisome proliferator-activated receptor ..."
                authors: "Chen CH"
                journal: "Prog Neuropsychopharmacol Biol Psychiatry"
                year: 2011
        ]

        # Grab templates, they go globally so we can use getScript and not pass anything to callback.
        for path in config[options.displayerName].templates
            $.getScript("js/templates/#{config[options.displayerName].prefix}/#{path}", =>
                @resources.loaded(config[options.displayerName].callback, "template"))

        # Append a new presenter script.
        script = document.createElement("script")
        script.type = "text/javascript"
        script.language = "javascript"
        script.src = "js/presenters/#{config[options.displayerName].prefix}/#{config[options.displayerName].presenter}"
        head = document.getElementsByTagName("head")[0]
        head.appendChild(script)

    # Is called with a loaded object.
    render: (Clazz, options) =>
        p = new Clazz(options)
        p.render()


$ ->
    client = new Displayers.Client()
    # Ask for a pparg publications displayer and dump to output into a div.
    client.load("PPARG", "Publications", "#displayer")
    # Ask for a pparg publications displayer and dump to output into a div (backboned).
    client.load("PPARG", "backbone.js Publications", "#backbone")