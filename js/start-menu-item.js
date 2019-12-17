Vue.component('start-menu-item', {
    props: {
        program: Program,
        hovered: {
            type: Boolean,
            default: false
        },
        startIsHidden: false
    },
    data: function () {
        return {
            hovered: this.hovered
        }
    },
    methods: {
        
    },
    template: `
    <div style="position: relative;" @mouseover="hovered = true;" @mouseout="hovered = false;">
        <li class="start-menu-item">
            <div v-bind:onclick="program.onclick">
                <img class="start-menu-image" v-bind:src="program.img"></img>
                <span class="start-menu-text" >{{program.title}}</span>
            </div>
        </li>
        <div class="sub-menu" v-if="program.submenu" v-bind:style="{'visibility': !startIsHidden && hovered ? 'visible' : 'hidden'}">
            <ul class="sub-menu-list">
                <li v-if="subProgram.openwindow" 
                @click="mainContainer.$emit('open-window', subProgram.window); mainContainer.$emit('start-closed');" 
                class="sub-menu-item" v-for="subProgram in program.submenu">
                    <img class="sub-menu-image" v-bind:src="subProgram.img"></img>
                    <span class="sub-menu-text">{{subProgram.title}}</span>
                </li>
                <li v-if="!subProgram.openwindow" v-bind:onclick="subProgram.onclick" class="sub-menu-item" v-for="subProgram in program.submenu">
                    <img class="sub-menu-image" v-bind:src="subProgram.img"></img>
                    <span class="sub-menu-text">{{subProgram.title}}</span>
                </li>
            </ul>
        </div>
    </div>
    `
});