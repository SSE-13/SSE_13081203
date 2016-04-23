var fs = require("fs");

module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }


        public readFile() {
            var map_path = __dirname + "/map.json"
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        }
        
        public saveFile(){
            var json = {"map":[map[0], map[1], map[2], map[3]]};
            var obj = JSON.stringify(json);
            var map_path = __dirname + "/map.json";
            fs.writeFile(map_path, obj, function (err) {
               if (err) throw err;
               console.log('It\'s saved!');
            });

            
        }
        
        public mapData;

    }



}