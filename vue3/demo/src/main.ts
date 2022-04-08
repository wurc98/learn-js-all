import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)

app.directive('focus',{
    beforeMount(el,binding,vnode,prevVnode){
        console.log(binding.instance)
    },
    mounted(el){
        console.log('mounted',el)
        el.focus()
    },
    unmounted(){
        console.log('被卸载')
    }
})

app.mount('#app')