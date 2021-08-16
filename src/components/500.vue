<!-- 500 服务开小差页面 -->
<template>
  <div class="error-wrapper">
    <p>服务开小差... {{countDown}} 秒后返回登录页</p>
    <el-button @click="$router.replace('/login')">立即返回</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      countDown: 3,
      timer: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.timer = setInterval(() => {
        this.countDown--
        if (this.countDown == 0) {
          this.$router.replace('/login')
        }
      }, 1000)
    }
  },
  destory () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.error-wrapper {
  text-align: center;
  width: 100%;
  p {
    margin-top: 50px;
    margin-bottom: 20px;
  }
}
</style>
