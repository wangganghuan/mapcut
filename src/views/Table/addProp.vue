<template>
  <div class="addComponents">
    <el-form
      :model="form"
      label-width="80px"
      ref="form"
      :rules="rules"
      :hide-required-asterisk="true"
      label-position="left"
    >
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="设备名称" prop="name">
            <el-input
              v-model.trim="form.name"
              placeholder="请输入设备名称"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
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
        </el-col>
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
import { tableAdd,tableUpdate} from "@/api/table";
export default {
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      loading: false,
      form: {},
      imageUrl: "",
      headers: { token: localStorage.getItem("token") },
      rules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        mac: [{ required: true, message: "请输入设备mac", trigger: "blur" }],
      },
    };
  },
  methods: {
    singleShow() {
      if (this.singleData) {
        this.form = this.singleData;
      }
    },

    save(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true;
        if (valid) {
          let prams=this.form
          if (!this.singleData) {
            tableAdd(prams)
              .then((res) => {
                this.loading = false;
                this.$emit("propClose");
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
              })
              .catch((err) => {
                this.loading = false;
              });
          }else{
            tableUpdate(prams).then(res=>{
              this.loading = false;
               this.$emit("propClose");
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
            }).catch((err) => {
                this.loading = false;
              });
           
           
          }
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    cancel() {
      this.$emit("propClose", "取消");
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
<style lang="scss"scoped>
.addComponents::v-deep {
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

  .el-form-item__label {
    color: #5a6066;
    font-size: 14px;
    font-weight: normal;
  }

  .el-form-item__error {
    padding-top: 1px;
  }
  .el-upload--picture-card {
    width: 60px;
    height: 60px;
    line-height: 60px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 60px;
    height: 60px;
  }
}
.addComponents {
  &-date {
    width: 100%;
  }
  &-avatar {
    height: 50px;
    width: 50px;
    border-radius: 3px;
  }
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.user-img {
  width: 100%;
}
</style>