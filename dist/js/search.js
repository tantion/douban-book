define("js/search",["js/duokan","js/ishare","js/ppurl","js/baidu"],function(require,a,b){"use strict";function c(){var a={},b=k("#content"),c=k("#info"),d=k.trim(c.text()),e=d.split(/([^ \n]+):/),f=e.length,g={};return k.each(e,function(a,b){var c,d;a%2===1&&f-1>a&&(c=k.trim(b),d=k.trim(e[a+1].replace(/\n/g,"").replace(/ {2,}/g," ")),g[c]=d)}),a.title=k.trim(k("#wrapper").find('[property="v:itemreviewed"]').text()),a.stars=parseFloat(b.find('[property="v:average"]').text()),a.author=g.hasOwnProperty("作者")?g["作者"]:"",a.year=parseInt(g.hasOwnProperty("出版年")?g["出版年"]:0,10),a.isbn=parseInt(g.hasOwnProperty("ISBN")?g.ISBN:0,10),a}function d(){var a={};return a.title=k.trim(k(".article-title").text()),a}function e(a,b,c){var d=b.data("index"),e=c.find(b.attr("href")),f=b.find("span"),g=n[d];g.search(a).progress(function(a){e.html(a),f.html("..")}).done(function(a,b){e.html(a),f.html(b||0)}).fail(function(){e.html("没有搜到相关的电子书，切换一下其他搜索试试。"),f.html(0)})}function f(a,b){{var c=a.data("index"),d=b.find(a.attr("href"));n[c]}a.siblings().removeClass("active"),a.addClass("active"),d.siblings().removeClass("active"),d.addClass("active")}function g(a){var b='<div class="book-improve-bt-container"><div class="book-improve-nav-container">{{#tabs}}{{#index}}&nbsp;|&nbsp;{{/index}}<a class="book-improve-nav" data-index="{{index}}" href="#book-improve-tab-{{index}}">{{name}} (<span>...</span>)</a>{{/tabs}}</div><div class="book-improve-tab-container">{{#tabs}}<div class="book-improve-tab" id="book-improve-tab-{{index}}"></div>{{/tabs}}</div></div>',c=null,d=null;return c=k.map(n,function(a,b){return{name:a.name||"未名",index:b}}),d=k(m.render(b,{tabs:c})),d.on("click",".book-improve-nav",function(b){b.preventDefault();var c=k(this);f(c,d),e(a,c,d)}).find(".book-improve-nav").each(function(b){var c=k(this);0===b&&f(c,d),e(a,c,d)}),l.setTitle(a.title+" 电子书列表"),d}function h(a){l||(l=dui.Dialog({nodeId:"book-improve-dialog",width:700},!0)),l.setContent(g(a)),l.open()}function i(){var a=k('<div><span class="pl">电子书:</span> <a href="javascript:">查看列表</a></div>').appendTo("#info").find("a"),b=c();a.on("click",function(a){a.preventDefault(),h(b)})}function j(){var a=k('<p><span class="label">电子书</span><a href="javascript:">查看列表</a></p>').appendTo(".article-meta").find("a").css({fontSize:"12px"}),b=d();a.on("click",function(a){a.preventDefault(),h(b)})}var k=require("jquery"),l=null,m=require("mustache"),n=[require("js/duokan"),require("js/ishare"),require("js/ppurl"),require("js/baidu")];b.exports={init:function(){var a=location.href;a.match(/^http:\/\/book\.douban\.com\/subject\/\d+/)?i():a.match(/^http:\/\/read\.douban\.com\/ebook\/\d+/)&&j()}}});