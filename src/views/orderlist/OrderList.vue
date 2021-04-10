<template>
<div>
      <div class="wrapper">
          <div class="title">我的订单</div>
             <div class="orders">
               <div class="order" v-for="(item,index) in list" :key="index">
                  <div class="order__title">{{item.shopName}}
                  <span class="order__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
               </div>
               <div class="order__content">
                  <div class="order__content__imgs">
                    <template
                    v-for="(innerItem,innerIndex) in item.products"
                    >
                     <img
                     class="order__content__img"
                     :src="innerItem.product.img"
                     :key="innerIndex"
                     v-if="innerIndex<=3"
                     />
                     </template>
                  </div>
                  <div class="order__content__info">
                     <div class="order__content__price">{{item.totalPrice}}</div>
                     <div class="order__content__count">共{{item.totalNum}}件</div>
               </div>
               </div>
            </div>
          </div>
      </div>
      <Docker :showActive="2"/>
      </div>
</template>

<script>
import Docker from '../../components/Docker'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/axios'


const useOrderListEffect = () =>{
    const data = reactive({ list:[]})
    const getorderList = async() =>{
        const result = await get('/api/order')
        // console.log(result,'--result--')
        if(result?.errno===0 && result?.data?.length){
            const orderList = result.data
            console.log(orderList)
            orderList.forEach((order)=>{
                const products = order.products || []
                let totalPrice = 0
                let totalNum = 0
                products.forEach((productItem)=>{
                    totalNum += (productItem?.orderSales || 0)
                    totalPrice += (productItem?.product?.price * productItem?.orderSales)
                })
                order.totalPrice = totalPrice
                order.totalNum = totalNum

            })
            data.list = result.data
        }
    }
    getorderList()
    const  { list } =toRefs(data)
    return {  list }
}

export default {
    name:'OrderList',
    components:{Docker},
    setup(){
        const { list } = useOrderListEffect()
        console.log(list)

        return { list }
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
  padding: 0;
  background: #eee;
}
.title{
  height: .44rem;
  line-height: .44rem;
  font-size: .16rem;
  color: #333;
  text-align: center;
  background: #fff;
}
.order{
    margin: .16rem .18rem;
    padding: .16rem;
    background: #fff;
 &__title{
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: #333;
 }
 &__status{
     font-size: 14px;
     color: #999999;
     float: right;

 }
 &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info {
      width: .7rem;
    }
    &__price {
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: .14rem;
      font-size: .12rem;
      color: $content-fontcolor;
      text-align: right;
    }
 }

}
</style>