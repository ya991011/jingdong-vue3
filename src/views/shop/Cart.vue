<template>
<div>
<div class="mask" v-if="showCart && Calculations.total>0" @click="showCartEffect"></div>
<div class="cart">
     <div class="product" v-if="showCart && Calculations.total>0">
         <div class="product__header">
             <div class="product__header__all" @click="()=>{setCartItemsChecked(shopId)}">
                 <span
                 class="product__header__all__Img iconfont"
                 v-html="Calculations.allChecked ? '&#xe618;' : '&#xe619;'"
                 ></span>
                 全选
                 </div>
             <div class="product__header__clear"><span class="product__header__clear__span" @click="()=>{cleanCartProducts(shopId)}">清空购物车</span></div>
         </div>
          <div
          v-for="item in productList"
          :key="item._id"
          >
              <div class="product__item" v-if="item.count > 0">
              <div
              class="product__item__checked iconfont"
              v-html="item.check ? '&#xe618;':'&#xe619;'"
              @click="()=>{changeCartChecked(shopId,item._id)}"
              ></div>
              <div class="product__item__img">
                  <img :src="item.imgUrl" class="product__item__img">
              </div>
              <div class="product__item__content">
                  <div class="product__item__title">{{item.name}}</div>
                  <!-- <p class="product__item__sales">月售：{{item.sales}}</p> -->
                  <p class="product__item__price">
                      <span class="product__item__yen">&yen;{{item.price}}</span>
                      <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                  </p>
              </div>
              <div class="product__number">
                  <span
                  class="product__number__minus iconfont"
                  @click="()=>{changeCartInfo(shopId,item._id,item, -1)}"
                  >&#xe90a;</span>
                  {{item.count || 0}}
                  <span
                  class="product__number__plus iconfont"
                  @click="()=>{changeCartInfo(shopId,item._id,item, 1)}"
                  >&#xe675;</span>
              </div>
              </div>
          </div>
     </div>
    <div class="check">
        <div class="check__icon">
            <img
            src="http://www.dell-lee.com/imgs/vue3/basket.png"
            class="check__icon__img"
            @click="showCartEffect"
            >
            <span class="check__icon__tag">{{Calculations.total}}</span>
        </div>
        <div class="check__info">
            总计：<span class="check__info__price">&yen; {{Calculations.price}}</span>
        </div>
        <div class="check__btn" v-show="Calculations.total > 0 && Calculations.price > 0">
            <router-link :to="{path:`/ordercomformation/${shopId}`}">去结算</router-link>
            </div>
        <p v-show="Calculations.total <= 0 && Calculations.price <= 0" class="check__noCart">购物车暂无商品</p>
    </div>
</div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref} from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 购物车相关的逻辑
const useCartEffect = (shopId) =>{
        const store = useStore()
        const { changeCartInfo, productList ,Calculations} = useCommonCartEffect(shopId)


    const setCartItemsChecked =() =>{
        store.commit('setCartItemsChecked',{shopId})
    }
    const changeCartChecked =(shopId, productId) =>{
                 store.commit('changeCartChecked',{shopId,productId})
    }
    const cleanCartProducts =(shopId) =>{
        store.commit('cleanCartProducts',{shopId})


    }

        return { productList, changeCartInfo, changeCartChecked, cleanCartProducts, setCartItemsChecked, Calculations}

}
// 购物车切换相关的逻辑
const useshowCartEffect = () =>{
        const showCart = ref(false)
        const showCartEffect =() =>{
            showCart.value = !showCart.value
        }
        return { showCart, showCartEffect }
}
export default {
    name:'Cart',
    setup() {
        const route = useRoute()
        const shopId = route.params.id

        const { showCart, showCartEffect } = useshowCartEffect()
        const { productList, changeCartInfo, changeCartChecked, cleanCartProducts, setCartItemsChecked, Calculations} = useCartEffect(shopId)
        return { productList, changeCartInfo, shopId, changeCartChecked, cleanCartProducts, setCartItemsChecked, showCart, showCartEffect, Calculations}


    }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.mask{
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
}
.cart{
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    background: $content_fontColor;
}
.check{
    display: flex;
    height: .49rem;
    border-top: .01rem solid $content-bgcolor;
    line-height: .49rem;
    &__icon{
      position: relative;
      width: .84rem;
      &__img{
        display: block;
        margin: .12rem auto;
        width: .28rem;
        height: .26rem;
        }
      &__tag{
          position: absolute;
          left: .46rem;
          top: .04rem;
          padding: 0 .04rem;
          min-width: .2rem;
          height: .2rem;
          background: $hightlight-fontColor;
          border-radius: .1rem;
          font-size: .12rem;
          line-height: .2rem;
          text-align: center;
          transform: scale(.5);
          transform-origin: left center;
          color: $content_fontColor;
      }
    }
    &__info{
        flex: 1;
        color: $content-fontcolor;
        font-size: .12rem;
        &__price{
           line-height: .49rem;
           color: $hightlight-fontColor;
           font-size: .18rem;

        }
    }
    &__btn{
        width: .98rem;
        background: #4fb0f9;
        font-size: .14rem;
        text-align: center;
        a{
            color: $content_fontColor;
            text-decoration: none;
        }
    }
    &__noCart{
        line-height: .25rem;
        margin-right: .2rem;
        color: $content-fontcolor;
    }
}
.product{
    flex: 1;
    background: $content_fontColor;
    overflow-y: scroll;
    &__header{
        display: flex;
        line-height: .52rem;
        color: $content-fontcolor;
        border-bottom: $content-bgcolor solid .01rem;
        &__clear{
            flex: 1;
            text-align: right;
            font-size: .14rem;
            margin-right: .16rem;
            &__span{
                display: inline-block;
            }
        }
        &__all{
            width: .64rem;
            margin-left: .18rem;
            &__Img{
               color: $btn-bgColor;
               font-size: .2rem;
            }
        }
    }
    &__item{
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid $content-bgcolor;
        &__img{
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__content{
            overflow:hidden;
        }
        &__title{
           font-size: 14px;
           color: $content-fontcolor;
           line-height: .2rem;
           @include ellipsis;
        }
        &__price{
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $hightlight-fontColor
        }
        &__yen{
            font-size: .12rem;
        }
        &__origin{
            margin-left: .06rem;
            line-height: .2rem;
            font-size: .12rem;
            color: $light-fontColor;
            text-decoration: line-through;
        }
        &__checked{
            color: $btn-bgColor;
            line-height: .5rem;
            font-size: .2rem;
            margin-right: .2rem;
        }
    }
    &__number{
        position: absolute;
        right: 0;
        bottom: .12rem;
        line-height: .18rem;
        &__minus{
            position: relative;
            top: .02rem;
            color:$medium-fontColor;
            margin-right: .05rem;
        }
        &__plus{
            position: relative;
            top: .04rem;
            color:$btn-bgColor;
            margin-left: .05rem;
            font-size: .21rem;
        }
    }

}
</style>