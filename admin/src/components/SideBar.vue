<template>
  <Menu :active-name="activeName" theme="light" width="auto">
      <MenuItem to="/turnover" name="Turnover">积分流水</MenuItem>
      <MenuItem to="/query" name="Query">积分查询</MenuItem>
  </Menu>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'turnover'
    }
  },
  created() {
      this.activeName = this.$route.name
  }
};
</script>
<style lang="scss" scoped>
</style>
