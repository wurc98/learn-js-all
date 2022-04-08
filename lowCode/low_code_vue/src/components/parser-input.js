import cInput from './cInput';
export default {
    name: 'CInput',
    components:{
        cInput
    },
    render(h,section,_children){
        const _this = this
        const _propsOn = {
            on:{
                viewMounted:e=>{
                    console.log(e)
                }
            },
            nativeOn:{
                click:e=>{
                    e.stopPropagation()
                    _this.$emit('pickType','cInput')
                }
            }
        }
        console.log("render input");
        return (
            <cInput {..._propsOn}></cInput>
        )
    } 
}