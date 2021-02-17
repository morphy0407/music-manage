<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_words" size="mini" placeholder="请输入歌手名" class="handle-input"></el-input>
        <el-button type="primary" @click="dialogFormVisible = true" size="mini">添加歌手</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" height="500px" size="mini">
      <el-table-column prop="pic" label="歌手图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="singer-img">
            <img :src="changeUrl(scope.row.pic)" style="width: 100%"/>
          </div>
          <el-upload
            class="upload-img"
            :action="uploadUrl(scope.row.id)"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :limit="1">
            <el-button size="mini" type="primary">更新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手" width="120" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="50" align="center">
        <template slot-scope="scope">
          {{changeGender(scope.row.gender)}}
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="120" align="center">
        <template slot-scope="scope">
          {{attachBirth(scope.row.birth)}}
        </template>
      </el-table-column>
      <el-table-column prop="location" label="地区" width="100" align="center"></el-table-column>
      <el-table-column prop="introduction" label="简介" align="center">
        <template slot-scope="scope">
          <p style="height:100px;overflow: scroll">{{scope.row.introduction}}</p>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加歌手" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item label="歌手名" size="mini">
          <el-input v-model="registerForm.name" placeholder="歌手名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="registerForm.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">组合</el-radio>
            <el-radio :label="3">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" size="mini">
          <el-date-picker
            v-model="registerForm.birth"
            type="date"
            placeholder="选择日期"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区" size="mini">
          <el-input v-model="registerForm.location" placeholder="地区" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="简介" size="mini">
          <el-input v-model="registerForm.introduction" placeholder="简介" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSinger">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pagination">
      <pagination :page-size="pageSize" @page-change="handleCurrPageChange"></pagination>
    </div>
  </div>
</template>

<script>
import {mixin} from '../mixins'
import {getSingersListByPage, setSinger} from '../api/index'
import Pagination from '../components/Pagination'

export default {
  name: 'InfoPage',
  components: {Pagination},
  mixins: [mixin],
  data () {
    return {
      dialogFormVisible: false,
      registerForm: {
        id: '',
        name: '',
        gender: '',
        birth: '',
        location: '',
        pic: '',
        introduction: ''
      },
      tableData: [],
      tempData: [],
      select_words: '',
      currentPage: 1,
      pageSize: 5, // 每页条目数
      // currentPage: 1 // 当前页码
    }
  },
  created () {
    // 初始化歌手列表，默认展示第1页
    this.singersPageHelper(1, this.pageSize);
  },
  watch: {
    select_words: function () {
      if (this.select_words == '') {
        this.tableData = this.tempData
      } else {
        this.tableData = []
        for (let item of this.tempData) {
          if (item.name.includes(this.select_words)) {
            this.tableData.push(item)
          }
        }
      }
    }
  },
  methods: {
    // 添加歌手
    addSinger () {
      let d = this.registerForm.birth
      let dateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()

      params.append('name', this.registerForm.name)
      params.append('birth', dateTime)
      params.append('gender', this.registerForm.gender)
      params.append('introduction', this.registerForm.introduction)
      params.append('pic', this.registerForm.pic)
      params.append('location', this.registerForm.location)
      console.log(params)
      setSinger(params)
        .then(res => {
          if (res.code == 1) {
            this.notify('添加成功', 'success')
            // 如果当前页面不满，直接再当前页面展示新插入的数据
            if(this.tableData.length < this.pageSize) {
              let data = {
                'name': this.registerForm.name,
                'birth': dateTime,
                'gender': this.registerForm.gender,
                'introduction': this.registerForm.introduction,
                'pic': this.registerForm.pic,
                'location': this.registerForm.location
              }
              this.tableData.push(data)
            }
          } else {
            this.notify('添加失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.dialogFormVisible = false
    },
    // 转换Url
    changeUrl (url) {
      return this.getUrl(url)
    },
    // 处理上传Url
    uploadUrl (id) {
      console.log('id -> ' + id)
      return `${this.$store.state.HOST}/updateSingerPic/${id}`
    },
    // 当前页变动后重新查找分页数据
    handleCurrPageChange (currPage) {
      console.log('page-change-currPage:' + currPage)
      this.currentPage = currPage;
      this.singersPageHelper(currPage, this.pageSize);
    },
    // 歌手分页查询
    singersPageHelper (page, size) {
      let params = new URLSearchParams();
      params.append('pageNum', page);
      params.append('pageSize', size);
      getSingersListByPage(params).then(res => {
        if(res.length > 0) {
          this.tableData = res;
        } else {
          this.tableData = [];
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.singer-img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
</style>
