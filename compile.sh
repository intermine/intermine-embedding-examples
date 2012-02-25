# compile CoffeeScript
coffee --compile --output js/ src/
cd src
# create dirs
find . -type d -exec mkdir -p ../js/{} \;
# copy over any other files
find . -type f -not \( -iname "*.coffee" \) -exec cp -rf {} ../js/{} \;
# compile eco templates
cd ../js/templates
find . -type f \( -iname '*.eco' \) -exec eco {} \; -exec rm -rf {} \;