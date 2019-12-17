var mainContainer = new Vue({
    props :{
        activeWindows: {
            type: Array,
            default: [
            new Window(),
            ]
        }
    },
    data: function(){
        return {
            clicked: false,
            mouseX: 0,
            mouseY: 0,
            mainContainer: this,
            clickedElement: undefined,
            mouseUpWatcher: 0,
            zIndex: 5,
            startMenuOpen: false,
            display: true,
            activeWindows: this.activeWindows
        }
    },
    el: '#windows-demo',
    methods: {
        mouseMove: function(mouse){
            this.mouseX = mouse.clientX;
            this.mouseY = mouse.clientY;
            if(
                this.clicked && 
                this.clickedElement && 
                this.clickedElement.isClicked && 
                this.clickedElement.ismouseclicked &&
                !this.maximized
            ){
                if(this.clickedElement.clickedCorner){
                    switch (this.clickedElement.clickedCorner) {
                        case 'toolbar':
                            this.clickedElement.x = this.clickedElement.mousex - this.clickedElement.offsetX;
                            this.clickedElement.y = this.clickedElement.mousey - this.clickedElement.offsetY;
                            break
                        case 'br':
                            var width = this.clickedElement.originalWidth + (this.clickedElement.mousex - this.clickedElement.originalMouseX);
                            var height = this.clickedElement.originalHeight + (this.clickedElement.mousey - this.clickedElement.originalMouseY);
                            if (width > this.clickedElement.minWidth) {
                                this.clickedElement.w = width;
                            }
                            if (height > this.clickedElement.minHeight) {
                                this.clickedElement.h = height;
                            }
                            break;
                        case 'tr':
                            var width = this.clickedElement.originalWidth + (this.clickedElement.mousex - this.clickedElement.originalMouseX)
                            var height = this.clickedElement.originalHeight - (this.clickedElement.mousey - this.clickedElement.originalMouseY)
                            if (width > this.clickedElement.minWidth) {
                                this.clickedElement.w = width;
                            }
                            if (height > this.clickedElement.minHeight) {
                                this.clickedElement.h = height;
                                this.clickedElement.y = this.clickedElement.originalY + (this.clickedElement.mousey - this.clickedElement.originalMouseY);
                            }
                            break;
                        case 'tl':
                            var width = this.clickedElement.originalWidth - (this.clickedElement.mousex - this.clickedElement.originalMouseX)
                            var height = this.clickedElement.originalHeight - (this.clickedElement.mousey - this.clickedElement.originalMouseY)
                            if (width > this.clickedElement.minWidth) {
                                this.clickedElement.w = width;
                                this.clickedElement.x = this.clickedElement.originalX + (this.clickedElement.mousex - this.clickedElement.originalMouseX);
                            }
                            if (height > this.clickedElement.minHeight) {
                                this.clickedElement.h = height;
                                this.clickedElement.y = this.clickedElement.originalY + (this.clickedElement.mousey - this.clickedElement.originalMouseY);
                            }
                            break;
                        case 'bl':
                            var height = this.clickedElement.originalHeight + (this.clickedElement.mousey - this.clickedElement.originalMouseY)
                            var width = this.clickedElement.originalWidth - (this.clickedElement.mousex - this.clickedElement.originalMouseX)
                            if (height > this.clickedElement.minHeight) {
                                this.clickedElement.h = height;
                            }
                            if (width > this.clickedElement.minWidth) {
                                this.clickedElement.w = width;
                                this.clickedElement.x = this.clickedElement.originalX + (this.clickedElement.mousex - this.clickedElement.originalMouseX)
                            }
                            break;
                        case 'b':
                            var height = this.clickedElement.originalHeight + (this.clickedElement.mousey - this.clickedElement.originalMouseY)
                            if (height > this.clickedElement.minHeight) {
                                this.clickedElement.h = height;
                            }
                            break;
                        case 't':
                            var height = this.clickedElement.originalHeight - (this.clickedElement.mousey - this.clickedElement.originalMouseY)
                            if (height > this.clickedElement.minHeight) {
                                this.clickedElement.h = height;
                                this.clickedElement.y = this.clickedElement.originalY + (this.clickedElement.mousey - this.clickedElement.originalMouseY);
                            }
                            break;
                        case 'l':
                            var width = this.clickedElement.originalWidth - (this.clickedElement.mousex - this.clickedElement.originalMouseX)
                            if (width > this.clickedElement.minWidth) {
                                this.clickedElement.w = width;
                                this.clickedElement.x = this.clickedElement.originalX + (this.clickedElement.mousex - this.clickedElement.originalMouseX)
                            }
                            break;
                        case 'r':
                            var width = this.clickedElement.originalWidth + (this.clickedElement.mousex - this.clickedElement.originalMouseX)
                            if (width > this.clickedElement.minWidth) {
                                this.clickedElement.w = width;
                            }
                            break;
                    }
                }
            }
        },
        mouseUp: function(){
            this.clicked = false;
            this.clickedElement = undefined;  
            this.mouseUpWatcher++;
        },
        mouseDown: function(){
            this.clicked = true;
        }
    },
    mounted: function(){
        this.$on('clicked-element', function(elem){
            this.clickedElement = elem;
            this.zIndex++;
            elem.zIndex = this.zIndex;
        });
        this.$on('start-clicked', function(elem){
            this.startMenuOpen = !this.startMenuOpen;
        });
        this.$on('start-closed', function(elem){
            this.startMenuOpen = false;
        });
        this.$on('remove-window', function(id){
            this.activeWindows.forEach(element => {
                if(element.id == id){
                    this.activeWindows.splice(this.activeWindows.indexOf(element), 1);
                }
            });
        });
        this.$on('open-window', function(window){
            console.log(111)
            this.activeWindows.push(window.generateNewId())
        });
    }
});


