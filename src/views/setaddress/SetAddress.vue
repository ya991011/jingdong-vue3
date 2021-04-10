<template>
  <div class="wrapper">
      <div class="header">
          <div class="header__back iconfont" @click="back">&#xe75d;</div>
          <div class="header__center">新建收货地址</div>
          <div class="header__set" @click="upsertAddress">保存</div>
      </div>
      <div class="address">
          <div class="address__city">
              所在城市:
              <input type="text" placeholder="如北京市" v-model="address.city">
          </div>
          <div class="address__school">
              小区/大厦/学校:
              <input type="text" placeholder="如理工大学国防科技园" v-model="address.school">
          </div>
          <div class="address__buildNumber">
              楼号-门牌号:
              <input type="text" placeholder="A号楼B层" v-model="address.__buildNumber">
          </div>
          <div class="address__person">
              收货人:
              <input type="text" placeholder="请填写收货人的姓名" v-model="address.person">
          </div>
           <div class="address__phone">
              联系电话:
              <input type="text" placeholder="请填写收获手机号" v-model="address.phone">
          </div>
      </div>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { post , get, patch } from '../../utils/axios'
import { useStore } from 'vuex'
import useCommonAddressEffect from '../../effects/addressEffect'

const useBackEffect =()=>{
    const back =()=>{
        history.back()
        return back
    }
    return { back }
}


const useAddressEffect =()=>{
    const store = useStore()
    const { addressList } = toRefs(store.state)
    const { getAddressList } = useCommonAddressEffect()
    getAddressList()
    return { addressList }
}

const useFormEffect = (addressId) =>{
    const router = useRouter()
    const address = reactive({})
    const getAddressItem = async()=>{
        const result = await get(`/api/user/address/${addressId}`)
        if(result?.errno === 0 && result?.data){
            const { city, department, houseNumber, name, phone } = result.data
            address.city = city
            address.school = department
            address.buildNumber = houseNumber
            address.person = name
            address.phone = phone
        }
    }
    const upsertAddress = async () =>{
        if(addressId){
            const result = await patch(`/api/user/address/${addressId}`,{
                data:address
            })
            if(result?.errno ===0 ){ router.back()}
        }else{
            const result = await post('/api/user/address',{
                data:address
            })
            if(result?.errno === 0){ router.back() }
        }
    }
if(addressId){getAddressItem()}
return { address, upsertAddress }
}
export default {
    name:'sertAddress',
    setup(){
        // const router = useRouter()
        const route  = useRoute()
        const addressId = route?.params?.id
        const { addressList }  = useAddressEffect()
        const { address, upsertAddress} = useFormEffect(addressId)

        const { back } =useBackEffect()

        return { back, address, upsertAddress, addressId , addressList}
    }

}
</script>

<style lang="scss" scoped>
.wrapper{
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
       font-size: .14rem;
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
    background: #fff;
    margin-top: .12rem;
    padding: .12rem .18rem;
    font-size: .14rem;
    color: #666;
    line-height: .45rem;
    &__city{
        input{
            outline: none;
            border: none;
            width: 70%;
        }
        border-bottom: .01rem solid #f1f1f1;
    }
    &__school{
        input{
            outline: none;
            border: none;
            width: 50%;
        }
        border-bottom: .01rem solid #f1f1f1;
    }
    &__buildNumber{
        input{
            outline: none;
            border: none;
            width: 70%;
        }
        border-bottom: .01rem solid #f1f1f1;
    }
    &__person{
        input{
            outline: none;
            border: none;
            width: 70%;
        }
        border-bottom: .01rem solid #f1f1f1;
    }
    &__phone{
        input{
            outline: none;
            border: none;
            width: 70%;
        }
        // border-bottom: .01rem solid #f1f1f1;
    }
}
</style>