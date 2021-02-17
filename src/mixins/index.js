export const mixin = {
  methods: {
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    // 根据相对地址获得绝对地址
    getUrl (url) {
      return `${this.$store.state.HOST}/${url}`
    },
    // 获取性别对应文字信息
    changeGender (value) {
      if (value === 0) {
        return '男';
      } else if (value == 1) {
        return '女';
      } else if (value == 2) {
        return '组合';
      } else if (value == 3) {
        return '其他';
      }
      return value;
    },
    attachBirth(value) {
      return String(value).indexOf(0, 10);
    },
    // 图片上传之前的校验
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 图片上传成功后的方法
    handleAvatarSuccess (res) {
      let _this = this;
      if (res.code == 1) {
        _this.singersPageHelper(_this.currentPage, _this.pageSize);
        _this.$notify({
          title: '上传成功',
          type: 'success'
        })
      } else {
        _this.$notify({
          title: '上传失败',
          type: 'error'
        })
      }
    },

  }
}
