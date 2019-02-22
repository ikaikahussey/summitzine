// Thanks to Bill Bercik for the code on which the below snippet is based
// http://www.webpasties.com/xmlHttpRequest/

var basetitle = document.title;
var i = 0;
var xmlhttp=false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
 try {
  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
  try {
   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
   xmlhttp = false;
  }
 }
@end @*/

if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
	xmlhttp = new XMLHttpRequest();
}

function getUpdates(serverPage, objID) {
	i++;
	var obj = document.getElementById(objID);
	xmlhttp.open("GET", serverPage);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var numposts = xmlhttp.responseText - 1;
			if (numposts > 0) {
				var b = "s";
				if (numposts == 1) {
					var b = "";
				}
				obj.innerHTML = "<a href=\"/\"><i class=\"fa fa-refresh\" style=\"color:#aaaaaa\"></i> &nbsp;Psst! Please refresh for <b style=\"text-decoration:underline;\">" + numposts + " new post" + b + "</b>.&nbsp; <i class=\"fa fa-refresh\" style=\"color:#aaaaaa\"></i></a>";
				obj.style.display = "block";
				document.title = "(" + numposts + ") " + basetitle;
			}
		}
	}
	xmlhttp.send(null);
	if (i > 100) {
		clearInterval(intvId);
	}
}