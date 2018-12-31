<template>
  <div>
    <Modal
      @on-visible-change="visibleChange"
      :title="selectedComponentsData.dialogTitle"
      v-model="modalShow"
      center
      width="630px"
    >
      <div>
        <Row>
          <Col :span="11" class="left_box">
            <div class="grid-content">
              <h5>已选部门</h5>
              <div class="content dept">
                <dept-and-user-item :data="selectedComponentsData.depts" @userClick="userClick"></dept-and-user-item>
              </div>
            </div>
          </Col>
          <Col :span="2">
            <div class="grid-content">&nbsp;</div>
          </Col>
          <Col :span="11">
            <div class="grid-content">
              <h5>通讯录</h5>
              <div class="content jstree">
                <js-tree
                  id="tree"
                  base-url="/api/v2/oauth/admin/proxy/dept"
                  :context-menu-enabled="true"
                  @selectNode="check($event)"
                  @selectAllNode="selectAllNode($event)"
                  @deselectAllNode="deselectAllNode($event)"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div slot="footer" class="dialog-footer">
        <Button @click="cancel">取 消</Button>
        <Button type="primary" @click="sure">确 定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import jsTree from "vue-minxing-jstree";
import deptAndUserItem from "./DeptAndUserItem";
import { formatIncomingUserData } from "../service/service";
import * as R from "ramda";
export default {
  props: ["showSelectedTpl", "depts"],
  components: {
    jsTree,
    deptAndUserItem
  },
  data() {
    return {
      modalShow: false,
      initialUsers: [],
      searchText: "",
      tempUsers: [],
      selectedComponentsData: {
        dialogTitle: "参与考勤人员",
        deptTitle: "已选部门",
        showDept: true,
        depts: [],
        callBack: this.setReportRanger
      }
    };
  },
  methods: {
    userClick(data) {
      for (let i = 0; i < this.selectedComponentsData.depts.length; i++) {
        if (this.selectedComponentsData.depts[i].id == data.id) {
          this.selectedComponentsData.depts.splice(i, 1);
        }
      }
    },
    check(incomingData) {
      incomingData = Array.isArray(incomingData)
        ? incomingData
        : [incomingData];

      var vm = this;
      //console.log('incomingData',JSON.stringify(incomingData),'asdasdsadsadasdasdasd',JSON.stringify(vm.selectedComponentsData.users[0]))
        const deptIds = R.pluck("id")(vm.selectedComponentsData.depts);
        console.log("dept ids =>", deptIds);
        const getIncomingDepts = R.filter(
          item => item.type === "dept" && !R.contains(item.id, deptIds)
        );
        const formatDeptName = R.map(dept =>
          R.assoc("name", dept.short_name, dept)
        );
        const incomingDepts = R.compose(
          formatDeptName,
          getIncomingDepts
        )(incomingData);
        vm.selectedComponentsData.depts = [
          ...vm.selectedComponentsData.depts,
          ...incomingDepts
        ];
    },
    selectAllNode(e) {
      this.check(e.children);
    },
    deselectAllNode(e) {
      var vm = this;
      var arr = e.children;
      vm.selectedComponentsData.users = vm.selectedComponentsData.users.filter(
        user => {
          return !arr.find(
            u => u.login_name === user.login_name && u.dept_id === user.dept_id
          );
        }
      );
      vm.tempUsers = vm.tempUsers.filter(user => {
        return !arr.find(
          u => u.login_name === user.login_name && u.dept_id === user.dept_id
        );
      });
      const isDept = R.propEq("type", "dept");
      const removeDepts = R.compose(
        R.pluck("id"),
        R.filter(isDept),
        R.prop("children")
      )(e);

      vm.selectedComponentsData.depts = vm.selectedComponentsData.depts.filter(
        dept => {
          return !R.contains(dept.id, removeDepts);
        }
      );
    },
    sure() {
      var vm = this;
      vm.$emit('setReportRanger', vm.selectedComponentsData.depts)
      this.$emit('changeTplVisiable', false)
    },
    cancel() {
      this.$emit('changeTplVisiable', false)
    },
    search() {
      console.log("search", this.selectedComponentsData.users);

      this.selectedComponentsData.users = this.selectedComponentsData.users.filter(
        item => {
          return item.name.indexOf(this.searchText) != -1;
        }
      );
      if (!this.searchText) {
        this.selectedComponentsData.users = this.tempUsers;
      }
    },
    visibleChange(status) {
      if (status) {
        console.log(this.depts)
        this.selectedComponentsData.depts = [...this.depts]
      } else {
        this.$emit('changeTplVisiable', false)
      }
    }
  },
  created() {
    
  },
  watch: {
    showSelectedTpl(status, _) {
      console.log('wstatus', status)
      this.modalShow = status
    }
  }
};
</script>
<style lang="scss">
.vakata-context.jstree-contextmenu.jstree-proton-contextmenu > li > a {
  font-size: 12px;
}
</style>

<style scoped>
#tree {
  font-size: 10px;
}

h5 {
  text-align: center;
}

.content {
  border: 1px solid #ccc;
  height: 293px;
  overflow-y: auto;
}

.show-dept {
  height: 293px;
}

.jstree {
  position: relative;
  height: 293px;
}

.tip {
  margin-top: 10px;
  font-size: 12px;
}
.left_box {
  position: relative;
}

.input-with-select {
  position: absolute;
  width: 100%;
  top: 24px;
  left: 0px;
  line-height: 33px;
  background: #ffffff;
  z-index: 99;
}
.show-dept[data-v-031b9482] {
  margin-top: 39px;
  height: 256px;
}
</style>
