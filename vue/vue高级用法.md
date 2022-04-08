 ## 混入--mixin

 ```js
var myMixin =  {
    created:function(){
        this.hello()
    }
    methods:{
        hello:function(){
            console.log('hello form mixin')
        }
    }
}

var components =new Vue.extend({
    mixins:[myMixin]
})


 ```


 ## 合并策略

 ## 插件
```js
Vue.use(MyPlugin)

```
