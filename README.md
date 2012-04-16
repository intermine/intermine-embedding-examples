Example of embedding InterMine Widgets on RatMine Diabetes Portal page

## Configure:
See `index.html` and edit:

```javascript
(function() {
    /* InterMine root URL. */
    var mine = "http://aragorn:8080/flymine";

    /* New Widgets client. */
    var widgets = new Widgets(mine + "/service/");

    /* Give us BDGP Expression Patterns Enrichment Widget. */
    widgets.enrichment('go_enrichment_for_gene', 'demo-genes', '#go-widget');

    /* Give us Protein Domain Enrichment Widget. */
    widgets.enrichment('prot_dom_enrichment_for_gene', 'demo-genes', '#protein-domain-widget');
})();
```

## Example:
![image](https://raw.github.com/radekstepan/ratmine-widget-example/master/example.png)