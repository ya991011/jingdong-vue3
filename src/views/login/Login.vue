<template>
  <div class="wrapper">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper_img">
      <div class="wrapper_input">
          <input type="text" class="wrapper_input_content" placeholder="请输入用户名" v-model="username">
      </div>
      <div class="wrapper_input">
          <input type="password" class="wrapper_input_content" placeholder="请输入密码" v-model="password">
      </div>
      <div class="wrapper_login-button" @click="handleLogin">登录</div>
      <div class="wrapper_login-link" @click="toRegister">立即注册</div>
      <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/axios'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理注册跳转
const toRegisterEffect = () =>{
     const router = useRouter()
        const toRegister = () => {
             router.push({ name : 'Register'})
        }
        return { toRegister }

}


// 处理登录逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })

  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
        showToast('登陆失败')

      } else {
        showToast('登陆失败')
      }
    } catch (e) {
        // console.log('请求失败')
      showToast('请求失败')
    }
  }

  const { username, password } = toRefs(data)
  return { username, password, handleLogin}
}
export default {
    name:'Login',
    components: { Toast },

    setup(){
        const { toRegister } = toRegisterEffect()
        const { show, toastMessage, showToast } = useToastEffect()
        const { username, password, handleLogin } = useLoginEffect(showToast)
         return {
           username, password, show, toastMessage,
           handleLogin, toRegister,
        }
    }

}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &_img{
        display: block;
        margin: 0 auto .4rem auto;
        width: .66rem;
        height: .66rem;
    }
    &_input{
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        background: #f9f9f9;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 6px;
        &_content{
            width: 100%;
            outline: none;
            border: none;
            line-height: .48rem;
            background: none;
            font-size: .16rem;
            color:#777;
            &::placeholder {
                color:$content-notice-fontcolor;
            }
        }
    }
    &_login-button{
        margin: .32rem .4rem .16rem .4rem;
        line-height: .48rem;
        text-align: center;
        background: #0091ff;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        border-radius: .04rem;
        color:#fff;
    }
    &_login-link{
        // margin: 0 auto;
        text-align: center;
        font-size: .14rem;
        color:$content-notice-fontcolor;
    }   

    

}
</style>