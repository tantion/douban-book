define(function(require,a,b){"use strict";function c(){var a={},b=h("#content"),c=h("#info"),d=h.trim(c.text()),e=d.split(/([^ \n]+):/),f=e.length,g={};return h.each(e,function(a,b){var c,d;a%2===1&&f-1>a&&(c=h.trim(b),d=h.trim(e[a+1].replace(/\n/g,"").replace(/ {2,}/g," ")),g[c]=d)}),a.title=h.trim(h("#wrapper").find('[property="v:itemreviewed"]').text()),a.stars=parseFloat(b.find('[property="v:average"]').text()),a.author=g.hasOwnProperty("作者")?g["作者"]:"",a.year=parseInt(g.hasOwnProperty("出版年")?g["出版年"]:0,10),a.isbn=parseInt(g.hasOwnProperty("ISBN")?g.ISBN:0,10),a}function d(a,b,c){var d=b.data("index"),e=c.find(b.attr("href")),f=b.find("span"),g=k[d];g.search(a).progress(function(a){e.html(a),f.html("..")}).done(function(a,b){e.html(a),f.html(b||0)}).fail(function(){e.html("没有搜到相关的电子书，切换一下其他搜索试试。"),f.html(0)})}function e(a,b){{var c=a.data("index"),d=b.find(a.attr("href"));k[c]}a.siblings().removeClass("active"),a.addClass("active"),d.siblings().removeClass("active"),d.addClass("active")}function f(){var a='<div class="book-improve-bt-container"><div class="book-improve-nav-container">{{#tabs}}{{#index}}&nbsp;|&nbsp;{{/index}}<a class="book-improve-nav" data-index="{{index}}" href="#book-improve-tab-{{index}}">{{name}} (<span>...</span>)</a>{{/tabs}}</div><div class="book-improve-tab-container">{{#tabs}}<div class="book-improve-tab" id="book-improve-tab-{{index}}"></div>{{/tabs}}</div></div>',b=c(),f=null,g=null;return f=h.map(k,function(a,b){return{name:a.name||"未名",index:b}}),g=h(j.render(a,{tabs:f})),g.on("click",".book-improve-nav",function(a){a.preventDefault();var c=h(this);e(c,g),d(b,c,g)}).find(".book-improve-nav").each(function(a){var c=h(this);0===a&&e(c,g),d(b,c,g)}),i.setTitle(b.title+" 电子书列表"),g}function g(){if(location.href.match(/^http:\/\/book\.douban\.com\/subject\/\d+/)){var a=h('<div><span class="pl">电子书:</span> <a href="javascript:">查看列表</a></div>').appendTo("#info").find("a");a.on("click",function(a){a.preventDefault(),i||(i=dui.Dialog({width:700},!0)),i.setContent(f()),i.open()})}}var h=require("jquery"),i=null,j=require("mustache"),k=[require("js/duokan"),require("js/ishare"),require("js/ppurl")];b.exports={init:g}});