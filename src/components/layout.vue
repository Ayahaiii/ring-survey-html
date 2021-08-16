<!-- 布局 -->
<template>
  <div class="layout-wrapper">
    <cus-header></cus-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <cus-footer></cus-footer>
  </div>
</template>

<script>
import cusHeader from './common/header'
import cusFooter from './common/footer'

export default {
  data () {
    return {
    }
  },
  components: {
    cusHeader,
    cusFooter
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  min-height: 100vh;
  min-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .main {
    flex-grow: 1;
    background-color: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .login{
    flex-grow: 1;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }
}
</style>
