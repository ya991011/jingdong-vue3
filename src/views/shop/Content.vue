<template>
  <div class="content">
      <div class="category">
          <div
          :class="{'category__item':true, 'category__item--active': currentTab === item.tab}"
          v-for="item in categories"
          :key="item.name"
          @click="() =>handleTabClick(item.tab)"
          >{{item.name}}</div>
      </div>
      <div class="product">
          <div class="product__item" v-for="item in list" :key="item.name">
              <div class="product__item__img">
                  <img :src="item.imgUrl" class="product__item__img">
              </div>
              <div class="product__item__content">
                  <div class="product__item__title">{{item.name}}</div>
                  <p class="product__item__sales">月售:{{item.sales}}</p>
                  <p class="product__item__price">
                      <span class="product__item__yen">&yen;{{item.price}}</span>
                      <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                  </p>
              </div>
              <div class="product__number">
                  <span
                  class="product__number__minus iconfont"
                  @click="()=>{changeCartItem(shopId,item._id,item, -1, shopName)}"
                  >&#xe90a;</span>
                  {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0}}
                  <span
                  class="product__number__plus iconfont"
                  @click="()=>{changeCartItem(shopId,item._id,item, 1, shopName)}"
                  >&#xe675;</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { get } from '../../utils/axios'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects'
 const categories =[
     { name:'全部商品',tab:'all'},
     { name:'秒杀',tab:'seckill'},
     { name:'新鲜水果',tab:'fruit'}
 ]


// 和Tab切换相关的逻辑
 const useTabEffect = () =>{
     const currentTab = ref(categories[0].tab)
      const handleTabClick = (tab) =>{
             currentTab.value = tab
            //  getContentData(tab)
            //  console.log(tab)
         }
         return { currentTab, handleTabClick }

 }


//  列表内容相关的逻辑
const useCurrentListEffect = (currentTab,shopId) =>{
    const content = reactive({
        list:[]
    })
    const getContentData = async() =>{
         const result = await get(`/api/shop/${shopId}/products/`,{
             tab:currentTab.value})
         console.log(result)
         if(result?.errno==0 && result?.data.length){
            content.list = result.data
         }
    }
   watchEffect(()=>{
       getContentData()

   })
   const { list } = toRefs(content)
   return { list }
}
// 购物车相关逻辑
const useCartEffect =() =>{
    const store = useStore()
    const { changeCartInfo, cartList } = useCommonCartEffect()
    console.log(cartList)
    const changeshopName = (shopId, shopName) =>{
             store.commit('changeshopName',{shopId, shopName})

         }
    const changeCartItem = (shopId, productId, item, num, shopName) =>{
             changeCartInfo(shopId, productId, item, num)
             changeshopName(shopId, shopName)
         }
    const getProductCartCount = (shopId,productId) =>{
              console.log(productId)
           return  cartList?.[shopId]?.productList?.[productId]?.count || 0
        }
         return { cartList,changeCartItem, getProductCartCount}
}


export default {
    name:'content',
    props:[
        'shopName'
    ],
    setup(){
         const route = useRoute()
         const shopId = route.params.id
         const { currentTab, handleTabClick } = useTabEffect()

         const { list } = useCurrentListEffect(currentTab, shopId)

         const { changeCartItem, cartList, getProductCartCount} = useCartEffect()
      return { categories, handleTabClick, list, currentTab, shopId, changeCartItem, cartList, getProductCartCount}
    }


}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.content{
    display: flex;
    position: absolute;
    top: 1.5rem;
    left: 0;
    right: 0;
    bottom: .5rem;
}
.category{
    height: 100%;
    width: .76rem;
    overflow-y: scroll;
    background: #F5F5F5;
    border-radius: 2px;
    border-radius: 2px;
    &__item{
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: $content-fontcolor;
        &--active{
        background: #fff;
    }
    }
}
.product{
    flex: 1;
    overflow-y: scroll;
    &__item{
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #f1f1f1;
        &__img{
            width: .58rem;
            height: .58rem;
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
        &__sales{
            margin: 0.06rem 0;
            line-height: .2rem;
            font-size: .12rem;
            color: $content-fontcolor;
        }
        &__price{
            margin: 0;
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