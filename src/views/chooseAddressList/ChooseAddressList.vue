<template>
  <div class="wrapper">
      <div class="title">
          <div
          class="title__icon iconfont"
          @click="handleBackClick"
          >&#xe75d;</div>
      </div>
       <Address
          v-for="address in addressList"
          :key="address._id"
          :address="address"
          @click="()=>{handleAddressClick(address._id)}"
          />
  </div>
</template>

<script>
import Address from '../../components/Address'
import useCommonAddressEffect from '../../effects/addressEffect'

import { toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute }  from 'vue-router'
export default {
    name:'ChooseAddress',
    components:{Address},
    setup(){
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const shopId = route.params.id
        const { addressList } = toRefs(store.state)
        const { getAddressList } = useCommonAddressEffect()
        getAddressList()
        const handleBackClick =()=>{
            router.back()
        }
        const handleAddressClick =(id)=>{
            router.push(`/ordercomformation/${shopId}/${id}`)
        }
        return { addressList, handleBackClick, handleAddressClick }

    }

}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: $dark-bgColor;
}
.title{
    position: relative;
    line-height: .44rem;
    margin-bottom: .6rem;
    background: #333;
    font-size: .16rem;
    text-align: center;
    &__icon{
        position: absolute;
        left: .18rem;
        top: 0;
        font-size: .2rem;
    }
}

</style>