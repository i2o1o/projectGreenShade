/**
 * jQuery center plugin
 * Centers an element in the browser window
 * @version 0.0.2
 * @author skresge
 */
(function(jQuery){
  jQuery.fn.center = function(c) {
	 c = jQuery.extend({position: 'absolute'}, c || {}); 
    var pos = {
      sTop : function() {
	      return window.pageYOffset || jQuery.support.boxModel && document.documentElement.scrollTop || document.body.scrollTop; 
      },
      wHeight : function() {
	     if ( jQuery.browser.opera || (jQuery.browser.safari && parseInt (jQuery.browser.version) > 520) ) {
	        return window.innerHeight - ((jQuery(document).height() > window.innerHeight) ? getScrollbarWidth() : 0); 
        } else if ( jQuery.browser.safari ) {
           return window.innerHeight;
        } else {
	        return jQuery.support.boxModel && document.documentElement.clientHeight || document.body.clientHeight; 
        }
      },
      sLeft : function() {
         return window.pageXOffset || jQuery.support.boxModel && document.documentElement.scrollLeft || document.body.scrollLeft; 
      },
      wWidth : function() {
		  if ( jQuery.browser.opera || (jQuery.browser.safari && parseInt (jQuery.browser.version) > 520) ) {
          return window.innerWidth - ((jQuery(document).width() > window.innerWidth) ? getScrollbarWidth() : 0); 
        } else if ( jQuery.browser.safari ) {
          return window.innerWidth;
        } else {
			 return jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth; 
        }
      }
    };
    return this.each(function(index) {
      if (index == 0) {
        var elHeight = jQuery(this).height();
        var elWidth = jQuery(this).width();
		  var newX = ((pos.wWidth() / 2) - (elWidth / 2));
		  var newY = ((pos.wHeight() / 2) - (elHeight / 2));
		  if(c.position == "absolute") {
			 var newX = (newX + pos.sLeft());
			 var newY = (newY + pos.sTop());
		  }
        jQuery(this).css({position: c.position, marginTop: '0', top: newY, left: newX});
      }
    });
  };
})(jQuery);

//------------------------------------------------------------------------------------
// Moderation functions
//------------------------------------------------------------------------------------
/**
 * moderate
 * @desc - Creates and displays dialog for reporting questionable content. Iframe is populated by the plugin.
 * @param href {string} - value for the iframe src attribute.
 */
moderate = function (href) {
	var isIE6 = (jQuery.browser.name == 'msie' && jQuery.browser.versionNumber < 7)?true:false;

	/* create the containing element and position it */
	var overlay = document.createElement("div");
	overlay.setAttribute("id", "ModerateOverlay");
	overlay.setAttribute("class", "jqmWindow");
	//document.getElementById("PageContent").appendChild(overlay);
	document.body.appendChild(overlay);

	/* create the rounded corner box */
	var boxtop = document.createElement("div");
	(isIE6) ? boxtop.setAttribute("id", "BoxTopIE6") : boxtop.setAttribute("id", "BoxTop");
	var box = document.createElement("div");
	box.setAttribute("id", "Box");
	var boxbottom = document.createElement("div");
	boxbottom.setAttribute("id", "BoxBottom");
	overlay.appendChild(boxtop);
	overlay.appendChild(box);
	if (!isIE6) overlay.appendChild(boxbottom);

	/* create the close link */
	jQuery("#BoxTop,#BoxTopIE6").html('<a href="" title="Click to close" class="jqmClose" id="ModerateClose"><!-- --></a>');

	/* create the iframe for the moderation form */
	var iframe = document.createElement("iframe");
	iframe.setAttribute("id", "ModerateIframe");
	(jQuery.browser.name == 'msie') ? iframe.setAttribute("frameBorder", "0") : iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("src", href);
	iframe.setAttribute("scrolling", "no");
	box.appendChild(iframe);

	var destroyJQM = function(hash) {hash.o.remove();jQuery("#ModerateOverlay").remove();}; //clean up - removes moderate dialog when closed
	jQuery("#ModerateOverlay").center();
	jQuery("#ModerateOverlay").jqm({ overlay:30.01, modal:true, onHide: destroyJQM });
	jQuery("#ModerateOverlay").jqmShow();

	return false;
};