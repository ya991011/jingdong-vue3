<template>
<div>
<div class="wrapper">
   <StaticPart />
   <Nearby />
</div>
   <Docker :showActive="0"/>
   </div>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from '../../components/Docker'
export default {
  name: 'Home',
  components: { StaticPart,Nearby,Docker }
}
</script>

<style lang="scss" scoped>
// @import '../style/virables.scss';
// @import '../style/mixins.scss';
.wrapper{
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .1rem .18rem;
}
</style>
