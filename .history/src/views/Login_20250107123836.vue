<template>
    <div class="login-container">
        <el-form ref="form" :model="login" status-icon :rules="rules" label-width="70px">
            <h3 class="login_title">用户登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="login.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" type="primary" style="margin-left:30px;margin-top:10px">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookie from 'js-cookie';
import { getMenu } from '../api/index';

export default {
    data() {
        return {
            login: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.login).then((data) => {
                        if (data.data.code === 20000) {
                            Cookie.set('token', data.data.data.token);
                            this.$store.commit('setMenu', data.data.data.menu);
                            this.$store.commit('addMenu', this.$router);
                            this.$router.push('/home');
                        } else {
                            this.$message.error(data.data.data.message);
                        }
                    });
                }
            });
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
}

.login_title {
    color: #505458;
    text-align: center;
    margin-bottom: 40px;
}

.el-input {
    width: 198px;
}
</style>