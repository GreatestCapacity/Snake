/**
 * Created by Author on 2015/10/11.
 */
var ResultLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var x = size.width / 2;
        var y = size.height / 3 * 2;
        var label = new cc.LabelTTF("The snake is die\nYour score is\n"+score.toString(), "Arial", 38);
        label.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        label.setPosition(x, y);
        this.addChild(label);

        var closeItem = new cc.MenuItemImage(
            res.AgainNormal_png,
            res.AgainSelected_png,
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

var ResultScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ResultLayer();
        this.addChild(layer);
    }
});
