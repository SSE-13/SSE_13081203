module command{
    export class Invoker {
    
    private _list:Array<any>;
    public new_command;
    
    init(){
        this._list = [];
    }
    
    public canUndo(){
        return this._list.length > 0;
    }
    
    
    public undo(){
        var command = this._list.pop();
        this.new_command = command;
        this.new_command.undo();

    }
    
    public setCommand(command){
        command.execute();
        this._list.push(command);
    }
    
}



export class Command {
    
    execute(){

        
    }
    
}


export class CommandA extends Command{
    
    public row;
    public col;
    public new_row;
    public new_col;

    constructor(row,col){
        super();
        this.row = row;
        this.col = col;
        
        
    }
    
    public execute(){
        console.log ("execute " + this.row + this.col);
        
    }
    
    public undo(row,col){
        console.log ("Undo " + this.row + this.col);
        this.getNewRow(this.row);
        this.getNewCol(this.col);
        
        
        
    }
    
    setNewRow(){
        return this.new_row;
    }
    
    getNewRow(row){
        this.new_row = row;
    }
    
    setNewCol(){
        return this.new_col;
    }
    
    getNewCol(col){
        this.new_col = col;
    }
}
    
}