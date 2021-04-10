<template>
  <div class="products">
    <div class="products__title">{{shopName}}</div>
    <div class="products__wrapper">
    <div class="products__list">
    <template v-for="item in products">
            <div class="products__item" v-if="item.count>0" :key="item._id">
                <img :src="item.imgUrl" class="products__item__img">
                <div class="products__item__detail">
                    <h4 class="products__item__title">{{item.name}}</h4>
                    <p class="products__item__price">
                        <span class="products__item__single">
                            <span class="products__item__yen">&yen;</span>
                            {{item.price}} * {{item.count}}
                        </span>
                        <span class="products__item__total">
                             <span class="products__item__yen">&yen;</span>
                             {{(item.price * item.count).toFixed(2)}}
                        </span>
                    </p>
                </div>
            </div>
    </template>
    </div>
</div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'


const useProductsEffect = (productList) =>{
     const products = []
        const productsCheck = productList.value
        for(let i in productsCheck){
             const product = productsCheck[i]
                if(product.check===true){
                     products.push(product)
                }
        }
        return { products }
}
export default {
    name:'Products',
     setup(){
        const route = useRoute()
        const shopId = route.params.id
        const { productList, shopName} = useCommonCartEffect(shopId)
        const { products } = useProductsEffect(productList)
    //   console.log(shopName)

        return { shopName, products}
    }

}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/virables.scss';
.products{
    overflow-y: scroll;
    margin: 2.16rem .18rem .55rem .18rem;
    background: $content_fontColor;
    &__title{
        padding: .16rem;
        font-size: .16rem;
        color: $content-fontcolor;
    }
    &__wrapper{
        overflow-y: scroll;
        margin: 0 .18rem;
        position: absolute;
        left: 0;
        right: 0;
        bottom: .6rem;
        top: 2.6rem;
        // background: $content_fontColor;

    }
    &__list{
    background: $content_fontColor;
    }
    &__item{
        position: relative;
        display: flex;
        padding: 0 .16rem 0.16rem .16rem;
        &__img{
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__detail{
            flex: 1;
        }
        &__title{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipsis;
        }
        &__price{
            display: flex;
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $hightlight-fontColor;
        }
        &__total{
            flex: 1;
            text-align: right;
            color: $dark-fontColor;
        }
        &__yen{
            // margin-right: .9rem;
            font-size: .12rem;
        }
    }

}
</style>