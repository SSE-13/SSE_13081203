function createMapEditor(mapData) {
    var world = new game.WorldMap(mapData);
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new game.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * game.GRID_PIXEL_WIDTH;
            tile.y = row * game.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = game.GRID_PIXEL_WIDTH;
            tile.height = game.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var pos = [];
for (var i = 0; i < 2; i++) {
    pos[i] = [];
    for (var j = 0; j < 2; j++) {
        pos[i][j] = 7;
    }
}
function onTileClick(tile) {
    pos[0][0] = pos[1][0];
    pos[0][1] = pos[1][1];
    pos[1][0] = tile.ownedCol;
    pos[1][1] = tile.ownedRow;
    body.run(mapEditor.grid);
    ticker.start([body]);
    console.log(pos);
}
var mapEditor;
var boyShape;
var body;
var ticker = new Ticker();
var storage = data.Storage.getInstance();
var onReadFileSuccess = function () {
    var mapData = storage.mapData;
    mapEditor = createMapEditor(mapData);
    stage.addChild(mapEditor);
    boyShape = new game.BoyShape();
    body = new game.BoyBody(boyShape);
    body.x = 350;
    body.y = 350;
    stage.addChild(boyShape);
};
storage.readFile(onReadFileSuccess);
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var stage = new render.DisplayObjectContainer();
renderCore.start(stage, ["character.png"]);
