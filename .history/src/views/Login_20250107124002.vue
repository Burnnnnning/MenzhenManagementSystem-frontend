<template>
    <div class="login-container">
        <h2 class="login_title">用户登录</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" v-model="username" placeholder="请输入用户名" required />
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        handleLogin() {
            // 这里可以添加登录逻辑，比如调用API验证用户名和密码
            if (this.username && this.password) {
                alert(`用户名: ${this.username}, 密码: ${this.password}`);
                // 你可以在这里添加跳转到其他页面的逻辑
            } else {
                alert('请输入用户名和密码');
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    color: #505458;
    text-align: center;
    margin-bottom: 40px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #505458;
}

input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    font-size: 14px;
}

input:focus {
    border-color: #007bff;
    outline: none;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}
</style>