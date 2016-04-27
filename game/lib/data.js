var data;
(function (data) {
    var xmlhttp;
    var mapData;
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function (callback) {
            var _this = this;
            var state_Change = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var obj = JSON.parse(xmlhttp.responseText);
                        _this.mapData = obj.map;
                        callback();
                    }
                    else {
                    }
                }
            };
            if (XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            }
            if (xmlhttp != null) {
                xmlhttp.onreadystatechange = state_Change;
                xmlhttp.open("GET", "lib/map.json", true);
                xmlhttp.send(null);
            }
            else {
                alert("not support");
            }
            // var map_path = __dirname + "/map.json"
            // var content = fs.readFileSync(map_path, "utf-8");
            // var obj = JSON.parse(content);
            // this.mapData = obj.map;
        };
        Storage.prototype.saveFile = function () {
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
