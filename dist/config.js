seajs.config({alias:{jquery:{src:"lib/jquery.js",exports:"noConfictJQuery"},async:{src:"lib/async.js",exports:"async"},mustache:{src:"lib/mustache.js",exports:"Mustache"},purl:{src:"lib/purl.js",exports:"purl"}},vars:{locale:"zh-cn"},map:[[/^(.*\/js\/.*\.(?:css|js))(?:.*)$/i,"$1?v0.0.1"]],plugins:["text","shim"],preload:[],debug:!0,charset:"utf-8"});