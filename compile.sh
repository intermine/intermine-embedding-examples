coffee --compile --output js/ coffee/
cd coffee
find . -type d -exec mkdir -p ../js/{} \;
find . -type f -not \( -iname "*.coffee" \) -exec cp -rf {} ../js/{} \;