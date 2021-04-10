<template>
  <div class="nearby">
     <h3 class="nearby__title">附近店铺</h3>
     <router-link
       v-for="item in nearbyList" :key="item._id"
       :to="`/shop/${item._id}`"
     >
      <shopinfo :item="item"/>
     </router-link>
   </div>

</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/axios'
import Shopinfo from '../../components/Shopinfo.vue';
const useNearbyList = () =>{
  const nearbyList =ref([]);
        const getNearbyList = async() =>{
        const result = await get('api/shop/hot-list')
          if(result?.errno === 0 && result?.data?.length){
            nearbyList.value = result.data
          }
        }
        // console.log(nearbyList)
        return { nearbyList, getNearbyList }
}
export default {
  components: { Shopinfo },
    name: 'nearby',
    setup(){
        const { nearbyList, getNearbyList } = useNearbyList()
        getNearbyList()
        return { nearbyList,getNearbyList };
    }

}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.nearby{
  &__title{
    margin: .16rem 0 .2rem 0;
    font-size: .18rem;
    font-weight: normal;
    color:  $content-fontcolor;
  }
  a{
    text-decoration: none;
  }
}
</style>