<!-- 公共底部 -->
<template>
  <div class="footer-wrapper">
    <ul>
      <li>
        <a href="http://www.monetware.com/page/introduction.html" target="_blank">关于我们</a>
      </li>
      <li>
        <router-link to="/privacyPolicy?key=2">服务协议</router-link>
      </li>
      <li style='margin-right: 0;'>
        <router-link to="/privacyPolicy?key=3">隐私政策</router-link>
      </li>
    </ul>
    <div class="copyright rsp-xs-fs14">
        Copyright © 2019 上海萌泰数据科技股份有限公司
        <a href="http://beian.miit.gov.cn" target="_blank" style="font-size: 12px;">&ensp;&ensp;沪ICP备09099644号</a >
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  background: #fff;
  text-align: center;
  padding: 15px 0;
  ul {
    margin-bottom: 10px;
    li {
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
      a {
        color: #000000;
      }
      &:last-child(1) {
        margin-right: 0;
      }
    }
  }
}
.copyright {
  text-align: center;
  font-size: 12px;
  a{
    color: #00405e;
  }
}
</style>

