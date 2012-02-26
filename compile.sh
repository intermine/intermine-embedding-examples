# compile CoffeeScript
coffee --compile --output js/ src/
cd src
# create dirs
find . -type d -exec mkdir -p ../js/{} \;
# copy over any other files
find . -type f -not \( -iname "*.coffee" \) -exec cp -rf {} ../js/{} \;
# compile eco templates and remove them
cd ../js/templates
# template_namespace window.JST for all compiled templates
find . -type f \( -iname '*.eco' \) -exec eco {} -o . -i "JST" \; -exec rm -rf {} \;
# uglify-js on templates
if type uglifyjs &> /dev/null ; then
    find . -type f \( -iname '*.js' \) -exec uglifyjs -o {} {} \;
fi