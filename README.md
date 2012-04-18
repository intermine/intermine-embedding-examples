InterMine Web Services demos and examples through the use of `imjs` or `widgets`.

## Content:

1. `object-in-bag-imjs` show for a list of InterMine objects if they are in a user's bag or not
1. `publications-displayers-imjs` a proof of concept displayers by defining behaviors in JavaScript
1. `ratmine-widgets` enrichment widgets embedded and styled on a RatMine page

## To Run:

Initialize the library dependencies:

```shell
$ git submodule init
$ git submodule update
```

Visit each of the example folders and follow instructions there.

## Cross-Site Scripting Error:

If you see an error running the demos 'as a file://' then start the web server `./webserver.sh` and visit `0.0.0.0:1112`.