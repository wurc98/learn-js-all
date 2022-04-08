<template>
    <el-input />
</template>

<script>
export default {
    name:'cInput',
    data(){
        return {

        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.$emit('viewMounted',this) 
        })
    }
}
</script>