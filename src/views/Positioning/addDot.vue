<template>
  <div class="addPath">
    <el-form
      :model="form"
      label-width="100px"
      ref="form"
      :rules="rules"
      :hide-required-asterisk="true"
      label-position="left"
    >
      <el-row :gutter="30">
        <el-col>
          <el-form-item label="AP名字" prop="apname">
            <el-input
              v-model.trim="form.apname"
              placeholder="请输入AP名字"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="mac地址" prop="apmac">
            <el-input
              v-model.trim="form.apmac"
              placeholder="请输入mac地址"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="请选择类型" prop="aptype">
            <el-radio-group v-model="form.aptype">
              <el-radio label="0">实体Ap</el-radio>
              <el-radio label="1">虚拟Ap</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <div class="addComponents-nmust">
            <el-form-item label="备注" prop="memo">
              <el-input
                v-model.trim="form.memo"
                placeholder="请输入备注"
                type="textarea"
                resize="none"
              />
            </el-form-item>
          </div>
        </el-col>

        <!-- <el-col :span="12">
          <el-form-item label="设备mac" prop="mac">
            <el-input v-model="form.mac" placeholder="请输入设备mac" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <div class="addComponents-nmust">
            <el-form-item label="持有人" prop="holder">
              <el-input v-model="form.holder" placeholder="请输入持有人" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="addComponents-nmust">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入电话号码" />
            </el-form-item>
          </div>
        </el-col> -->
        <el-col :span="12">
          <el-button type="danger" icon="el-icon-delete" @click="deleteButton"
          v-show="singleDot"
            >删除AP</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="AddButton"
           v-show="start"
            >添加子AP</el-button
          >
         
        </el-col>
        <el-col align="right" :span="!singleDot&&!start?24:12">
        
          <el-button @click="cancel">取消</el-button>
          <el-button
            type="primary"
            class="btnbgc"
            @click="save('form')"
            :loading="loading"
            >提交</el-button
          >
        </el-col>
      </el-row>
    </el-form>

    <el-dialog
      width="50%"
      title="添加子AP"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div v-if="innerVisibleson">
        <el-form
          :model="son"
          label-width="100px"
          ref="son"
          :rules="sonrules"
          :hide-required-asterisk="true"
          label-position="left"
        >
          <el-row :gutter="30">
            <el-col>
              <el-form-item label="AP名字" prop="apname">
                <el-input
                  v-model.trim="son.apname"
                  placeholder="请输入AP名字"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="mac地址" prop="apmac">
                <el-input
                  v-model.trim="son.apmac"
                  placeholder="请输入mac地址"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="请选择类型" prop="aptype">
                <el-radio-group v-model="son.aptype">
                  <el-radio label="0">实体Ap</el-radio>
                  <el-radio label="1">虚拟Ap</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col>
              <div class="addComponents-nmust">
                <el-form-item label="备注" prop="memo">
                  <el-input
                    v-model.trim="son.memo"
                    placeholder="请输入备注"
                    type="textarea"
                    resize="none"
                  />
                </el-form-item>
              </div>
            </el-col>
            <el-col align="right">
              <el-button @click="soncancel">取消</el-button>
              <el-button
                type="primary"
                class="btnbgc"
                @click="sonsave('son')"
                :loading="loading"
                >提交</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        memo: "",
        apname: "",
        apmac: "",
        aptype: "",
      },
      son: {
        memo: "",
        apname: "",
        apmac: "",
        aptype: "",
      },
      prams:'',
      loading: false,
      innerVisible: false,
      innerVisibleson: false,
      rules: {
        apname: [{ required: true, message: "请输入AP名字", trigger: "blur" }],
        apmac: [{ required: true, message: "请输入mac地址", trigger: "blur" }],
        aptype: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
      sonrules: {
        apname: [{ required: true, message: "请输入AP名字", trigger: "blur" }],
        apmac: [{ required: true, message: "请输入mac地址", trigger: "blur" }],
        aptype: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
    };
  },
  methods: {
    soncancel() {
      this.innerVisible = false;
      this.innerVisibleson = false;
    },
    sonsave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.prams = this.son;
          
          this.prams.aplat = (this.DotData.aplat+this.start[2].aplat)/2;
          this.prams.aplng = (this.DotData.aplng+this.start[2].aplng)/2;
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.innerVisible = false;
          this.innerVisibleson = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let prams = this.form;
          prams.aplat = this.DotData.aplat;
          prams.aplng = this.DotData.aplng;

          if (!this.singleDot) {
            this.$emit("close", "成功", prams);
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          } else {
            this.$emit("close", "修改", prams,this.prams);
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$emit("close", "取消");
    },
    deleteButton() {
      let prams = this.singleDot.index;
      this.$emit("close", "删除", prams);
    },
    singleShow() {
     
      if (this.singleDot) {
        this.form = this.singleDot;
       
      }
    },
    AddButton() {
      this.innerVisible = true;
      this.innerVisibleson = true;
      this.son = {
        memo: "",
        apname: "",
        apmac: "",
        aptype: "",
      };
    },
  },
  created() {
    this.singleShow();
  
  },
  props: {
    DotData: {},
    singleDot: {},
    start:{}
  },
};
</script>
<style lang="scss" scoped>
.addPath::v-deep {
  .el-form-item {
    > label::after {
      content: "*";
      color: #f56c6c;
      margin-left: 4px;
    }
  }
  .addComponents-nmust {
    .el-form-item {
      > label::after {
        content: "";
      }
    }
  }
}
</style>