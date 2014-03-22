//
// book subject improve
// http://book.douban.com/subject/:id
//
define(function(require, exports, module) {
    "use strict";

    var $ = require('jquery'),
        dialog = null,
        m = require('mustache'),
        providers = [
            require('js/duokan'),
            require('js/ishare'),
            require('js/ppurl'),
            require('js/baidu')
        ];

    function serializeSubject () {
        var subject = {},
            $content = $('#content'),
            $info = $('#info'),
            info = $.trim($info.text()),
            infos = info.split(/([^ \n]+):/),
            len = infos.length,
            maps = {};

        $.each(infos, function (index, item) {
            var key, value;
            if (index % 2 === 1 && index < len - 1) {
                key = $.trim(item);
                value = $.trim(infos[index + 1].replace(/\n/g, '').replace(/ {2,}/g, ' '));
                maps[key] = value;
            }
        });

        subject.title = $.trim($('#wrapper').find('[property="v:itemreviewed"]').text());
        subject.stars = parseFloat($content.find('[property="v:average"]').text());
        subject.author = maps.hasOwnProperty('作者') ? maps['作者'] : '';
        subject.year = parseInt(maps.hasOwnProperty('出版年') ? maps['出版年'] : 0, 10);
        subject.isbn = parseInt(maps.hasOwnProperty('ISBN') ? maps.ISBN : 0, 10);

        return subject;
    }

    function startSearch (subject, $nav, $content) {
        var index = $nav.data('index'),
            $target = $content.find($nav.attr('href')),
            $count = $nav.find('span'),
            pd = providers[index];

        pd.search(subject)
        .progress(function (tips) {
            $target.html(tips);
            $count.html('..');
        })
        .done(function (view, count) {
            $target.html(view);
            $count.html(count || 0);
        })
        .fail(function () {
            $target.html('没有搜到相关的电子书，切换一下其他搜索试试。');
            $count.html(0);
        });
    }

    function activeSearch ($nav, $content) {
        var index = $nav.data('index'),
            $target = $content.find($nav.attr('href')),
            pd = providers[index];

        $nav.siblings().removeClass('active');
        $nav.addClass('active');
        $target.siblings().removeClass('active');
        $target.addClass('active');
    }

    function initDialog () {
        var tmpl = '<div class="book-improve-bt-container">' +
                       '<div class="book-improve-nav-container">' +
                           '{{#tabs}}' +
                           '{{#index}}&nbsp;|&nbsp;{{/index}}' +
                           '<a class="book-improve-nav" data-index="{{index}}" href="#book-improve-tab-{{index}}">{{name}} (<span>...</span>)</a>' +
                           '{{/tabs}}' +
                       '</div>' +
                       '<div class="book-improve-tab-container">' +
                           '{{#tabs}}' +
                           '<div class="book-improve-tab" id="book-improve-tab-{{index}}"></div>' +
                           '{{/tabs}}' +
                       '</div>' +
                   '</div>',
            subject = serializeSubject(),
            tabs = null,
            $content = null;

        tabs = $.map(providers, function (pd, index) {
            return {
                name: pd.name || '未名',
                index: index
            };
        });

        $content = $(m.render(tmpl, {tabs: tabs}));

        $content
        .on('click', '.book-improve-nav', function (evt) {
            evt.preventDefault();

            var $nav = $(this);

            activeSearch($nav, $content);
            startSearch(subject, $nav, $content);
        })
        .find('.book-improve-nav')
        .each(function (index) {
            var $nav = $(this);

            // 默认选中第一个
            if (index === 0) {
                activeSearch($nav, $content);
            }
            startSearch(subject, $nav, $content);
        });

        dialog.setTitle(subject.title + ' 电子书列表');

        return $content;
    }

    function init () {
        if (!location.href.match(/^http:\/\/book\.douban\.com\/subject\/\d+/)) {
            return;
        }

        /* global dui: true */
        var $btn = $('<div><span class="pl">电子书:</span> <a href="javascript:">查看列表</a></div>').appendTo('#info').find('a');

        $btn.on('click', function (evt) {
            evt.preventDefault();
            if (!dialog) {
                dialog = dui.Dialog({width: 700}, true);
            }
            dialog.setContent(initDialog());
            dialog.open();
        });
    }

    module.exports = {
        init: init
    };
});
