<template>
  <div class="docker">
  <span v-for="(item, index) in dockerList"
  :class="{'docker__item': true, 'docker__item--active': index === showActive}"
  :key="item.icon"
  class="docker__item"
  >
  <router-link :to="item.to">
    <div class="iconfont" v-html="item.icon"></div>
    <div class="docker__title">{{item.text}}</div>
  </router-link>
  </span>
</div>
</template>

<script>
export default {
    name:'docker',
    props:[
      'showActive'
    ],
    setup(){
        const dockerList = [
            {icon: '&#xe652;',text: '首页', to:{name:'Home'}},
            {icon: '&#xe62a;',text: '购物车', to:{name:'ShopCart'}},
            {icon: '&#xe605;',text: '订单', to:{name:'OrderList'}},
            {icon: '&#xe610;',text: '我的', to:{name:'MyPerson'}}
        ];
        return { dockerList }
    }

}
</script>

<style lang="scss" scoped>
@import '../style/virables.scss';
@import '../style/mixins.scss';
.docker{
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  background: #FFFFFF;
  color: $content-fontcolor;
  box-shadow: 0 -1px 1px 0$content-bgcolor;
  &__item{
     flex: 1;
     text-align: center;
     .iconfont{
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
     }
     a{
       color: $content-fontcolor;
       text-decoration: none;
     }
     &--active {
       a{
        color: #1fa4fc;
       }
     }
  }
  &__title{
    font-size: 20px;
    transform: scale(.5,.5);
    transform-origin: center top;
  }
}
</style>