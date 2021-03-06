var fs = require("fs");
var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function () {
            var map_path = __dirname + "/map.json";
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        };
        Storage.prototype.saveFile = function (mapdata) {
            var json = { "map": [mapdata[0], mapdata[1], mapdata[2], mapdata[3], mapdata[4], mapdata[5], mapdata[6], mapdata[7]] };
            var obj = JSON.stringify(json);
            var map_path = __dirname + "/map.json";
            fs.writeFile(map_path, obj, function (err) {
                if (err)
                    throw err;
                console.log('It\'s saved!');
                alert("It's saved!");
            });
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
