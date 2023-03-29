import { debounce } from '@/utils'

export default {
  data() {
    return {
      $_resizeHandler: null,
      $_wrapperElm: null,
      $_observer: null
    }
  },
  mounted() {
    this.initListener()
  },
  activated() {
    if (!this.$_resizeHandler) {
      // avoid duplication init
      this.initListener()
    }

    // when keep-alive chart activated, auto resize
    this.resize()
  },
  beforeDestroy() {
    this.destroyListener()
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential

    initListener() {
      this.$_resizeHandler = debounce(() => {
        this.resize()
      }, 100)

      this.$_wrapperElm = this.$el
      // 启动对指定的观察 $el
      if(this.$_wrapperElm) {
        this.$_observer = new ResizeObserver(entries => {
          entries.forEach(() => {
            this.$_resizeHandler()
          })
        })
        this.$_observer.observe(this.$_wrapperElm);
      }


    },
    destroyListener() {
      // 取消观察 $el 特定观察者的所有观察目标,离开界面的时候销毁
      if(this.$_wrapperElm) {
        this.$_observer.disconnect()
        this.$_observer = null
      }

      this.$_resizeHandler = null

    },
    resize() {
      const { chart } = this
      chart && chart.resize()
    }
  }
}
