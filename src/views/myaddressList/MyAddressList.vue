<template>
  <div class="wrapper">
      <div class="header">
          <div class="header__back iconfont" @click="handleBackClick">&#xe75d;</div>
          <div class="header__center">管理收货地址</div>
          <div class="header__set" @click="handleAddclick">新建</div>
      </div>
      <p class="address">我的收货地址</p>
      <Address
      v-for="address in addressList"
      :key="address._id"
      :address="address"
      @click="() => handleUpdateClick(address._id)"/>
  </div>
</template>

<script>
import Address from '../../components/Address'
import useCommonAddressEffect from '../../effects/addressEffect'


import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
    name:'MyAddressList',
    components:{Address},
    setup(){
        const store = useStore()
        const router =useRouter()
        const { addressList } = toRefs(store.state)
        const { getAddressList } = useCommonAddressEffect()
        console.log(addressList)
        getAddressList(true)
        const handleBackClick = () =>{
            history.back()
        }
        const handleAddclick =()=>{
            router.push({name:'sertAddress'})
        }
        const handleUpdateClick =(addressId)=>{
            router.push(`/sertaddress/${addressId}`)
        }
        return { addressList, handleBackClick, handleAddclick, handleUpdateClick}
    }

}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #eee;
}
.header{
    display: flex;
    flex-direction: space-between;
    padding: 0 .18rem;
    line-height: .44rem;
    background: #fff;
    &__back{
       font-size: .19rem;
       color: #b6b6b6;
    }
    &__center{
        flex: 1;
        font-size: .16rem;
        color: #333;
        text-align: center;
    }
    &__set{
        font-size: .14rem;
        color: #333;
    }
}
.address{
    margin: .18rem .18rem .18rem;
    color: #333;
    font-size: .14rem;
}
</style>