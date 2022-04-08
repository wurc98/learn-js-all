
<script>
import { components, parsers } from "../components";
export default {
  name: "RenderEngine",
  props: {
    jsonSchema: {
      type: Object,
      default: () => {},
    },
    //新增拖入舞台的节点
    addNode: {
      type: String,
      default: "",
    },
  },
  components: {
    ...components,
    ...parsers,
  },
  data() {
    return {
      page: null,
    };
  },
  methods: {
    init() {
      this.page = this.jsonSchema.page || {};
    },
    renderRoot(h) {
      let _page = this.page;
      // TODO: 后期丰富全局配置逻辑入口
      return <div class="root">{this.renderComponents(h, _page)}</div>;
    },
    //渲染组件
    renderComponents(h, section) {
      //是否有子节点
      let _children = null;
      if (section.children) {
        _children = this.renderChildren(h, section.children);
      }
      return this.startRender(h, section, _children);
    },
    renderChildren(h, section) {
      let _nodeArray = section.children || [].concat(section);
      //后期可以在此拓展兄弟节点之间通信
      return _nodeArray.map((n, i) => this.renderComponents(h, n, i));
    },
    startRender(h, section, _children) {
      const _type = section.type;
      const renderMod = parsers[_type];
      if (renderMod) {
        return renderMod.render.call(this, h, section, _children);
      }
      console.log("startRender", renderMod, _type);
    },

    //配置系统统一化优化
    //拖拽组件经过触发
    handleDragOver() {
      console.log("handleDragOver")
    },
    //拖拽松手

    handleDrop(event, vm) {
      const _json = vm.jsonSchema;
      if (_json && _json.type === "Container") {
        if (!_json.children) {
          this.$set(_json, "children", []);
        }
        _json.children.push({
          type: this.addNode,
        });
      } 
    },
  },
  created() {
    this.init();
  },
  render(h) {
    let _vode = this.renderRoot(h);
    return _vode;
  },
};
</script> 