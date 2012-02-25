# Global space.
window.Displayers = (window.Displayers and console.log "things may go #@!") or {}

class Displayers.Presenter

    constructor: (o) -> @[k] = v for k, v of o

    # Helper for templating.
    templatize: (key, data) => _.template(@templates[key].html(), data)


# Store callbacks here.
class Displayers.Callbacks

    store: {}

    # Save my number and call me.
    me: (key, options, callback) =>
        @store[key] =
            "options":  options
            "callback": callback

    # I am calling now.
    call: (key, object) => if @store[key] then @store[key].callback(object, @store[key].options)


class Displayers.Client
    
    constructor: -> Displayers.Callbacks = new Displayers.Callbacks()

    # Render displayer.
    load: (imObj, displayerName, el) =>
        options = { "imObj": imObj, "displayerName": displayerName, "el": el, "templates": {}, "data": {} }
        console.log "loading #{options.displayerName} in #{options.el}"

        # The server in its infinite wisdome gives is this config.
        config =
            "Publications":
                templates: "_publications.html"
                presenter: "Publications.js"
                callback:  "g5VekAcU"
            "backbone.js Publications":
                templates: "_publications.html"
                presenter: "Publications.backboned.js"
                callback:  "xEnEYa35"

        # Get the templates.
        templates = do ->
            result = ""
            $.ajax
                async: false
                url: "js/templates/#{config[options.displayerName].templates}"
                success: (data) -> result = data
            result

        # Process them better.
        for template in $(templates)
            o = $(template)[0]
            options.templates[$(o).attr("id")] = $(o) if o.tagName is "SCRIPT"

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

        # Append a new script.
        script = document.createElement("script")
        script.type = "text/javascript"
        script.language = "javascript"
        script.src = "js/presenters/#{config[options.displayerName].presenter}"
        head = document.getElementsByTagName("head")[0]
        head.appendChild(script)

        # When you are loaded, call me...
        Displayers.Callbacks.me(config[displayerName].callback, options, @render)

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