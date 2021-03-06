//
// 百度云
// http://yun.baidu.com
//
define('js/baidu', function(require, exports, module) {
    "use strict";

    var $ = require('jquery'),
        m = require('mustache'),
        ITEMS_CACHE = {},
        timeout = 30 * 1000;

    function searchTitle (title) {
        var dfd = new $.Deferred(),
            items = [],
            url = 'http://www.baidu.com/s?wd=title%3A+%28+"#keyword#"%2B%28pdf+%7C+mobi+%7C+epub+%7C+txt%29%29+site%3A%28pan.baidu.com%29';

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
                    $items = $html.find('.c-container'),
                    items = [];

                $items.each(function () {
                    var $item = $(this),
                        $link = $item.find('.t a').eq(0),
                        $desc = $item.find('.c-abstract').eq(0),
                        desc = $.trim($desc.text()),
                        title = $.trim($link.text()).replace(/^(.+)_免费高速.*$/, '$1'),
                        size = '',
                        descTitle = '',
                        matches = desc.match(/文件大小:([\w\.]+) /);

                    if (!matches) {
                        matches = desc.match(/下载\(([\w\.]+)\)/);
                    }

                    if (title.indexOf('...') === 0) {
                        descTitle = desc.match(/(.+) 保存至网盘/);
                        if (descTitle) {
                            title = descTitle[1];
                        }
                    }

                    if (matches && matches.length > 1) {
                        size = matches[1];
                        if (size) {
                            title += ' ' + size;
                        }
                    }
                    if (title) {
                        items.push({
                            href: $link.attr('href'),
                            title: title
                        });
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
                      '<a title="点击打开下载页面" target="_blank" href="{{href}}">{{title}}</a>' +
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
                dfd.resolve(renderItems(items), items.length);
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
        name: '百度云',
        search: search
    };
});
