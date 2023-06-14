

 <template>
  <div>
    <div class="vanta_area" ref="Area"></div>
    <div class="login">
      <h2>登録</h2>
      <form @submit.prevent="login">
        <label for="username">名前:</label>
        <input type="text" id="username" v-model="username" required>
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required>
        <button type="submit">登録</button>
      </form>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
  </div>
</template>

<script setup>
import * as THREE from 'three'
import HALO from 'vanta/src/vanta.halo'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const Area = ref(null)
let vantaEffect = null

onMounted(() => {
  vantaEffect = HALO({
    el: Area.value,
    THREE: THREE,
    color: 0x5588,
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const login = () => {
  axios// 向服务器发送登录请求，サーバへのログイン要求の送信
    .post('http://localhost:8080/user/login', {
      name: username.value,
      password: password.value,
    })// 页面跳转到欢迎页，ページがウェルカムページにジャンプ
    .then((response) => {
      console.log('登录成功')
      router.push('/welcome')
    })
    .catch((error) => {
      console.error('登录失败:', error)
      errorMessage.value = '账号或密码错误'
    })

  axios
    .post('http://localhost:8080/kanli/login', {
      name: username.value,
      password: password.value,
    })
    // 页面跳转到 kanli.vue，ページがkanli.vueにジャンプ
    .then((response) => {
      console.log('Kanli 登录成功')
      router.push('/kanli')
    })
    .catch((error) => {
      console.error('Kanli 登录失败:', error)
    })
}
</script>


<style lang="less" scoped>
.vanta_area {
  width: 100vw;
  height: 100vh;
}

.login {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  width: 300px; 
  height: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-image: url('~@/assets/background.webp');
  background-size: cover;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding:  10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: #f44336;
  color: #fff;
  border-radius: 4px;
}
</style>
