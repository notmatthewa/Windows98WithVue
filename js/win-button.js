Vue.component('win-button', {
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
        text: {
            type: String,
            required: false,
            twoWay: true,
            default: undefined
        },
        img:{
            type: String,
            required: false,
            twoWay: true,
            default: undefined
        },
        imgWidth: {
            type: Number,
            required: false,
            twoWay: true,
            default: 20
        },
        imgHeight: {
            type: Number,
            required: false,
            twoWay: true,
            default: 20
        },
        hasBackground: {
            type: Boolean,
            required: false,
            twoWay: true,
            default: true
        },

    },
    data: function () {
        return {
            width: this.width,
            height: this.height
        }
    },
    methods: {
        mouseDown: function (mouse) {
            
        },
        mouseUp: function (mouse){
            
        }
    },
    mounted: function(){

    },
    template: `
    <div @mouseup="mouseUp" 
    v-bind:class="{'win-button-nobg': !hasBackground, 'win-button': true}" 
    v-bind:style="{width: width + 'px', height: height + 'px'}">
        <div style="display: flex; align-items: left;">
            <img style="vertical-align:middle; margin-right: 3px;"  v-if="img" v-bind:width="imgWidth" v-bind:height="imgHeight" v-bind:src="img" />
            <span v-if="text">{{text}}</span>
        </div>
    </div>
    `
});