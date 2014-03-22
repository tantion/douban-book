//
// 爱问资料分享
// http://ishare.iask.sina.com.cn
//
define('js/ishare', ['jquery', 'mustache'], function(require, exports, module) {
    "use strict";

    var $ = require('jquery'),
        m = require('mustache'),
        ITEMS_CACHE = {},
        timeout = 30 * 1000;

    function searchTitle (title) {
        var dfd = new $.Deferred(),
            items = [],
            url = 'http://ishare.iask.sina.com.cn/search.php?key=#keyword#&format=txt%7Epdf%7Ehtm%7Erar&sort=digit_down';

        url = url.replace('#keyword#', encodeURIComponent(title));

        if (ITEMS_CACHE.hasOwnProperty(url)) {
            items = ITEMS_CACHE[url];
            if (items && items.length) {
                dfd.resolve(items);
            } else {
                dfd.reject();
            }
        } else {
            $.ajax({
                url: url,
                type: 'GET',
                timeout: timeout,
                xhrFields: {
                    withCredentials: false
                }
            })
            .done(function (html) {
                html = html.replace(/src=/ig, 'data-src=');
                var $html = $($.parseHTML(html)),
                    $items = $html.find('table td.r1'),
                    items = [];

                items = $.map($items, function (item) {
                    var $item = $(item),
                        $header = $item.find('.cb'),
                        $link = $header.find('a'),
                        desc = $.trim($item.find('.gray').text()),
                        price = desc.match(/.*下载需积分(\d+)分.*/),
                        size = desc.match(/.*大小:([\w\.]+) \|.*/),
                        cover = $header.find('img').data('src') || '',
                        type = cover.replace(/.*\/(\w+)\.gif/, '$1'),
                        title = $.trim($link.text()),
                        href = $link.attr('href') || '',
                        id = href.replace(/.*\/(\d+)\.html$/, '$1');

                    if (price && price.length) {
                        price = price[1];
                    }
                    if (size && size.length) {
                        size = size[1];
                    }

                    if (id) {
                        return {
                            href: href,
                            type: type,
                            size: size,
                            price: price,
                            id: id,
                            title: title
                        };
                    }
                });

                ITEMS_CACHE[url] = items;
                if (items.length) {
                    dfd.resolve(items);
                } else {
                    dfd.reject();
                }
            })
            .fail(function () {
                dfd.reject();
            });
        }

        return dfd.promise();
    }

    var tmpl = '{{#items}}' +
               '<dl class="book-improve-bt-dl">' +
                  '<dt class="book-improve-bt-title">' +
                      '<a title="打开下载页面{{#price}}（需要登录）{{/price}}" target="_blank" href="http://ishare.iask.sina.com.cn/download/explain.php?fileid={{id}}">' +
                        '{{#type}}[{{type}}]{{/type}}' +
                        '{{#price}}[{{price}}积分]{{/price}}' +
                        '{{^price}}[免费]{{/price}}' +
                        '{{#size}}[{{size}}]{{/size}}' +
                        '{{&title}}' +
                      '</a>' +
                  '</dt>' +
                  '{{#files}}' +
                  '<dd class="book-improve-bt-desc">{{&title}}</dd>' +
                  '{{/files}}' +
               '</dl>' +
               '{{/items}}';

    function renderItems (items) {
        var content = m.render(tmpl, {items: items}),
            $content = $(content);

        $content
        .on('mouseenter', 'a', function (evt) {
            $(this).tipsy({gravity: 'w', offset: 3}).tipsy('show');
        });

        return $content;
    }

    function search (subject) {
        var title = subject.title,
            dfd = new $.Deferred();

        if (title) {
            dfd.notify('正在加载搜索结果，请耐心等待...');

            searchTitle(title)
            .done(function (items) {
                dfd.resolve(renderItems(items), items.length, items);
            })
            .fail(function () {
                dfd.reject();
            });
        } else {
            dfd.reject();
        }

        return dfd.promise();
    }

    module.exports = {
        name: '爱问分享',
        search: search
    };
});
