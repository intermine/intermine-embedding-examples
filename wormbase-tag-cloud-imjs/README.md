Example of creating an `imjs` displayer on a WormBase page

## Configure:
See `index.html` and edit:

```javascript
(function() {
    var metabolicmine = new intermine.Service({ root: "test.metabolicmine.org/test" });
    var query = {
        select: ["homologues.homologue.id", "homologues.homologue.alleles.id", "homologues.homologue.alleles.genotypes.id"],
        from: "Gene",
        where: {
            id: { eq: 1015457 }
        }
    };
    metabolicmine.query(query, function(q) {
        q.summarise("homologues.homologue.alleles.genotypes.phenotypeTerms.name", function(items) {
            _(items).each(function(row, index) {
                $('#intermine-content').append($('<span/>', {
                    'text': row.item,
                    'class': 'size' + row.count,
                }));
            });
        });
    });
})();
```

## Example:
![image](https://github.com/radekstepan/intermine-embedding-examples/raw/master/wormbase-tag-cloud-imjs/example.png)
