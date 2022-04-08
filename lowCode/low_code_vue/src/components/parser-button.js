import cButton from './cButton';

export default {
    name: 'CButton',
    components:{
        cButton
    },
    render(h,section,_children){
        const _this = this
        const _propsOn = {
            on:{

            },
            nativeOn:{
                click:e=>{
                    e.stopPropagation()
                    _this.$emit('pickType','cButton')
                }
            }
        }
        console.log("render button");
        return (
            <cButton {..._propsOn} >{_children}</cButton>
        )
    }
}