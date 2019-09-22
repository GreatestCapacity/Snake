/**
 * Created by Author on 2015/10/11.
 */
function createSnake(_row, _column, _direct, _node, _next) {
    var snake = {row:_row, column:_column, direct:_direct, node:_node, next:_next};
    return snake;
}

function createFood(_row, _column, _node) {
    var food = {row:_row, column:_column, node:_node};
    return food;
}

var up = 1;
var down = 2;
var left = 3;
var right = 4;

var snake = createSnake(0, 0, 0, null, null);
var food = createFood(0, 0, null);
var score = 0;
var scoreLabel;

var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        // super init first
        this._super();

        score = 0;

        // Create four buttons for controlling the snake's direction
        var wall = new cc.DrawNode();
        wall.drawRect(cc.p(0, 0), cc.p(960, 640), cc.color(0,0,0), 5, cc.color(255,255,255));
        this.addChild(wall);

        var up_button = new cc.DrawNode();
        up_button.drawRect(cc.p(747, 320), cc.p(853, 213), cc.color(0,200,0), 5, cc.color(0,200,0));
        this.addChild(up_button);

        var down_button = new cc.DrawNode();
        down_button.drawRect(cc.p(747, 107), cc.p(853, 0), cc.color(0,200,0), 5, cc.color(0,200,0));
        this.addChild(down_button);

        var left_button = new cc.DrawNode();
        left_button.drawRect(cc.p(640, 213), cc.p(747, 107), cc.color(0,200,0), 5, cc.color(0,200,0));
        this.addChild(left_button);

        var right_button = new cc.DrawNode();
        right_button.drawRect(cc.p(853, 213), cc.p(960, 107), cc.color(0,200,0), 5, cc.color(0,200,0));
        this.addChild(right_button);

        // Create a snake with 3 nodes
        var row=10, column=16;
        var _snake = createSnake(0, 0, 0, null, null);
        for(var i = 1; i <= 3; i++) {
            if(i != 1)
                _snake = _snake.next;
            else
                _snake = snake;
            _snake.row = row;
            _snake.column = column;
            _snake.direct = right;
            var node = new cc.Sprite(res.Snake_png);
            node.setAnchorPoint(0, 0);
            node.setPosition(_snake.column*32, _snake.row*32);
            _snake.node = node;
            this.addChild(node);
            if(i != 3)
                _snake.next = createSnake(0, 0, 0, null, null);
            column--;
        }

        // Create a label on the head of the snake for showing gamer's score
        scoreLabel = new cc.LabelTTF(score.toString(), "Arial", 16);
        scoreLabel.setColor(cc.color(0, 0, 0, 0));
        scoreLabel.setAnchorPoint(0.5, 0.5);
        scoreLabel.setPosition(16, 16);
        snake.node.addChild(scoreLabel);

        // Create food with position of random
        food.row = Math.floor(Math.random()*20);
        food.column = Math.floor(Math.random()*30);
        var _food = new cc.Sprite(res.Food_png);
        _food.setAnchorPoint(0, 0);
        _food.setPosition(food.column*32, food.row*32);
        this.addChild(_food);
        food.node = _food;

        // Function handling the event of the direction's controlling
        cc.eventManager.addListener({
            /*            event : cc.EventListener.KEYBOARD,
             onKeyReleased : function(keyCode, event) {
             switch (keyCode) {
             case 38:
             if (snake.direct != down)
             snake.direct = up;
             break;
             case 40:
             if (snake.direct != up)
             snake.direct = down;
             break;
             case 37:
             if (snake.direct != right)
             snake.direct = left;
             break;
             case 39:
             if (snake.direct != left)
             snake.direct = right;
             break;
             }
             }*/

            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function (touch, event) {
                var x = touch.getLocation().x;
                var y = touch.getLocation().y;
                if (x > 747 && x < 853) {
                    // Up
                    if (y > 213 && y < 320) {
                        if (snake.direct != down)
                            snake.direct = up;
                    }
                    // Down
                    if (y < 107) {
                        if (snake.direct != up)
                            snake.direct = down;
                    }
                }
                if (y > 107 && y < 213) {
                    // Left
                    if (x < 747 && x > 640) {
                        if (snake.direct != right)
                            snake.direct = left;
                    }
                    // Right
                    if (x > 853) {
                        if (snake.direct != left)
                            snake.direct = right;
                    }
                }
                return true;
            },
            onTouchMoved : function (touch, event) {
                return true;
            },
            onTouchEnded : function (touch, event) {
            }
        }, this);

        // The logic function of the game
        this.schedule(function () {
            // Collision check
            var row = snake.row, column = snake.column;
            switch (snake.direct) {
                case up:
                    snake.row++;
                    break;
                case down:
                    snake.row--;
                    break;
                case left:
                    snake.column--;
                    break;
                case right:
                    snake.column++;
                    break;
            }

            // The snake have caught the food
            if (snake.row == food.row && snake.column == food.column) {
                console.log("The snake have caught the food");

                // Add a node to the tail of the snake
                var _snake = snake;
                while (_snake) {
                    if(!_snake.next) {
                        var _row, _column;
                        switch (_snake.direct) {
                            case up:
                                _row = _snake.row - 1;
                                _column = _snake.column;
                                break;
                            case down:
                                _row = _snake.row + 1;
                                _column = _snake.column;
                                break;
                            case left:
                                _row = _snake.row;
                                _column = _snake.column + 1;
                                break;
                            case right:
                                _row = _snake.row;
                                _column = _snake.column - 1;
                                break;
                        }
                        var __snake = new createSnake(_row, _column, _snake.direct, null, null);
                        var node = new cc.Sprite(res.Snake_png);
                        node.setAnchorPoint(0, 0);
                        node.setPosition(_column*32, _row*32);
                        __snake.node = node;
                        _snake.next = __snake;
                        this.addChild(node);
                        break;
                    }
                    _snake = _snake.next;
                }

                // Refresh the position of the food, and avoid putting the food on the block of the snake
                var x, y;
                while (true) {
                    x = Math.floor(Math.random() * 30);
                    y = Math.floor(Math.random() * 20);
                    _snake = snake;
                    while (_snake) {
                        if (x == _snake.column && y == _snake.row) {
                            break;
                        }
                        else {
                            _snake = _snake.next;
                        }
                    }
                    if (!_snake)
                        break;
                }
                food.column = x;
                food.row = y;
                food.node.setPosition(x*32, y*32);

                // Refresh the score
                score++;
                scoreLabel.setString(score.toString());
            }

            // The snake is die for eating the wall
            else if (snake.row < 0 || snake.row >= 20 || snake.column < 0 || snake.column >= 30) {
                console.log("The snake is die for eating the wall");
                var newScene = new ResultScene();
                cc.director.runScene(newScene);
                return ;
            }

            // The snake is die for eating itself
            else {
                var _snake = snake.next;
                while (_snake) {
                    if (snake.row == _snake.row && snake.column == _snake.column) {
                        console.log("The snake is die for eating itself");
                        var newScene = new ResultScene();
                        cc.director.runScene(newScene);
                        return ;
                    }
                    else {
                        _snake = _snake.next;
                    }
                }
            }

            // To move the snake
            snake.node.setPosition(snake.column*32, snake.row*32);
            var _snake = snake.next;
            var _row=0, _column=0;
            while (_snake) {
                _row = _snake.row;
                _column = _snake.column;
                _snake.node.setPosition(column*32, row*32);
                _snake.row = row;
                _snake.column = column;
                row = _row;
                column = _column;
                _snake = _snake.next;
            }
            console.log("The logic function is executed");
        }, 0.2, cc.REPEAT_FOREVER, 0);
        return true;
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
