

<script>
import { components } from "../config";
export default {
  name: "configPanel",
  props: {
    currentPickType: {
      type: String,
      default: "Container",
    },
  },
  components: {
    ...components,
  },
  methods: {
    renderPanel(h, _type) {
      if (!_type) {
        return;
      }
      const components = this.$options.components;
      console.log(111)
      return components[_type].render.call(this, h);
    },
  },
  render(h) {
    // 渲染面板
    const _type = this.currentPickType;
    let _panel = this.renderPanel(h, _type);
    return _panel;
  },
};
</script>