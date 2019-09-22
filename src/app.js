var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var x = size.width / 2;
        var y = size.height / 3 * 2;
        var label = new cc.LabelTTF("GreatestCapacity Presents", "Arial", 38);
        label.setPosition(x, y);
        this.addChild(label);

        var closeItem = new cc.MenuItemImage(
            res.StartNormal_png,
            res.StartSelected_png,
            function () {
                cc.log("Menu is clicked!");
                var newScene = new GameScene();
                cc.director.runScene(newScene);
            }, this);

        var menu = new cc.Menu(closeItem);
        menu.x = size.width / 2;
        menu.y = size.height / 3;
        this.addChild(menu, 1);
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
