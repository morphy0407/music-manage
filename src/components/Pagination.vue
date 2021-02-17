<template>
  <div id="page">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="100"
      layout="prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: ['pageSize', 'pageChange'],
  data () {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleCurrentChange (curr) {
      console.log('currentPage: ' + curr);
      this.$emit('page-change', curr);
    },
    getTotal () {

    }
  }
}
</script>

<style scoped>

</style>
