define(function(require,a,b){"use strict";function c(){var a={},b=h("#content"),c=h("#info"),d=h.trim(h("#content .related-info h2").text());return a.title2=d.replace(/^(.+)的剧情简介.*$/,"$1"),a.title=h.trim(b.find('[property="v:itemreviewed"]').text()),a.stars=parseFloat(b.find('[property="v:average"]').text()),a.actors=h.trim(c.find('[rel="v:starring"]').parent().text()),a.year=parseInt(h.trim(b.find(".year").text()).replace(/\((\d+)\)/,"$1"),10),a.imdb=h.trim(c.find('a[href^="http://www.imdb.com/title/tt"]').text()),a}function d(a,b,c){var d=b.data("index"),e=c.find(b.attr("href")),f=b.find("span"),g=k[d];g.search(a).progress(function(a){e.html(a),f.html("..")}).done(function(a,b){e.html(a),f.html(b||0)}).fail(function(){e.html("没有搜到相关的bt种子，切换一下其他搜索试试。"),f.html(0)})}function e(a,b){{var c=a.data("index"),d=b.find(a.attr("href"));k[c]}a.siblings().removeClass("active"),a.addClass("active"),d.siblings().removeClass("active"),d.addClass("active")}function f(){var a='<div class="movie-improve-bt-container"><div class="movie-improve-nav-container">{{#tabs}}{{#index}}&nbsp;|&nbsp;{{/index}}<a class="movie-improve-nav" data-index="{{index}}" href="#movie-improve-tab-{{index}}">{{name}} (<span>...</span>)</a>{{/tabs}}</div><div class="movie-improve-tab-container">{{#tabs}}<div class="movie-improve-tab" id="movie-improve-tab-{{index}}"></div>{{/tabs}}</div></div>',b=c(),f=null,g=null;return f=h.map(k,function(a,b){return{name:a.name||"未名",index:b}}),g=h(j.render(a,{tabs:f})),g.on("click",".movie-improve-nav",function(a){a.preventDefault();var c=h(this);e(c,g),d(b,c,g)}).find(".movie-improve-nav").each(function(a){var c=h(this);0===a&&e(c,g),d(b,c,g)}),i.setTitle(b.title2+" BT地址列表"),g}function g(){location.href.match(/^http:\/\/movie\.douban\.com\/subject\/\d+/)&&Do.ready("dialog",function(){var a=h('<div><span class="pl">BT地址:</span> <a href="javascript:">打开列表</a></div>').appendTo("#info").find("a");a.on("click",function(a){a.preventDefault(),i||(i=dui.Dialog({width:700},!0)),i.setContent(f()),i.open()})})}var h=require("jquery"),i=null,j=require("mustache"),k=[require("js/bt-tiantang"),require("js/bt-imax"),require("js/bt-fangying"),require("js/bt-mee"),require("js/bt-baidu"),require("js/bt-shooter")];b.exports={init:g}});