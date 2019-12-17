Vue.component('win-vs', {
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
        marginTop: {
            type: Number,
            required: false,
            twoWay: true,
            default: 0
        },
        marginLeft: {
            type: Number,
            required: false,
            twoWay: true,
            default: 0
        },
        marginRight: {
            type: Number,
            required: false,
            twoWay: true,
            default: 0
        },
    },
    data: function () {
        return {
            width: this.width,
            height: this.height
        }
    },
    methods: {
        
    },
    mounted: function(){
       
    },
    template: `
    <div 
    class="vertical-seperator" 
    v-bind:style="{width: width + 'px', height: height + 'px', marginTop: marginTop + 'px', marginLeft: marginLeft + 'px', marginRight: marginRight + 'px'}">
        
    </div>
    `
});