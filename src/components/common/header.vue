<!-- 公共头部 -->
<template>
  <div id="header-wrapper">
    <!-- 头部 -->
    <div class="page-header">
      <el-row>
        <el-col :xs="8" :sm="8" :md="10" :lg="10" :xl="10">
          <div class="header">
            <router-link to='/project'>
              <img src="../../assets/img/logo.png" alt="logo">
            </router-link>
          </div>
        </el-col>
        <el-col :xs="16" :sm="16" :md="14" :lg="14" :xl="14">
          <div class="banner">
            <div class="item" v-bind:class="{current: active == 3}" @click="changeItem(3)">
              <el-dropdown trigger="click" placement="bottom">
                <span class="el-dropdown-link" v-bind:class="{cur: active == 3}">
                  <i class="el-icon-user-solid"></i> {{ userName }}<i class="el-icon-arrow-down el-icon--right" v-bind:class="{cur: active == 3}"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>锐研数据官网</el-dropdown-item>
                  <el-dropdown-item><span @click="logOff" class="exit">退出</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!--<div class="item" v-bind:class="{current: active == 2}" @click="changeItem(2)"><i class="el-icon-question"></i> 管理中心</div>-->
            <div class="item" v-bind:class="{current: active == 1}" @click="changeItem(1)"><i class="el-icon-s-home"></i> 我的访谈</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import store from '../../store'

export default {
  data () {
    return {
      userName: '',
      active: 1,
    }
  },

  created () {
    let userInfo = this.$cookies.get("userInfo")
    this.userName = userInfo.name
  },

  methods: {
    changeItem (cur) {
      this.active = cur
      if (cur == 1) {
        this.$router.push('/project')
      } else if (cur == 2) {
      }
    },

    /* 退出系统 */
		logOff() {
      this.httpPost("/centerAuth/v1/exit").then(res => {
        if (res && res.code === 0) {
          this.$message({
            message: "退出成功",
            type: "success"
          });
          store.state.permission = {}
          this.$cookies.remove("tokenWeb");
          this.$cookies.remove("userInfo");
          setTimeout(() => {
            this.$router.push("/login");
          }, 1.5 * 1000)
        } else if (res) {
          this.$message.error(res.message);
        }
      })
		},
  }

}
</script>


<style scoped>
  .page-header>>>:focus {
      outline: -webkit-focus-ring-color auto 0px !important;
  }
</style>
<style lang="scss" scoped>
  // 头部
  .page-header{
    height: 60px;
    width: 100%;
    background: #f9f9f9;
    .indexbtn {
      border: 1px solid #333;
      border-radius: 8px;
      width: 50px;
      text-align: center;
      line-height: 30px;
      height: 30px;
      background-color: #ccc;
      color: #333;
      display: inline-block;
      margin-top: 20px;
      margin-right: 13px;
      cursor: pointer;
      float: right !important;
    }
    .header{
      width: 220px;
      height: 60px;
      img{
        cursor: pointer;
        width: 100%;
        padding: 5px 0 0 10px;
      }
    }
    .register{
      float:right;
      margin-right:30px;
    }
    .indexBtn{
      cursor: pointer;
      display: inline-block;
      height: 40px;
      padding: 0px 10px;
      margin: 15px 0;
      color: #fff;
      border-radius: 8px;
      line-height: 40px;
      font-size: 15px;
      background-color: #409eff;
      &.active{
        background-color: #409eff;
      }
    }
  }
  .banner{
    overflow: hidden;
    padding-right: 20px;
    .item{
      cursor: pointer;
      float: right;
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      i{
        font-size: 18px;
        color: #444;
      }
    }
    .current{
      color: #2e83d3;
      border-bottom: 3px solid #2e83d3;
      i{
        color: #2e83d3;
      }
    }
    .cur{
      color: #2e83d3;
    }
  }
  .exit{
    display: inline-block;
    width: 100%;
  }
</style>
