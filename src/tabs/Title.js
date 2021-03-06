import { createNamespace, isDef } from '../utils';
import Info from '../info';

const [createComponent, bem] = createNamespace('tab');

export default createComponent({
  props: {
    dot: Boolean,
    type: String,
    info: [Number, String],
    color: String,
    title: String,
    isActive: Boolean,
    ellipsis: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    swipeThreshold: [Number, String],
  },

  computed: {
    style() {
      const style = {};
      const { color, isActive } = this;
      const isCard = this.type === 'card';

      // card theme color
      if (color && isCard) {
        style.borderColor = color;

        if (!this.disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      const titleColor = isActive ? this.activeColor : this.inactiveColor;
      if (titleColor) {
        style.color = titleColor;
      }

      if (this.scrollable && this.ellipsis) {
        style.flexBasis = `${88 / this.swipeThreshold}%`;
      }

      return style;
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },

    genText() {
      const Text = (
        <span class={bem('text', { ellipsis: this.ellipsis })}>
          {this.slots() || this.title}
        </span>
      );

      if (this.dot || (isDef(this.info) && this.info !== '')) {
        return (
          <span class={bem('text-wrapper')}>
            {Text}
            {<Info dot={this.dot} info={this.info} />}
          </span>
        );
      }

      return Text;
    },
  },

  render() {
    return (
      <div
        role="tab"
        aria-selected={this.isActive}
        class={[
          bem({
            active: this.isActive,
            disabled: this.disabled,
            complete: !this.ellipsis,
          }),
        ]}
        style={this.style}
        onClick={this.onClick}
      >
        {this.genText()}
      </div>
    );
  },
});
