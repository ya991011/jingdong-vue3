<template>
<div>
<div class="wrapper">
    <div class="header">
        <div class="header__info iconfont">&#xe983;</div>
        <div class="header__card">
            <div class="header__card__image">
                <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" class="header__card__img">
            </div>
            <div class="header__card__name">热心市民李先生</div>
            <div class="header__card__id">ID:14442222</div>
            <div class="header__card__account">
                <div class="header__card__account__envelopes">
                    <p class="header__card__account__label">红包</p>
                    <p class="header__card__account__num">218</p>
                </div>
                <div class="header__card__account__coupons">
                    <p class="header__card__account__label">优惠卷</p>
                    <p class="header__card__account__num">12张</p>
                </div>
                <div class="header__card__account__bean">
                    <p class="header__card__account__label">鲜豆</p>
                    <p class="header__card__account__num">88</p>
                </div>
                <div class="header__card__account__blank">
                    <p class="header__card__account__label">白条</p>
                    <p class="header__card__account__num">1000</p>
                </div>
            </div>
        </div>
    </div>
    <div class="list">
        <div class="list__item">
        <div class="list__item__icon iconfont">&#xe8d4;</div>
        <div class="list__item__test">我的钱包</div>
        <div class="list__item__arrow iconfont">&#xe623;</div>
      </div>
      <div class="list__item" @click="toAddress">
        <div class="list__item__icon iconfont">&#xe8f0;</div>
        <div class="list__item__test">我的地址</div>
        <div class="list__item__arrow iconfont">&#xe623;</div>
      </div>
      <div class="list__item">
        <div class="list__item__icon iconfont">&#xe600;</div>
        <div class="list__item__test">客服与帮助</div>
        <div class="list__item__arrow iconfont">&#xe623;</div>
      </div>
    </div>
</div>
<Docker :showActive="3"/>
</div>
</template>

<script>
import Docker from '../../components/Docker'
import { useRouter } from 'vue-router'

const useAddressEffect = (router) =>{
    const toAddress =()=>{
        router.push('/addresslist')
    }
    return { toAddress }
}
export default {
 components:{ Docker },
 setup(){
    const router = useRouter()
    const { toAddress } = useAddressEffect(router)

     return { toAddress }
 }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background: #eee;
}
.header{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2.8rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  &__info{
      position: absolute;
      top: .57rem;
      right: .21rem;
      font-size: .21rem;
      color: #FFFFFF;
  }
  &__card{
     position: absolute;
     right: .18rem;
     left: .18rem;
     bottom: -.25rem;
     background: #fff;
     border-radius: .1rem;
     &__img{
         position: absolute;
         top: -0.47rem;
         left: 50%;
         transform: translate(-50%);
         width: .94rem;
         height: .94rem;
         border-radius: 50%;
     }
     &__name{
         margin: .59rem .84rem 0 .85rem;
         font-size: .2rem;
         color: #262628;
         letter-spacing: 0.19px;
         text-align: center;
         line-height: 36px;
     }
     &__id{
         font-size: 14px;
         color: #C1C0C9;
         text-align: center;
         margin-top: .02rem;
     }
     &__account{
         display: flex;
         justify-content: space-around;
         margin-top: .02rem;
         border-top: .01rem solid #f1f1f1;
         &__label{
             font-size: .12rem;
             color: #C1C0C9;
             text-align: center;
         }
         &__num{
             font-size: .14rem;
             color: #262628;
             text-align: center;
         }
     }

  }

}
.list{
    position: absolute;
    top: 3.27rem;
    right: .18rem;
    left: .18rem;
    padding: 0 .18rem;
    border-radius: .1rem;
    background: #fff;
    &__item{
        position: relative;
        display: flex;
        padding: .2rem;
        line-height: .1rem;
        &__icon{
            margin-right: .12rem;
        }
        &test{
            flex: 1;
        }
        &__arrow{
            position: absolute;
            right: .2rem;
            font-size: .07rem;
            color: #c2c4ca;

        }
    }
}
</style>