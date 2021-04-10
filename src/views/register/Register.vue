<template>
  <div class="wrapper">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper_img">
      <div class="wrapper_input">
          <input type="text" class="wrapper_input_content" placeholder="请输入用户名"  v-model="username">
      </div>
      <div class="wrapper_input">
          <input type="password" class="wrapper_input_content" placeholder="请输入密码"  v-model="password">
      </div>
      <div class="wrapper_input">
          <input type="password" class="wrapper_input_content" placeholder="请确认密码"  v-model="ensurement">
      </div>
      <div class="wrapper_register-button">注册</div>
      <div class="wrapper_register-link" @click="toLogin">已有账号立即登录</div>
      <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/axios'
import Toast, { useToastEffect } from '../../components/Toast'


// 处理跳转登录逻辑
const toLoginEffect = () =>{
    const router = useRouter()
        const toLogin = () => {
             router.push({ name : 'Login'})
        }
        return { toLogin }
}


const useRegisterEffect = () =>{
    const router = useRouter()
    const data = reactive({
        username: '',
        password: '',
        ensurement: ''
    })

    const handleRegister = async() =>{
    try{
      const result = await post('/api/user/register',{
          username: data.username,
          password: data.password,
        //   ensurement: data.ensurement
      })
      if(result?.errno === 0){
          router.push({name: 'Login'})
      }else{
          showToast('注册失败')
      }
    }catch(e){
        showToast('请求失败')

    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister}
}


export default {
    name:'register',
    components: { Toast }, 
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { toLogin } = toLoginEffect();
    return {
      username, password, ensurement, show, toastMessage,
      handleRegister,toLogin
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
    &_register-button{
        margin: .32rem .4rem .16rem .4rem;
        line-height: .48rem;
        text-align: center;
        background: #0091ff;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        border-radius: .04rem;
        color:#fff;
    }
    &_register-link{
        // margin: 0 auto;
        text-align: center;
        font-size: .14rem;
        color:$content-notice-fontcolor;
    }   

    

}
</style>