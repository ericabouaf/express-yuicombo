YUI.add('my-yui-module', function (Y) {
   
   // It's not a YUI tutorial :)
   Y.Node.create('<p style="background-color: lightgreen;">Successfully loaded module "my-yui-module"</p>').appendTo(document.body);
   
}, '1.0', {requires: ['widget', 'widget-stdmod']});