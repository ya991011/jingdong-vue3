<template>
  <div class="address">
      <div class="address__title">
         <div class="address__title__name">{{address.name}}</div>
         <div class="address__title__phone">{{address.phone}}</div>
      </div>
      <div class="address__list">
         <div class="address__list__content">{{address.city}}{{address.department}}{{address.houseNumber}}</div>
         <div class="address__list__edit iconfont">&#xe623;</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Address',
    props: ['address']

}
</script>

<style lang="scss" scoped>
.address{
    margin: .18rem .18rem .18rem;
    color: #333;
    font-size: .14rem;
    padding: .18rem .16rem;
    background: #fff;
    &__title{
        display: flex;
        &__phone{
            margin-left: .66rem;
        }
    }
    &__list{
        display: flex;
        position: relative;
        margin-top: .08rem;
        &__content{
            margin-right: .2rem;
        }
        &__edit{
            position: absolute;
            right: 0;
            color: #999;
        }

    }
}
</style>