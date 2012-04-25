
try {
var pageTracker = _gat._getTracker("UA-11017903-1");
pageTracker._setDomainName(".informatics.jax.org");
pageTracker._trackPageview();
} catch(err) {}


///////
//edits by KLF based on gaAddons.js v2.7 -- NOT THE LATEST VERSION!
//	@Author Stéphane Hamel - shamel@immeria.net - http://immeria.net
//       http://blog.immeria.net/2009/01/google-analytics-script-to-track.html
//@Author Andy Edmonds - http://alwaysbetesting.com
//@Author Damon Gudaitis - http://www.damongudaitis.com/
//Changelog:
//v2.7 - Nov. 10 2009 - Further improvement to outbound links tracking
//v1.0 - Inspired by the work of Justin Cutroni - Google Analytics Short Cut - http://gashortcut.com/
///////
/*
 * @fileoverview Wrapper for gaAddons
 */
var gaA_fileTypes = new RegExp(/\.(docx*|xlsx*|pptx*|exe|zip|pdf|xpi|txt|csv)$/i);
//		Indicate each file extension that needs to be tracked, 
//	gaA_fileTypes is the regular expression that matches downloadable files
var gaA_pageTracker = pageTracker; // Should be set to the name of your tracker variable
var K3 = window.location.href; // KLF added to capture referring page path
/**
 * @class ga Addons component.
 *     This class encapsulates all logic for the Google Analytics addons
 * @constructor
 */
var gaAddons = function(){
/**
 * startListening: add a new listner for onclick event, handle Mozilla or IE methods
 * KLF CHANGING TO ONMOUSEUP RATHER THAN ONCLICK 
 * TO CATCH RIGHT-CLICK EVENTS FOR OPENING IN NEW TAB OR NEW WINDOW SINCE THESE ARE EXTERNAL LINKS 
 * @param {Object} obj HREF object to listen to
 * @param {String} evnt event type (usually "click") - KLF CHANGE TO MOUSEUP
 * @param {Object} func Function to call when evnt is triggered
 */
var startListening = function(obj, evnt, func){
    if (obj.addEventListener) 
        obj.addEventListener(evnt, func, false);
    else 
        if (obj.attachEvent) 
            obj.attachEvent("on" + evnt, func);
}
/**
 * trackDocument: make GA call when downloading one of detected file extension
 * @param {Object} evnt Object where the event happened
 */
var trackDocument = function(evnt){
	evnt=evnt||event;
	var elmnt = evnt.srcElement||evnt.target;
	var pathname = ("/" + elmnt.pathname).replace(/\/\//,'');
    gaA_pageTracker._trackEvent("download", K3, pathname);
}
/**
 * trackExternalLink: make GA call when clicking an outbound link
 * @param {Object} evnt Object where the event happened
 */
var trackExternalLink = function(evnt){
	evnt=evnt||event;
    var elmnt = evnt.srcElement||evnt.target;
    if (elmnt) {
        while (elmnt.tagName != "A") 
            elmnt = elmnt.parentNode;
        if (/http/.test(elmnt.protocol)) {
			url = elmnt.href.substr(elmnt.href.indexOf('//')+2,Infinity);
			gaA_pageTracker._trackEvent("outbound", K3, url);
		}
        if (elmnt.protocol == "mailto:") 
            gaA_pageTracker._trackEvent("mailto", "mouseup", elmnt.href.replace(/mailto:/, ""));
    }
    else {
        if (/http/.test(this.protocol)) {
			url = this.href.substr(this.href.indexOf('//')+2,Infinity);
			gaA_pageTracker._trackEvent("outbound", K3, url);
		}
        if (this.protocol == "mailto:") 
            gaA_pageTracker._trackEvent("mailto", "mouseup", this.href.replace(/mailto:/, ""));
    }
}
/**
 * Initialize gaAddons
 */
if (document.getElementsByTagName && typeof gaA_pageTracker == "object") {
    var hrefs = document.getElementsByTagName('a');
    for (var l = 0, m = hrefs.length; l < m; l++) 
        if (gaA_fileTypes.test(hrefs[l].pathname)) 
            startListening(hrefs[l], "mouseup", trackDocument);
        else 
            if (hrefs[l].hostname != location.hostname) 
                startListening(hrefs[l], "mouseup", trackExternalLink);
}
}
//
//
if (window.addEventListener) // Standard
window.addEventListener('load', gaAddons, false);
else 
if (window.attachEvent) // old IE
    window.attachEvent('onload', gaAddons);
//
//		ADDING CODE TO TRACK BROWSER VIEWPORT INITIAL DIMENSIONS ON PAGELOAD. 
//		CAPTURES RESIZING ONLY IF USER LOADS SUBSEQUENT PAGE AT NEW SIZE. 
//		USES ASYNCH CODE SO CONVERTED TO OLD-TYPE CODE. 
//		BASED ON http://beantin.se/post/354097397/track-viewport-google-analytics
function viewport() {
var myWidth = 0, myHeight = 0;
if( typeof( window.innerWidth ) == 'number' ) {
//Non-IE
  myWidth = window.innerWidth;
  myHeight = window.innerHeight;
} else if( document.documentElement &&
 ( document.documentElement.clientWidth
 || document.documentElement.clientHeight ) ) {
//IE 6+ in 'standards compliant mode'
myWidth = document.documentElement.clientWidth;
myHeight = document.documentElement.clientHeight;
} else if( document.body &&
 ( document.body.clientWidth
 || document.body.clientHeight ) ) {
//IE 4 compatible
myWidth = document.body.clientWidth;
myHeight = document.body.clientHeight;
}
  mySize = myWidth+"X"+myHeight;
gaA_pageTracker._trackEvent("viewport", "size", mySize);
gaA_pageTracker._trackEvent("viewport", "width", mySize, myWidth);
gaA_pageTracker._trackEvent("viewport", "height", mySize, myHeight);
}
//
//		KLF DELAY CAPTURE OF ONLOAD EVENTS BY 6 SECONDS
//	SO THAT EVERY PAGE LOAD ISN'T COUNTED AS A HIT -- 
//	FAST PAGEVIEWS THAT DON'T INTERACT SHOULD STILL COUNT AS A BOUNCE!
//function viewportDelay() {
//setTimeout("viewport()", 6000);
//}
//		http://bonsaiden.github.com/JavaScript-Garden/#other.timeouts SAYS TO NEVER DO THE ABOVE.
//		CHANGING TO THE ANONYMOUS FUNCTION REPLACING THE STRING, BELOW, AS RECOMMENDED.
function viewportDelay() {
setTimeout(function() {
	viewport();
}, 6000);
}
//
viewportDelay();
//
/// EOF ///
