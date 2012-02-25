# Store callbacks here.
class Callbacks

    store: {}

    # Save my number and call me.
    me: (key, callback) => @store[key] = callback

    # I am calling now.
    call: (key, object) => @store[key]?(object)


class DisplayerClient

    # Init new storage.
    constructor: -> window.Callbacks = new Callbacks()
    
    # Render displayer.
    load: (@imObj, @displayerName, @el) =>
        # Get the templates.
        templates = do ->
            result = ""
            $.ajax
                async: false
                url: "js/templates/_publications.html"
                success: (data) -> result = data
            result

        # Process them better.
        @templates = {}
        for template in $(templates)
            o = $(template)[0]
            @templates[$(o).attr("id")] = $(o) if o.tagName is "SCRIPT"

        # 'Fetch' the data.
        @data = [
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
        script.src = "js/presenters/Publications.js"
        head = document.getElementsByTagName("head")[0]
        head.appendChild(script)

        # When you are loaded, call me...
        window.Callbacks.me("g5VekAcU", @render)

    # Is called with a loaded object.
    render: (Presenter) => new Presenter(
        "imObj":         @imObj
        "displayerName": @displayerName
        "el":            @el
        "data":          @data
        "templates":     @templates
    )


$ ->
    client = new DisplayerClient()
    # Ask for a pparg publications displayer and dump to output into a div.
    client.load("PPARG", "Publications", $("#displayer"))