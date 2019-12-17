Vue.component('start-menu-items',{
    props: {
        img: {
            type: String,
            required: false,
            twoWay: true,
            default: 20
        },
        text: {
            type: Number,
        },
        programToRun: {
            type: Program,
            required: false,
            default: new Program()
        }
    }
});

Vue.component('start-menu', {
    props: {
        width: {
            type: Number,
            required: false,
            twoWay: true,
            default: 20
        },
        height: {
            type: Number,
            required: false,
            twoWay: true,
            default: 20
        },
        hidden: {
            type: Boolean,
            required: false,
            twoWay: true,
            default: true
        }
    },
    data: function () {
        return {
            width: this.width,
            height: this.height,
            hidden: this.hidden,
            startMenuItems: [
                new Program({title: "Programs", img: "./img/Programs.png", submenu: [
                    new Program({title: "Minesweeper", img: "./img/Minesweeper.png", window: MinesweeperWindow})
                ]}),
                new Program({title: "Favorites", img: "./img/Favorites.png"}),
                new Program({title: "Documents", img: "./img/Documents.png"}),
                new Program({title: "Settings", img: "./img/Settings.png"}),
                new Program({title: "Help", img: "./img/Help.png"}),
                new Program({title: "Run...", img: "./img/Run.png"}),
            ],
            shutDownLogOff:[
                new Program({title: "Log Off User...", img: "./img/logoff.png"}),
                new Program({title: "Shut Down...", img: "./img/Shutdown.png", onclick: "window.location = 'https://www.mattthedev.com/'"}),
            ],
            WindowsUpdate: new Program({title: "Windows Update", img: "./img/WindowsUpdate.png"})
        }
    },
    methods: {
        
    },
    mounted: function(){
       
    },
    template: `
    <div 
    id="start-menu" 
    v-bind:style="{visibility: hidden ? 'hidden' : 'visible'}"
    >
        <div id="start-menu-side">
            <span class="start-menu-windows" style="font-weight: 900;">Windows<span style="font-weight: 500;">98</span></span>
        </div>
        <ul class="start-menu-list">
            <li class="start-menu-item"
            @click="mainContainer.$emit('start-closed')">
                <div v-bind:onclick="WindowsUpdate.onclick">
                    <img class="start-menu-image" v-bind:src="WindowsUpdate.img"></img>
                    <span class="start-menu-text" >{{WindowsUpdate.title}}</span>
                </div>
            </li>
            <hr>
            
            <start-menu-item :startIsHidden="hidden" v-for="program in startMenuItems" :program="program"></start-menu-item>
            
            <hr>
            <li
            @click="mainContainer.$emit('start-closed')" class="start-menu-item" v-for="program in shutDownLogOff">
                <div v-bind:onclick="program.onclick">
                    <img class="start-menu-image" v-bind:src="program.img"></img>
                    <span class="start-menu-text" >{{program.title}}</span>
                </div>
            </li>
        </ul>
    </div>
    `
});