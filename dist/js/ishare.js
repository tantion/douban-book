define(function(require,a,b){"use strict";function c(a){var b=new f.Deferred,c=[],d="http://ishare.iask.sina.com.cn/search.php?key=#keyword#&format=txt%7Epdf%7Ehtm%7Erar&sort=digit_down";return d=d.replace("#keyword#",encodeURIComponent(a)),h.hasOwnProperty(d)?(c=h[d],c&&c.length?b.resolve(c):b.reject()):f.ajax({url:d,type:"GET",timeout:i,xhrFields:{withCredentials:!1}}).done(function(a){a=a.replace(/src=/gi,"data-src=");var c=f(f.parseHTML(a)),e=c.find("table td.r1"),g=[];g=f.map(e,function(a){var b=f(a),c=b.find(".cb"),d=c.find("a"),e=f.trim(b.find(".gray").text()),g=e.match(/.*下载需积分(\d+)分.*/),h=e.match(/.*大小:([\w\.]+) \|.*/),i=c.find("img").data("src")||"",j=i.replace(/.*\/(\w+)\.gif/,"$1"),k=f.trim(d.text()),l=d.attr("href")||"",m=l.replace(/.*\/(\d+)\.html$/,"$1");return g&&g.length&&(g=g[1]),h&&h.length&&(h=h[1]),m?{href:l,type:j,size:h,price:g,id:m,title:k}:void 0}),h[d]=g,g.length?b.resolve(g):b.reject()}).fail(function(){b.reject()}),b.promise()}function d(a){var b=g.render(j,{items:a}),c=f(b);return c.on("mouseenter","a",function(){f(this).tipsy({gravity:"w",offset:3}).tipsy("show")}),c}function e(a){var b=a.title,e=new f.Deferred;return b?(e.notify("正在加载搜索结果，请耐心等待..."),c(b).done(function(a){e.resolve(d(a),a.length,a)}).fail(function(){e.reject()})):e.reject(),e.promise()}var f=require("jquery"),g=require("mustache"),h={},i=3e4,j='{{#items}}<dl class="book-improve-bt-dl"><dt class="book-improve-bt-title"><a title="打开下载页面{{#price}}（需要登录）{{/price}}" target="_blank" href="http://ishare.iask.sina.com.cn/download/explain.php?fileid={{id}}">{{#type}}[{{type}}]{{/type}}{{#price}}[{{price}}积分]{{/price}}{{^price}}[免费]{{/price}}{{#size}}[{{size}}]{{/size}}{{&title}}</a></dt>{{#files}}<dd class="book-improve-bt-desc">{{&title}}</dd>{{/files}}</dl>{{/items}}';b.exports={name:"爱问分享",search:e}});