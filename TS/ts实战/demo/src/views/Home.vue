<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div>
      倒计时：{{timeDisplay}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import { measure } from "../decorator/index";
import { RouterHelper } from "../lib/routerHelper";
import { RouterPath } from "../router";
import { CountdownEventName, Countdown,fillZero } from "../lib/countdown";
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public timeDisplay:string = '';

  toAboutPage() {
    RouterHelper.push(RouterPath.User, { userId: "1" });
  }

  longTimeFn(timeout: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, timeout);
    });
  }
  countdown() {
    console.log("倒计时开始")
    const countdown = new Countdown(Date.now() + 60 * 60 * 1000, 500);
    countdown.on(CountdownEventName.RUNNING,remainTimeData=>{
      const {days,hours,minutes,seconds,counts}  =  remainTimeData
      this.timeDisplay = [days,hours,minutes,seconds,counts].map(fillZero).join(':')
    })
  }
  mounted(){
    this.countdown()
  }
  @measure
  async created() {
    await this.longTimeFn(2000);
  }
}
</script>
