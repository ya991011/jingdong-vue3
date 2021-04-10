<template>
<div class="wrapper">
    <div class="search">
        <div class="search__back iconfont" @click="handleBackClick">&#xe75d;</div>
         <div class="search__content">
            <span class="search__content__icon iconfont">&#xe693;</span>
             <input type="text"
              class="search__content__input"
              placeholder="请输入商品名称"
              >
         </div>
    </div>
    <shopinfo :item="item" :hideBorder="true" />
    <Content :shopName="item.name" />
    <Cart />
</div>
</template>

<script>
import Shopinfo from '../../components/Shopinfo'
import { useRouter, useRoute} from 'vue-router'
import Content from './Content.vue'
import Cart from './Cart.vue'
import { toRefs,reactive } from 'vue'
import { get } from '../../utils/axios'


// 获取当前商铺信息
const useShopInfoEffect = () =>{
    const route = useRoute()
    const data = reactive({ item: {} })
    const getItemData = async () =>{
        const result = await get(`/api/shop/${route.params.id}`)
        console.log(result)
        if(result?.errno === 0 && result?.data) {
            data.item = result.data
        }
    }
    getItemData()
    const { item } = toRefs(data)
    return { item, getItemData }
}

const useBackEffect =() =>{
    const router = useRouter()
    const handleBackClick = () =>{
        router.back()
    }
    return handleBackClick
}
export default {
  components: { Shopinfo, Content, Cart },
    name:'Shop',
    setup(){
        const { item, getItemData } = useShopInfoEffect()
        const  handleBackClick  = useBackEffect()

        return { item, handleBackClick, getItemData }
    }

}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
    padding: 0 .18rem;
}
.search{
    display: flex;
    margin: .14rem 0  0.04rem 0;
    line-height: .32rem;
    &__back{
        width: .3rem;
        font-size: .24rem;
        color: #b6b6b6;
    }
    &__content{
        display: flex;
        flex: 1;
        background: $search-bgColor;
        border-radius: .16rem;
        &__icon{
            width: .44rem;
            font-size: .18rem;
            text-align: center;
            color: $search-fontColor;
        }
        &__input{
            display: block;
            width: 100%;
            padding-right: .2rem;
            border: none;
            outline: none;
            background: none;
            height: .32rem;
            font-size: .14rem;
            color: $content-fontcolor;
            &::placeholder {
                color: $content-fontcolor;
            }
        }
    }
}
</style>