<template>
  <div>
    <h1>用户积分流水</h1>
    <div class="tools">
      <Input
        style="width: 200px;"
        suffix="ios-search"
        placeholder="搜索姓名"
        v-model="queryData.user_name"
      />
      <Button
        class="dept-btn"
        :style="{color: depts.length ? '#515a6e' : '#c5c8ce'}"
        @click="changeTplVisiable(true)"
      >
        {{depts.map(item => item.name).join(', ') || '选择部门'}}
        <Icon style="margin-left: 20px;" type="ios-arrow-down"/>
      </Button>
      <DatePicker
        :value="date"
        format="yyyy-MM-dd"
        type="daterange"
        placement="bottom-end"
        placeholder="开始时间 - 结束时间"
        style="margin-left: 10px; width: 200px"
      ></DatePicker>
      <Button style="margin-left: 10px" size="large" type="primary" @click="query">查询</Button>
      <Button style="float: right" size="large" type="primary" @click="downloadTable">导出报表</Button>
    </div>
    <div class="table">
      <Table :loading="loading" :columns="columns" :data="tableData"></Table>
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
import timestampToDate from "@/utiles/time";
import { getDetail } from "@/http/score";
const columns = [
  {
    title: "时间",
    key: "created_at"
  },
  {
    title: "接入端",
    key: "client_name"
  },
  {
    title: "姓名",
    key: "dept_name"
  },
  {
    title: "部门",
    key: "dept_name"
  },
  {
    title: "动作",
    key: "reason"
  },
  {
    title: "积分变动",
    key: "value_increment"
  },
  {
    title: "积分余额",
    key: "after_amount"
  },
  {
    title: "备注",
    key: "extend_info"
  }
];
export default {
  components: {
    selectedTpl
  },
  data() {
    return {
      date: [
        timestampToDate(new Date().getTime() - 604800000),
        timestampToDate(new Date().getTime())
      ],
      columns: columns,
      tableData: [],
      page: 1,
      total_count: 99,
      loading: true,
      showDept: false,
      depts: [],
      showSelectedTpl: false,
      queryData: {
        user_id: "",
        created_at_from: timestampToDate(new Date().getTime() - 604800000),
        created_at_to: timestampToDate(new Date().getTime()),
        dept_id: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const res = await getDetail({
        page: this.page,
        per_page: 20,
        ...this.queryData
      });
      this.tableData = res.data;
      this.total_count = res.total_count;
      this.loading = false;
      window.scrollTo(0, 0);
    },
    changePage(page) {
      this.page = page;
      this.fetchData();
    },
    setReportRanger(depts) {
      this.depts = depts
    },
    query() {
      this.queryData = {
        user_name: this.queryData.user_name,
        created_at_from: this.date[0],
        created_at_to: this.date[1],
        dept_id: this.depts
          .map(item => item.id)
          .join(",")
      };
      this.fetchData();
    },
    async downloadTable() {
      window.open(
        location.host +
          (await getDetail({ ...this.queryData, export: true })).csv_url
      );
    },
    changeTplVisiable(status) {
      this.showSelectedTpl = status
    }
  }
};
</script>

