<template>
  <div class="addPath">
    <el-form
      :model="form"
      label-width="80px"
      ref="form"
      :rules="rules"
      :hide-required-asterisk="true"
      label-position="left"
    >
      <el-row :gutter="30">
        <el-col>
          <el-form-item label="路线名称" prop="name">
            <el-input
              v-model.trim="form.name"
              placeholder="请输入路线名称"
              clearable
            />
          </el-form-item>
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
        <el-col align="right">
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
  </div>
</template>
<script>
import { positioningAddRoute,positioningUpdateRoute } from "@/api/positioning";
export default {
  data() {
    return {
      form: {
        name: "",
      },
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入路线名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading=true
        if (valid) {
            
          if (!this.singleData.routeName) {
            let prams = {};
            prams.pipeId = this.singleData.id;
            prams.name = this.form.name;

            positioningAddRoute(prams).then((res) => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.loading=false
              this.$emit("close");
            });
          }else{
            let prams={
              id:this.singleData.routeId,
              name :this.form.name
            }
             positioningUpdateRoute(prams).then(res=>{
                this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.loading=false
              this.$emit("close");
             })
          }
        } else {
          this.loading=false
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$emit("close", "取消");
    },
    singleShow() {
      if (this.singleData.routeName) {
        this.form.name = this.singleData.routeName;
      }
    },
  },
  props: {
    singleData: {},
  },
  created() {
    this.singleShow();
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
}
</style>