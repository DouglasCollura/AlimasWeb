<template>

    <div v-if="visible == true" :class="vmodel">
        
        <div class="vm-body">
            <h1 class="text-center">{{title}}</h1>
            <img v-if="type == 'vm-error'" src="../image/img-error.png" alt="">
            <img v-if="type == 'vm-success'" src="../image/img-success.png" alt="">
            <img v-if="type == 'vm-load'" class="load" width="120" src="../image/img-load.png" alt="">
            <img v-if="type == 'load'" class="load" width="120" src="../image/img-load-second.png" alt="">
            <img v-if="type == 'vm-download'" src="../image/img-download.png" alt="">
            <slot/>
            <h3>{{sub_title}}</h3>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                src:'',
                vmodel:'vm-model'
            }
        },
        props: {
           type:{type:String,default:""},
           title:{type:String,default:""},
           visible:{type:Boolean, default: false},
           sub_title:{type:String,default:""}
        },
        mounted () {

            if(this.type == 'load'){
                this.vmodel = 'vm-model-load';
            }else{
                this.vmodel = 'vm-model';
            }
            
        },
        watch: {
            
            type:function(){
                if(this.type == 'load'){
                    this.vmodel = 'vm-model-load';
                }else{
                    this.vmodel = 'vm-model';
                }
            }

        },
    }
</script>
