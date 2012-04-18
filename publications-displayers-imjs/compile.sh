#!/bin/sh

compile() {
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
    # come back up...
    cd ../../
}

daemon() {
    chsum1=""
    while [[ true ]]
    do
        chsum2=`find src/ -type f -exec md5 {} \;`
        if [[ $chsum1 != $chsum2 ]] ; then           
            compile
            chsum1=`find src/ -type f -exec md5 {} \;`
        fi
        sleep 2
    done
}

# use daemon?
if [[ "$#" == 1 && $1 == "-d" ]] ; then
    daemon
else
    compile
fi