Vue.component('view-window', {
    props: {
        mousex: {
            type: Number,
            required: false,
            twoWay: true,
            default: 0
        },
        mousey: {
            type: Number,
            required: false,
            twoWay: true,
            default: 0
        },
        ismouseclicked: {
            type: Boolean,
            required: false,
            twoWay: true,
            default: false
        },
        resizable: {
            type: Boolean,
            required: false,
            twoWay: true,
            default: true
        },
        content:{
            type: String,
            required: false,
            twoWay: true,
            default: "Hello"
        },
        title:{
            type: String,
            required: false,
            twoWay: true,
            default: "Window"
        },
        maincontainer: Object,
        mouseups: Number,
        inputx: Number,
        inputy: Number,
        id: String
    },
    data: function () {
      return {
        x: 50,
        y: 50,
        clickedX: 0,
        clickedY: 0,
        count: 0,
        isClicked: false,
        offsetX: 0,
        offsetY: 0,
        clickedCorner: undefined ,
        w: 400,
        h: 400,
        originalHeight: 400,
        originalWidth: 400,
        originalX: 50,
        originalY: 50,
        maximized: false,
        minimized: false,
        zIndex: 5,
        minWidth: 200,
        minHeight: 100,
        originalMouseX: 0,
        originalMouseY: 0,
        restoreWidth: 200,
        restoreHeight: 100,
        restoreX: 0,
        restoreY: 0,
        title: this.title,
        content: this.content,
        resizable: this.resizable,
        id: this.id
      }
    },
    methods: {
        mouseDown: function (mouse) {
            this.offsetX = this.mousex - this.x;
            this.offsetY = this.mousey - this.y;
            this.originalMouseX = this.mousex;
            this.originalMouseY = this.mousey;
            this.isClicked = true;
            this.originalHeight = this.h;
            this.originalWidth = this.w;
            this.originalX = this.x;
            this.originalY = this.y;
            this.maincontainer.$emit('clicked-element', this)
        },
        mouseUp: function (mouse){
            this.isClicked = false;
            this.originalHeight = this.h;
            this.originalWidth = this.w;
            this.originalX = this.x;
            this.originalY = this.y;
            this.originalMouseX = this.mousex;
            this.originalMouseY = this.mousey;
        },
        cMouseUp: function(){
            this.clickedCorner = undefined;
            this.originalHeight = this.h;
            this.originalWidth = this.w;
            this.originalX = this.x;
            this.originalY = this.y;
        },
        cMouseDown: function(corner){
            this.clickedCorner = corner;
        },
        minimize: function(){   
            TweenLite.to(this.$data, 0.5, { h: 32 });
            this.minimized = true;
        },
        maximize: function () {
            this.restoreX = this.x;
            this.restoreY = this.y;
            this.restoreWidth = this.w;
            this.restoreHeight = this.h;
            this.w = document.getElementById("everything-container").clientWidth;
            this.h = document.getElementById("everything-container").clientHeight;
            this.x = 0;
            this.y = 0;
            this.maximized = true;
        },
        restoreDown: function () {
            this.w = this.restoreWidth;
            this.h = this.restoreHeight;
            this.x = this.restoreX;
            this.y = this.restoreY;
            this.maximized = false;
        },
        close: function () {
            mainContainer.$emit('remove-window', this.id);
        }
    },
    watch: {
        mouseups: function(){
            this.clickedCorner = undefined;
            this.originalHeight = this.h;
            this.originalWidth = this.w;
            this.originalX = this.x;
            this.originalY = this.y;
            this.h = this.h < 100 && !this.minimized ? 100 : this.h;
            this.w = this.w < 100 && !this.minimized ? 100 : this.w;
        }
    },
    mounted: function(){
        this.x = this.inputx ? this.inputx : Math.random() * (window.innerWidth - 500);
        this.y = this.inputy ? this.inputy : Math.random() * (window.innerHeight - 500  );
    },
    template: `
    <div @mousedown="mouseDown" @mouseup="mouseUp" 
    class="view-window" 
    v-bind:class="{isBeingDrug: (isClicked && ismouseclicked)}" 
    v-bind:style="{overflow: minimized ? 'hidden' : 'visible', 
    zIndex: zIndex, 
    minHeight: minimized ? '16px' : minHeight + 'px',
    minWidth: minWidth + 'px',
    width: w + 'px', height: h + 'px',left: x + 'px', 
    top: y + 'px'}">
        <div align="right" class="view-window-toolbar" @mousedown="cMouseDown('toolbar')" @mouseup="cMouseUp">
            <div class="toolbar-title">{{title}}</div>
            <div class="container-styling toolbar-button" @click="minimize()">
                <div class="minimize-text">0</div>
            </div>
            <div v-if="resizable" class="container-styling toolbar-button" @click="maximized ? restoreDown() : maximize()">
                <div class="minimize-text">{{ maximized ? '2' : '1' }}</div>
            </div>
            <div class="container-styling toolbar-button" @click="close()"><div class="close-text">r</div></div>
        </div>
        <div v-html="content" v-bind:style="{display: 'flex', overflow: 'hidden'}" class="view-window-content">
            {{resizable}}
        </div>
        <div v-if="resizable">
            <div @mousedown="cMouseDown('br')" @mouseup="cMouseUp" class="corner bottom-right-corner"></div>
            <div @mousedown="cMouseDown('tr')" @mouseup="cMouseUp" class="corner top-right-corner"></div>
            <div @mousedown="cMouseDown('bl')" @mouseup="cMouseUp" class="corner bottom-left-corner"></div>
            <div @mousedown="cMouseDown('tl')" @mouseup="cMouseUp" class="corner top-left-corner"></div>
            <div @mousedown="cMouseDown('l')" @mouseup="cMouseUp" class="side left-side"></div>
            <div @mousedown="cMouseDown('r')" @mouseup="cMouseUp" class="side right-side"></div>
            <div @mousedown="cMouseDown('t')" @mouseup="cMouseUp" class="cap top-side"></div>
            <div @mousedown="cMouseDown('b')" @mouseup="cMouseUp" class="cap bottom-side"></div>
        </div>
    </div>
    `
});
