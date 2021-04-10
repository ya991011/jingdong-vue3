<template>
  <div>
    <div class="position">
     <div @click="toBaiduMap"><span class="iconfont position__icon">&#xe70b;</span></div>
    四川省成都市金牛区荷花池
    <span class="iconfont position__notice">&#xe6bb;</span>
   </div>
   <div class="serach">
     <span class="iconfont ">&#xe693;</span>
      <input class="serach__text" placeholder="请输入商品名称或店铺">
   </div>
   <div class="banner">
     <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
   </div>
   <div class="icons">
     <div class="icons__item" v-for="(item,index) in iconList" :key="index">
       <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="" class="icons__item__img">
       <p class="icons__item__desc">{{item.desc}}</p>
     </div>
   </div>
   <div class="gap"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

// const useMapEffect = ()=>{
//   const router = useRouter()
//   const toBaiduMap =()=>{
//         router.push('/map')
//   }
//   return toBaiduMap
// }

export default {
  name: 'staticpart',
  setup(){
    const iconList = [
      { imgName:'超市', desc:'超市便利'},
      { imgName:'菜市场', desc:'菜市场'},
      { imgName:'水果店', desc:'水果店'},
      { imgName:'鲜花', desc:'鲜花绿植'},
      { imgName:'医药健康', desc:'医药健康'},
      { imgName:'家居', desc:'家具时尚'},
      { imgName:'蛋糕', desc:'烘培蛋糕'},
      { imgName:'签到', desc:'签到'},
      { imgName:'大牌免运', desc:'大牌免运'},
      { imgName:'红包', desc:'红包套餐'},
    ];
    const router = useRouter()
    const toBaiduMap = ()=>{
      console.log('2')
      router.push('/map')
    }

    return { iconList, toBaiduMap }
  }

}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.position{
  position: relative;
  display: flex;
  padding:  .16rem .24rem .16rem 0;
  @include ellipsis;
  line-height: .22rem;
  font-size: .16rem;
  .position__icon{
    position: relative;
    top: .01rem;
    font-size: .2rem;
  }
  .position__notice{
    position: absolute;
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
  color: $content-fontcolor;
}
.serach{
  margin-bottom: .12rem;
  line-height: .32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: .16rem;
  .iconfont{
    position: relative;
    top: .03rem;
    display: inline-block;
    padding: 0 .12rem 0 .16rem;
    font-size: .19rem;
  }
  &__text{
    outline: none;
    border: none;
    background: #f5f5f5;
    width: 3rem;
  }
}
.banner{
  // 防止图片加载时页面抖动
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img{
    width: 100%;
  }
}
.icons{
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item{
    width: 20%;
    &__img{
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc{
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap{
  height: .1rem;
  margin: 0 -.18rem;
  background: $content-bgcolor
}
</style>