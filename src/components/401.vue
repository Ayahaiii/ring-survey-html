<!-- 无权限跳转页面 -->
<template>
  <div class="error-wrapper">
    <p>您暂无权限访问此页面，{{countDown}} 秒后返回我的访谈</p>
    <el-button @click="$router.replace('/project')">立即返回</el-button>
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
          this.$router.replace('/project')
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
