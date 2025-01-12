<template>
    <div id="building">
        <div class="login-container">
            <h2 class="login-title">收费人员登录</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" id="username" v-model="username" placeholder="请输入用户名" required />
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
                </div>
                <button type="submit" class="submit-button">登录</button>
            </form>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
import { EventBus } from '@/utils/eventBus'; // 导入 EventBus

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async handleLogin() {
            if (this.username && this.password) {
                try {
                    const response = await http.post('/user_login', {
                        user_name: this.username,
                        password: this.password,
                    });
                    EventBus.emit('login', this.username); // 使用 mitt 的 emit 方法
                    console.log(this.username);
                    if (response.message === '登录成功' && this.username === 'admin') {
                        this.$router.push('/manager');
                    } else if (response.message === '登录成功' && this.username !== 'admin') {
                        this.$router.push('/doctor');
                    } else {
                        alert('登录失败，请检查用户名和密码');
                    }
                } catch (error) {
                    alert('登录过程中出现错误');
                }
            } else {
                alert('请输入用户名和密码');
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
}

.login-title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

input:focus {
    border-color: #007bff;
    outline: none;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.submit-button:hover {
    background-color: #0056b3;
}

#building {
    background: url("@/assets/background.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
</style>