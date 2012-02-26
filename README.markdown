Service Client for embedding InterMine Displayers that does not make you have a Struts/JSP rage...

## Requirements:
- jQuery (included)
- underscore.js (included)
- backbone.js (included, only if you want to)
- CoffeeScript & [eco](https://github.com/sstephenson/eco) templating (you should want to, they are nice)
- [uglify-js](https://github.com/mishoo/UglifyJS) (only if you want to)
- [flymine.org/query/service](http://www.flymine.org/query) should be up!

## Usage:
1. <code>./compile.sh</code>
    1. .coffee files get compiled
    1. directory structure is recreated
    1. any other files are copied over
    1. .eco files get compiled
    1. (optional) templates get minified
1. <code>./webserver.sh</code>

## Example:
![image](https://raw.github.com/radekstepan/intermine-displayer-client/master/example.png)