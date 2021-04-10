<template>
<div>
  <div class="order">
    <div class="order__price">实付金额 <b>¥{{Calculations.price}}</b></div>
    <div
      class="order__btn"
      @click="()=>handleSubmitClick(true)"
    >提交订单</div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="()=>handleSubmitClick(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="()=>handleComfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="()=>handleComfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import { useCommonCartEffect } from '../../effects/cartEffects'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/axios'
import { ref }  from 'vue'


// 下单相关逻辑

const sueMakeOrderEffect = (shopId, shopName, productList) =>{
    const router = useRouter()
    const store = useStore()
     const handleComfirmOrder =  async(isCanceled) =>{
        console.log(productList)
        const products = []
        for(let i in productList.value){
            const product = productList.value[i]
            products.push({
                id:parseInt(product._id,10),
                num:product.count
            })
        }
        try{
          const  result = await post('/api/order',{
              addressId:1,
              shopId,
              shopName: shopName.value,
              isCanceled,
              products
          })
           if(result?.errno ===0){
               router.push({name:'OrderList'})
               store.commit('clearCartData',shopId)
           }
        }catch(e){
            // showToast('请求失败')
        }
    }
    return { handleComfirmOrder }
}



// 蒙层相关的逻辑
const usehandleSubmitEffect = () =>{
     const showConfirm = ref(false)
     const handleSubmitClick =(status) =>{
        showConfirm.value = status
    }
    return { showConfirm, handleSubmitClick }
}


export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id,10)
    const { Calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { showConfirm, handleSubmitClick } =  usehandleSubmitEffect()
    const { handleComfirmOrder } = sueMakeOrderEffect(shopId, shopName, productList)
    return { Calculations, handleComfirmOrder, showConfirm, handleSubmitClick}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $content_fontColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: .98rem;
    background: $btn-bgColor;
    color: $content_fontColor;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
    // display: none;
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: $content_fontColor;
    text-align: center;
    border-radius: .04rem;
    &__title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: $content-fontcolor;
    }
    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;
      &--first {
        margin-right: .12rem;
        border: .01rem solid $btn-bgColor;
        color: $btn-bgColor;
      }
      &--last {
        margin-left: .12rem;
        background: $btn-bgColor;
        color: #fff;
      }
    }
  }
}
</style>