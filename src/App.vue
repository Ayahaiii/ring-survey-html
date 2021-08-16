<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  display: flex;
}
.el-header, .el-main, .el-footer{
  padding: 0 !important;
}
.el-header{
  height: 100px;
}
.el-footer{
  height: 190px;
}
.router-link-active {
  text-decoration: none;
  color: #d7d7d7;
}
a{
  color: #d7d7d7;
}
.brand{
  margin: 20px 0;
}
.el-breadcrumb__inner.is-link {
  font-weight: normal !important;
  text-decoration: none;
  -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
  transition: color .2s cubic-bezier(.645,.045,.355,1);
  color: #2e83d3 !important;
}
.el-breadcrumb__inner {
  color: #2e83d3 !important;
}
.el-input-number__increase{
  width: 15px !important;
  font-size: 12px;
}
.brand .iconfont{
  font-size: 15px;
  font-weight: bold;
}
.pagination{
  margin: 20px 0;
}
.mini span{
  font-size: 12px !important;
}
.fs12{
  font-size: 12px !important;
}
.el-date-editor .el-range-separator {
  display: inline-block;
  height: 100%;
  padding: 0 5px;
  margin: 0;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  width: 8%;
  color: #303133;
}
.el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
}
</style>
