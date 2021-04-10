<template>
<div>
<div class="header">
    <div class="header__name">我的全部购物车</div>
</div>
  <div class="wrapper">
      <div class="empty" v-if="Object.keys(cartListWithProducts).length === 0">购物车暂无商品</div>
      <!-- <router-link :to="`/shop/${item._id}`"> -->
      <div class="cartlist" v-for="(item,index) in cartListWithProducts" :key="index">
          <div class="carlist__name">{{item.shopName}}</div>
          <div class="cartlist__content" v-for="product in item.productList" :key="product._id">
              <div class="cartlist__content__image">
                  <img class="cartlist__content__img" :src="product.imgUrl">
              </div>
              <div class="cartlist__content__product">
                  <div class="cartlist__content__product__name">{{product.name}}</div>
                  <div class="cartlist__content__product__price">${{product.price}}*{{product.count}}</div>
              </div>
          </div>
      </div>
      <!-- </router-link> -->
  </div>
  <Docker :showActive="1"/>
</div>
</template>

<script>
import Docker from '../../components/Docker'
import { useStore }  from 'vuex'
import {computed } from 'vue'

const useCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const cartListWithProducts = computed(() => {
    const newCartList = {};
    for(let shopId in cartList) {
      let total = 0
      const products = cartList[shopId].productList
      for(let productId in products) {
        const product = products[productId]
        total += (product.count || 0)
      }
      if(total > 0) {
        newCartList[shopId] = cartList[shopId]
      }
    }
     console.log(newCartList)
    return newCartList;
  })
  console.log(cartList)
  return { cartListWithProducts }
}



export default {
    name:'ShopCart',
    components:{ Docker },
   setup() {
    const { cartListWithProducts } =  useCartEffect()
    return { cartListWithProducts }
  }

}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .1rem .18rem;
  background: #eee;
}
.header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: #fff;
    &__name{
        text-align: center;
        line-height: .44rem;
        font-size: .16rem;
        color: #000000;
    }
}
.empty {
  margin-top: 3rem;
  line-height: .44rem;
  color: $light-fontColor;
  font-size: .16rem;
  text-align: center;
}
.cartlist{
    position: relative;
    margin-top: .7rem;
    padding: .16rem .16rem;
    color: #000000;
    background: #fff;
    &__name{
        font-size: .16rem;
        color:#000;
        }
    &__content{
        position: relative;
        display: flex;
        margin-top: .1rem;
        &__img{
            width: .46rem;
            height: .46rem;
        }
        &__product{
            line-height: .2rem;
            margin-left: .16rem;
            &__name{
                font-size: .14rem;
            }
            &__price{
                font-size: .14rem;
                color: $hightlight-fontColor;
                margin-top: .06rem;
            }
        }
        &__totalprice{
            position: absolute;
            bottom: .03rem;
            right: 0;
            color: #000;


        }
    }
}
.cartlist::after{
    content:'';
    display: block;
    position: relative;
    top: .5rem;
    // right: .18rem;
    // left: .18rem;
    height: .01rem;
    background: #ccc;
    margin-top: .1rem;
}
</style>