Vue.component('taskbar', {
    props: {

    },
    data: function () {
        
    },
    methods: {
        mouseDown: function (mouse) {
           console.log('1'); 
        },
        mouseUp: function (mouse){
            
        }
    },
    watch: {
        
    },
    mounted: function(){
        this.x = this.inputx ? this.inputx : Math.random() * (window.innerWidth - 500);
        this.y = this.inputy ? this.inputy : Math.random() * (window.innerHeight - 500  );
    },
    template: `
    <div @mouseDown="mouseDown"
    class="taskbar-container" 
    v-bind:class="{}">
        <win-button @click.native="mainContainer.$emit('start-clicked')" id="start-button" :height="28" :width="65" :imgWidth="20" :imgHeight="20" :img="'img/win-startlogo.png'" :text="'Start'"></win-button>
        <win-vs :marginLeft="3" :marginTop="3" :marginRight="3" :height="22" :width="2">a</win-vs>
        <win-button :hasBackground="false" :height="28" :width="30" :imgWidth="20" :imgHeight="20" :img="'img/win-startlogo.png'"></win-button>
        <win-vs :marginLeft="3" :marginTop="3" :marginRight="3" :height="22" :width="2">a</win-vs>
    </div
    `
});