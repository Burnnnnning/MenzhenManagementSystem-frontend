<template>
    <div class="login-container">
        <h2 class="login-title">用户登录</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" v-model="username" placeholder="请输入用户名" required />
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
            </div>
            <button type="submit" class="submit-button">提交</button>
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
    async handleLogin() {
        if (this.username && this.password) {
            try {
                // 假设有一个登录API
                const response = await axios.post('/api/user_login', {
                    username: this.username,
                    password: this.password
                });

                if (response.data.success) {
                    // 登录成功，跳转到Home页面
                    this.$router.push('/doctor'); // 通过路径跳转
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
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
</style>