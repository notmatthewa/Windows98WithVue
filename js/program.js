function Program(data){
    data = getProp(data, {}); 
    this.title = getProp(data.title, "Program");
    this.img = getProp(data.img, "img/winlogo-32x32.png");
    this.content = getProp(data.content, "<test>Hello world</test>");
    this.onclick = getProp(data.onclick, undefined);
    this.submenu = getProp(data.submenu, false);
    this.window = getProp(data.window, this.onclick != undefined ? undefined : new Window());
    this.openwindow = this.onclick == undefined && this.window != undefined;
}

function Window(data){
    data = getProp(data, {}); 
    this.title = getProp(data.title, "Window");
    this.img = getProp(data.img, "img/winlogo-32x32.png");
    this.content = getProp(data.content, "<div>Hello world 2</div>");
    this.resizable = getProp(data.resizable, true);

    this.generateNewId = function(){
        this.id = (Math.round(Math.random() * 1000000000000)).toString(16)
        + (Math.round(Math.random() * 1000000000000)).toString(16)
        + (Math.round(Math.random() * 1000000000000)).toString(16)
        + (Math.round(Math.random() * 1000000000000)).toString(16);
        return this;
    };
    
    this.generateNewId();
}

function getProp(prop, def){
    return prop !== undefined ? prop : def;
}