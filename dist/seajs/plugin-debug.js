!function(a,b,c,d){function e(a){var b=new Date;b.setTime(b.getTime()+2592e6),c.cookie="seajs-debug="+a.debug+"`"+a.mapfile+"`"+a.console+"; path=/; expires="+b.toUTCString()}function f(a){l++,c.body?c.body.appendChild(a):k>l&&setTimeout(function(){f(a)},200)}var g;b="";var h;if((h=c.cookie.match(/(?:^| )seajs-debug(?:(?:=([^;]*))|;|$)/))&&(b=h[1]?decodeURIComponent(h[1]):""),b=b.split("`"),g={debug:Number(b[0])||0,mapfile:b[1]||"",console:Number(b[2])||0},-1<d.search.indexOf("seajs-debug")&&(g.debug=1,g.console=1,e(g)),g.debug&&a.config({debug:!0}),g.mapfile&&(c.title="[seajs debug mode] - "+c.title,a.config({preload:g.mapfile})),g.console){b='<div id="seajs-debug-console">  <h3>SeaJS Debug Console</h3>  <label>Map file: <input value="'+g.mapfile+'"/></label><br/>  <button>Exit</button>  <button>Hide</button>  <button>Save</button></div>';var i=c.createElement("div");i.innerHTML=b,b=c.createElement("style"),c.getElementsByTagName("head")[0].appendChild(b),b.styleSheet?b.styleSheet.cssText="#seajs-debug-console {   position: fixed; bottom: 10px;   *position: absolute; *top: 10px; *width: 465px;   right: 10px; z-index: 999999999;  background: #fff; color: #000; font: 12px arial;  border: 2px solid #000; padding: 0 10px 10px;}#seajs-debug-console h3 {  margin: 3px 0 6px -6px; padding: 0;  font-weight: bold; font-size: 14px;}#seajs-debug-console input {  width: 400px; margin-left: 10px;}#seajs-debug-console button {  float: right; margin: 6px 0 0 10px;  box-shadow: #ddd 0 1px 2px;  font-size: 14px; padding: 4px 10px;  color: #211922; background: #f9f9f9;  text-shadow: 0 1px #eaeaea;  border: 1px solid #bbb; border-radius: 3px;  cursor: pointer; opacity: .8}#seajs-debug-console button:hover {  background: #e8e8e8; text-shadow: none; opacity: 1}#seajs-debug-console a {  position: relative; top: 10px; text-decoration: none;}":b.appendChild(c.createTextNode("#seajs-debug-console {   position: fixed; bottom: 10px;   *position: absolute; *top: 10px; *width: 465px;   right: 10px; z-index: 999999999;  background: #fff; color: #000; font: 12px arial;  border: 2px solid #000; padding: 0 10px 10px;}#seajs-debug-console h3 {  margin: 3px 0 6px -6px; padding: 0;  font-weight: bold; font-size: 14px;}#seajs-debug-console input {  width: 400px; margin-left: 10px;}#seajs-debug-console button {  float: right; margin: 6px 0 0 10px;  box-shadow: #ddd 0 1px 2px;  font-size: 14px; padding: 4px 10px;  color: #211922; background: #f9f9f9;  text-shadow: 0 1px #eaeaea;  border: 1px solid #bbb; border-radius: 3px;  cursor: pointer; opacity: .8}#seajs-debug-console button:hover {  background: #e8e8e8; text-shadow: none; opacity: 1}#seajs-debug-console a {  position: relative; top: 10px; text-decoration: none;}")),f(i),b=i.getElementsByTagName("button"),b[2].onclick=function(){var a=i.getElementsByTagName("input")[0].value||"";g.mapfile=a,e(g),d.reload()},b[1].onclick=function(){g.console=0,e(g),d.replace(d.href.replace("seajs-debug",""))},b[0].onclick=function(){g.debug=0,e(g),d.replace(d.href.replace("seajs-debug",""))}}if(!a.find){var j=a.cache;a.find=function(a){var b,c=[];for(b in j)if(j.hasOwnProperty(b)&&("string"==typeof a&&-1<b.indexOf(a)||a instanceof RegExp&&a.test(b))){var d=j[b];d.exports&&c.push(d.exports)}return c}}var k=100,l=0}(seajs,this,document,location);