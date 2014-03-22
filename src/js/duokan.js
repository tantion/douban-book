//
// 多看阅读
// http://www.duokan.com
//
define('js/duokan', ['jquery', 'mustache'], function(require, exports, module) {
    "use strict";

    var $ = require('jquery'),
        m = require('mustache'),
        ITEMS_CACHE = {},
        timeout = 30 * 1000;

    function searchTitle (title) {
        var dfd = new $.Deferred(),
            items = [],
            url = 'http://www.duokan.com/search/#keyword#/1';

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
                    withCredentials: true
                }
            })
            .done(function (html) {
                html = html.replace(/src=/ig, 'data-src=');
                var $html = $($.parseHTML(html)),
                    $items = $html.find('.j-list .j-bookitm'),
                    items = [];

                items = $.map($items, function (item) {
                    var $item = $(item),
                        id = $item.data('id'),
                        cover = $item.find('.book .cover img').data('src'),
                        $title = $item.find('.info .title'),
                        name = $.trim($title.text()),
                        href = $title.attr('href');

                    if (name.indexOf(title) > -1) {
                        return {
                            href: 'http://www.duokan.com' + href,
                            title: name,
                            cover: cover,
                            id: id
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
                      '<a title="在线阅读" target="_blank" href="http://www.duokan.com/reader/www/app.html?id={{id}}">{{&title}}</a>' +
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
        name: '多看阅读',
        search: search
    };
});
