<template>
  <div id="app">
    <Layout style="height: 100%">
      <!-- <Header></Header> -->
      <Layout>
        <!-- <Sider hide-trigger style="background-color: #fff">
          <sider-bar />
        </Sider> -->
        <Layout style="padding: 0 24px 24px">
          <Content style="padding: 24px;min-height: 280px;background: #fff;position: relative"><router-view/></Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import SiderBar from '@/components/SideBar'
export default {
  components: {
    SiderBar
  }
}
</script>


<style lang="scss">
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
