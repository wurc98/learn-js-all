<template>
  <div class="hello">
    <div class="header">顶栏</div>
    <div class="mian-content">
      <el-row>
        <el-col :span="4">
          <!-- 物料堆 -->
          <div class="component-stack block">
            <div class="component-title">物料堆</div>
            <ul>
              <li
                v-for="(item, index) in stacks"
                :key="index"
                :draggable="true"
                @drag="handleDrag(item)"
                class="component-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <!-- 主舞台 -->
          <div
            class="stage block"
            @dragover.prevent
            @drop="handleDrop"
          >
            <render-engine
              ref="engine"
              :jsonSchema="currentJson"
              :addNode="selectedType"
              @pickType="handlePickType"
            ></render-engine>
            <!-- <li v-for="(item, index) in component  
              {{ item }}
              <component :is="item"></component>
            </li> -->
          </div>
        </el-col>
        <el-col :span="4">
          <!-- 配置栏 -->
          <div class="config-panel block">
            <div class="component-title">配置栏
              <config-panel :currentPickType='currentPickType'></config-panel>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ConfigPanel from '../fragment/ConfigPanel.vue';
import { components } from "../components";
import RenderEngine from "../fragment/RenderEngine";
export default {
  name: "HelloWorld",
  data() {
    return {
      stacks: ["CButton", "CInput", "Container"],
      components: [],
      jsonSchema: {
        page: {
          type: "Container",
          children: [
            // {
            //   type: "Container",
            //   children: [
            //     {
            //       type: "CInput",
            //     },
            //     {
            //       type: "CButton",
            //     },
            //   ],
            // },
          ],
        },
      },
      currentJson: {},
      //物料堆拾取的类型
      selectedType: "",
      // 舞台拾取的类型
      currentPickType:"Container",
    };
  },  
  methods: {
    //拾取配置节点
    handleDrag(item) {
      this.selectedType = item;
    },
    handleDrop() {
      const _type = this.selectedType;
      this.components.push(_type);
    },
    //松手到container之上
    handleDragContainer(item) {
      item.innerType = this.selectedType;
      console.log('handleDragContainer',item.innerType);
    },
    // 用户点击选中的节点
    handlePickType(type){
      console.log(type)
      this.currentPickType = type
    }
  },
  created() {
    this.currentJson = this.jsonSchema;
  },
  components: 
    {
    ...components,
    RenderEngine,
    ConfigPanel
  },
};
</script>

<style scoped>
.block {
  border: 1px solid var(--mainLine);
  height: 100vh;
}

.header {
  padding: 10px;
}

/* 物料堆 */
.component-title {
  padding: 10px;
}
.component-item {
  border: 1px solid var(--mainLine);
  margin: 2px 5px;
  padding: 10px 0;
  border-radius: 18px;
}
</style>
