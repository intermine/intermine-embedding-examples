class DisplayerServer

    getData: ->
        [
                title: "An age-dependent diet-modified effect of the PPARγ Pro12Ala polymorphism in children."
                authors: "Dedoussis GV"
                journal: "Metabolism"
                year: 2011
            ,
                title: "Peroxisome proliferator-activated receptor-gamma (PPAR-γ) expression is downreg..."
                authors: "Yamamoto-Furusho JK"
                journal: "Inflamm Bowel Dis"
                date: 2011
            ,
                title: "Gender differences in the effects of peroxisome proliferator-activated receptor ..."
                authors: "Chen CH"
                journal: "Prog Neuropsychopharmacol Biol Psychiatry"
                year: 2011
        ]


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
    load: (@imObj, @displayerName, @output) =>
        # Append a new script aka call a server RESTfully.
        script = document.createElement("script")
        script.type = "text/javascript"
        script.language = "javascript"
        script.src = "js/presenters/Publications.js"
        head = document.getElementsByTagName("head")[0]
        head.appendChild(script)

        # When you are loaded, call me...
        window.Callbacks.me("g5VekAcU", @render)

    # Is called with a loaded object.
    render: (Presenter) => new Presenter({"imObj": @imObj, "displayerName": @displayerName, "output": @output})

    # Get (and or create) a server connection.
    connection: => @server or @server = new DisplayerServer()


$ ->
    client = new DisplayerClient()
    # Ask for a pparg publications displayer and dump to output into a div.
    client.load("pparg", "publications", (output) -> $("#displayer").html(output))