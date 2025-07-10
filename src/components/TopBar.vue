<template>
  <div class="topbar">
    <div class="topbar-left">
      人才招聘&nbsp;|&nbsp;党群&nbsp;图书馆&nbsp;爱心捐赠
    </div>
    <div class="topbar-right">
      |&nbsp;EN&nbsp;中&nbsp;
      <span class="search-icon">🔍</span>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  width: 100vw;
  height: 32px;
  background: rgba(0,0,0,0); /* 完全透明 */
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1; /* 调低层级，避免遮挡导航栏 */
  box-sizing: border-box;
}
.topbar-left {
  flex: 1;
  text-align: left;
}
.topbar-right {
  text-align: right;
}
.search-icon {
  margin-left: 8px;
  cursor: pointer;
}
</style> 