<template>
  <div class="admin">
    <h2 class="welcome">管理员你好</h2>
    <button class="welcome-button" @click="goToWelcome">跳转到欢迎页</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToWelcome() {
      // 跳转到welcome界面
      this.$router.push('/welcome'); 
    }
  }
};
</script>

<style scoped>
.admin {
  text-align: center;
  margin-top: 50px;
}

.welcome {
  color: #007bff;
  font-size: 24px;
  margin-bottom: 20px;
}

.welcome-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.welcome-button:hover {
  background-color: #0056b3;
}
</style>
