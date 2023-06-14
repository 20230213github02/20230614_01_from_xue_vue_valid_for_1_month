

<template>
  <div class="app">
    <div class="user">
      <h3 class="table-title">申請情報</h3>
      <div class="new-application">
        <button class="new-button" @click="goToXingui">新規</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>受付番号</th>
            <th>申請区分</th>
            <th>申請日</th>
            <th>申請ステータス</th>
            <th>最終更新日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedData" :key="row.id" class="table-row">
            <td>
              <template v-if="row.appUketsukeNo === '再開'">
                <router-link :to="{ name: 'zaikai' }">{{ row.appUketsukeNo }}</router-link>
              </template>
              <template v-else>
                {{ row.appUketsukeNo }}
              </template>
            </td>
            <td>{{ row.appShinseiKubun }}</td>
            <td>{{ row.appShinseiDate }}</td>
            <td>{{ row.appKokaiyoStatus }}</td>
            <td>{{ row.appShinseishaKoshinDateTime }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination" v-if="totalPages > 1">
        <div class="items-per-page">
          <label for="itemsPerPage">每页显示数据条数：</label>
          <select id="itemsPerPage" v-model="itemsPerPage" @change="changeItemsPerPage">
            <option v-for="option in itemsPerPageOptions" :value="option" :key="option">{{ option }}</option>
          </select>
        </div>
        <div class="page-buttons">
          <button class="page-button" v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)">
            {{ pageNumber }}
          </button>
        </div>
        <div class="page-jump">
          <input type="number" v-model.number="jumpToPage" min="1" :max="totalPages" placeholder="跳转到页数">
          <button class="jump-button" @click="jumpToPageNumber">跳转</button>
        </div>
        <div class="current-page">当前页数：{{ currentPage }}</div>
      </div>

      <div class="news">
        <div class="news-header">
    <h3 class="news-title">お知らせ</h3>
    <button class="btn-all-news" @click="showAllNews = true">お知らせ一覧</button>
  </div>
  
  <table class="news-table">
  <thead>
  
    <tr>
      <th>お知らせ</th>
      <th>掲載開始日</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="news in showAllNews ? newsData : filteredNewsTableData" :key="news.id">
      <td @click="openPopup(news.ntcJUYO)">{{ truncateTitle(news.ntcTITLE) }}</td>
      <td>{{ news.ntcDATE }}</td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPage: 1, // 当前页数
      itemsPerPage: 5, // 每页显示条数
      itemsPerPageOptions: [1, 2, 3, 4, 5], // 每页显示条数选项
      tableData: [],
      newsData: [], // 新闻数据
      newsTableData: [], // 新闻表格数据
      jumpToPage: '', // 跳转到的页数
      showAllNews: false,
    };
  },
  computed: {
    paginatedData() {
      // 计算当前页应显示的数据
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.tableData.slice(startIndex, endIndex);
    },
    totalPages() {
      // 计算总页数
      return Math.ceil(this.tableData.length / this.itemsPerPage);
    },
    filteredNewsTableData() {
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      return this.newsTableData.filter((news) => {
        const newsDate = new Date(news.ntcDATE);
        return newsDate >= sevenDaysAgo && newsDate <= currentDate;
      });
    },
  },
  methods: {
    goToXingui() {
      this.$router.push({ name: 'xingui' });
    },
    changePage(pageNumber) {
      // 切换页数
      this.currentPage = pageNumber;
    },
    changeItemsPerPage() {
      // 当每页显示条数改变时，重置当前页数为第一页
      this.currentPage = 1;
    },
    jumpToPageNumber() {
  // 将输入转换为数字
  const pageNumber = parseInt(this.jumpToPage, 10);
  
  // 检查输入是否为有效的页码
  if (pageNumber >= 1 && pageNumber <= this.totalPages) {
    this.currentPage = pageNumber;
  } else {
    // 显示错误消息或执行适当的操作
    alert('页码数过大！');
  }
  
  // 清空输入框
  this.jumpToPage = '';
},
    truncateTitle(title) {
    if (title.length > 15) {
      return title.slice(0, 15) + '...';
    }
    return title;
  },
    openPopup(value) {
      
      const width = 600; // 弹出窗口的宽度
  const height = 400; // 弹出窗口的高度
  const left = (window.innerWidth - width) / 2; // 弹出窗口的左侧位置
  const top = (window.innerHeight - height) / 2; // 弹出窗口的顶部位置

  const newWindow = window.open('', '_blank', `width=${width},height=${height},left=${left},top=${top}`);
  newWindow.document.write(value);
  newWindow.document.close();
    },
    fetchData() {
      axios
        .get('http://localhost:8080/news/applications')
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.error('获取数据时出错:', error);
        });

      axios
        .get('http://localhost:8080/newspaper/balls')
        .then((response) => {
          this.newsData = response.data;
          this.newsTableData = response.data;
        })
        .catch((error) => {
          console.error('获取新闻时出错:', error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.app {
  background-image: url("@/assets/background.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  display: flex;
  align-items: center;
}
.user {
  text-align: center;
  margin-top: 50px;
  flex-grow: 1;
}

.table-title {
  font-size: 20px;
  margin-top: 30px;
  margin-top: 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.table-row {
  height: 40px;
}

.news {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border-radius: 4px;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.news-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.btn-all-news {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.items-per-page {
  margin-right: 10px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.page-buttons {
  margin-right: 10px;
}

.page-button {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: transparent;
  color: #007bff;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  outline: none;
}

.page-button:hover {
  background-color: #0056b3;
}

.page-jump input {
  width: 60px;
  padding: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.jump-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.jump-button:hover {
  background-color: #0056b3;
}

.current-page {
  margin-top: 10px;
  font-size: 14px;
}

.new-button {
  padding: 5px 10px;
  background-color: transparent;
  color: #f20be6;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  outline: none;
}

.new-button:hover {
  background-color: #f8fc2a;
}

.news-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.news-table th,
.news-table td {
  padding: 8px;
  border: 1px solid #ddd;
}
</style>