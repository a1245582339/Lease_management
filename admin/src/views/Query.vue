<template>
  <div>
    <h1>用户积分查询</h1>
    <div class="tools">
      <Input style="width: 200px;" suffix="ios-search" placeholder="搜索姓名" v-model="queryData.user_name"/>
      <Button
        class="dept-btn"
        :style="{color: depts.length ? '#515a6e' : '#c5c8ce'}"
        @click="changeTplVisiable(true)"
      >
        {{depts.map(item => item.name).join(', ') || '选择部门'}}
        <Icon style="margin-left: 20px;" type="ios-arrow-down"/>
      </Button>
      <Button style="margin-left: 10px" size="large" type="primary" @click="query">查询</Button>
    </div>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="tableData" @on-sort-change="sortChange"></Table>
    </div>
    <div class="page">
      <Page :current="page" :total="total_count" :page-size="20" @on-change="changePage" simple/>
    </div>
    <selected-tpl @changeTplVisiable="changeTplVisiable" :depts="depts" :showSelectedTpl="showSelectedTpl" @setReportRanger="setReportRanger"></selected-tpl>
  </div>
</template>
<script>
import selectedTpl from "@/share/components/selected_tpl";
import "@/style/main.scss";
import { getTotal } from "@/http/score";
const columns = [
  {
    title: "姓名",
    key: "user_name"
  },
  {
    title: "部门",
    key: "department"
  },
  {
    title: "积分",
    key: "integral",
    sortable: "custom"
  }
];
export default {
  components: {
    selectedTpl
  },
  data() {
    return {
      tableData: [],
      columns: columns,
      page: 1,
      total_count: 99,
      loading: true,
      showDept: false,
      depts: [],
      showSelectedTpl: false,
      queryData: {
        user_id: "",
        dept_id: "",
        order_by: "integral",
        order: "none"
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    sortChange({column, key, order}) {
      order = order === 'normal' ? 'none' : order
      this.queryData.order = order
      this.fetchData()
    },
    async fetchData() {
      this.loading = true;
      const res = await getTotal({
        page: this.page,
        per_page: 20,
        ...this.queryData
      });
      this.tableData = res.data;
      this.total_count = res.total_count;
      this.loading = false;
      window.scrollTo(0, 0);
    },
    setReportRanger(depts) {
      this.depts = depts
    },
    changePage(page) {
      this.page = page;
      this.fetchData();
    },
    query() {
      this.queryData = {
        user_name: this.queryData.user_name,
        dept_id: this.depts
          .map(item => item.id)
          .join(",")
      };
      this.fetchData();
    },
    changeTplVisiable(status) {
      this.showSelectedTpl = status
    }
  }
};
</script>