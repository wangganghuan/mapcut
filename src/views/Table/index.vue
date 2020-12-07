<template>
  <div class="Table">
    <div class="Table-head">
      <el-form :model="form" label-width="" ref="form">
        <el-row :gutter="8">
          <el-col :span="3">
            <div class="user-input">
              <el-form-item label="" prop="holder">
                <el-input
                  v-model="form.holder"
                  placeholder="请输入持有人"
                  clearable
                />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="4">
            <div class="user-search">
              <el-row>
                <el-col :span="16">
                  <div class="user-input">
                    <el-form-item label="" prop="name">
                      <el-input
                        v-model="form.name"
                        :placeholder="!focusData ? '请输入设备名称' : ''"
                        clearable
                        @focus="focus('focus')"
                        @blur="focus('blur')"
                      />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="small"
                    class="btnbgc"
                    :class="[focusData ? 'classfocus' : '']"
                    @click="searchButton"
                    >搜索</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="17" align="right">
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              size="small"
              class="btnbgc"
              @click="addButton"
              >添加</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
   <div class="Table-body">
      <div class="Table-content">
      <el-table :data="tableData" border row-key="id" align="left">
        <el-table-column prop="name" label="设备名称"> </el-table-column>
        <el-table-column prop="mac" label="设备mac"> </el-table-column>
        <el-table-column prop="holder" label="持有人"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              class="bgb"
              @click="handleClick(row, '编辑')"
              >编辑</el-button
            >
            <el-button
              size="small"
              class="bgr"
              @click="handleClick(row, '删除')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Table-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagingData.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagingData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagingData.total"
      >
      </el-pagination>
    </div>
   </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="propClose('取消')"
    >
      <add-prop
        v-if="addShow"
        @propClose="propClose"
        :singleData="singleData"
      />
    </el-dialog>
  </div>
</template>
<script>
import { tableShow, tableDelete } from "@/api/table";
import addProp from "./addProp";
export default {
  data() {
    return {
      dialogTitle: null,
      addShow: false,
      dialogVisible: false,
      pagingData: {
        pageSize: 10,
        page: 1,
        total: 10,
      },
      search: {},
      options: [],
      focusData: false,
      form: {},

      tableData: [],
      singleData: null,
    };
  },

  methods: {
    propClose(conten) {
      this.dialogVisible = false;
      this.addShow = false;
      if (conten != "取消") {
        this.getList();
      }
    },
    getList() {
      let prams = this.pagingData;
      this.showData(prams);
    },
    showData(prams) {
      tableShow(prams).then((res) => {
        this.tableData = res.records;
        this.pagingData.total = res.total;
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick(data, content) {
      if (content == "编辑") {
        this.singleData = JSON.parse(JSON.stringify(data));
        this.dialogVisible = true;
        this.addShow = true;
        this.dialogTitle = "编辑";
      } else {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let prams = { id: data.id };
            tableDelete(prams).then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });

              this.getList()
            });
          })
          .catch(() => {});
      }
    },
    focus(content) {
      if (content == "focus") {
        this.focusData = true;
      } else {
        this.focusData = false;
      }
    },
    addButton() {
      this.dialogVisible = true;
      this.addShow = true;
      this.dialogTitle = "添加";
      this.singleData = null;
    },
    searchButton() {
      this.search.holder = this.form.holder;

      this.search.name = this.form.name;
      let prams = this.search;
      prams.pageSize = this.pagingData.pageSize;
      prams.page = this.pagingData.page;
      this.showData(prams);
    },
    //行拖拽

    //列拖拽
  },
  components: {
    addProp,
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
$tbbdc: #e3e3e3;
.Table {
  &-head {
    line-height: 37px;
    padding: 12px 58px 0 58px;
    border-bottom: solid 1px #e3e3e3;
  }
  &-content {
    padding: 8px;
  }
  &-body{
    padding: 50px;
    padding-bottom: 0;
  }
  .el-table ::v-deep {
    color: #5a6066;
    th {
      background: none;
      height: 36px;
      padding: 0;
      line-height: 30px;
    }
    button {
      padding: 0;
      height: 24px;
      padding: 0 3px;
    }
  }
  .el-table ::v-deep {
    td {
      height: 36px;
      padding: 0;
      line-height: 30px;
    }

    th {
      background-color: #f2f6f8;
    }
  }
  .el-table ::v-deep {
    thead {
      background-color: #f2f6f8 !important;
    }
    .hover-row {
      background-color: #eaf2fa !important;
    }
  }
  .el-pagination {
    padding: 18px 5px 2px 28px;
    display: inline-block;
  }
}

.Table ::v-deep {
  padding-top: 8px;
  .el-input__inner {
    border: 1px solid #e3e3e3;
  }
  .el-pagination__sizes .el-input .el-input__inner {
    font-size: 14px;
  }
  .el-pagination button,
  .el-pagination span:not([class*="suffix"]) {
    font-size: 14px;
    height: 34px;
    line-height: 34px;
  }
  .el-pagination__total {
    color: #9fa5ac;
  }
  .el-input--mini .el-input__inner {
    height: 34px;
    line-height: 34px;
    border-radius: 2px;
  }
  .number {
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    font-weight: normal;
    color: #5a6066;
  }
  .active {
    font-weight: 700;
    color: #1286cc;
  }
  .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev {
    line-height: 34px;
  }
  .el-input--mini .el-input__icon {
    line-height: 34px;
    font-size: 20px;
    color: #5a6066;
    font-weight: 700;
  }
  .el-pagination .el-select .el-input {
    width: 118px;
  }
  .el-pagination .el-select .el-input .el-input__inner {
    padding-right: 50px;
  }
  .el-pagination .el-input__suffix {
    right: 10px;
  }
  .el-pagination__editor.el-input .el-input__inner {
    height: 34px;
    line-height: 34px;
  }
  .el-pagination__editor.el-input {
    width: 58px;
    height: 34px;
    line-height: 34px;
  }
  .el-pagination .btn-next .el-icon,
  .el-pagination .btn-prev .el-icon {
    font-size: 16px;
  }
  .has-gutter,
  .is-leaf {
    color: #444;
  }
  .el-table .cell,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    padding-left: 12px;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid $tbbdc;
  }
  .el-table__row:last-child {
    td,
    th.is-leaf {
      border-bottom: 0;
    }
  }
  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid $tbbdc;
  }
  .el-table--border,
  .el-table--group {
    border: 1px solid $tbbdc;
    border-right: 0;
  }
  .el-table::before {
    height: 0;
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before {
    height: 0;
  }
  .el-table__row {
    height: 40px;
  }
  .btnbgc {
    background-color: #1286cc;
    border-color: #1286cc;
  }
  .btnbgc:hover {
    background-color: #1191de;
    border-color: #1191de;
  }
  .classfocus {
    background-color: #0775b7;
    border-color: #0775b7;
  }
  .el-input__inner {
    border-radius: 2px 0 0 2px;
    height: 35px;
    border-radius: 2px;
    padding: 0 15px 0 8px;
  }
  .el-button--small,
  .el-button--small.is-round {
    padding: 10px 15px 10px 15px;
  }
  .el-button--mini,
  .el-button--small {
    border-radius: 0 2px 2px 0;
  }
  .el-form-item__content {
    line-height: 37px;
  }
}
.bgb {
  color: #44aae8;
  border: 1px solid #44aae8;
}
.bgr {
  color: #f0aaaa;
  border: 1px solid #f0aaaa;
}
</style>