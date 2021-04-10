<template>
<div class="wrapper">
    <Topara />
    <Products />
    <Order />
</div>

</template>

<script>
import Topara from './Topara.vue'
import Products from './Products'
import Order from './Order'
export default {
    name:'OrderComforMation',
    components:{ Topara, Products, Order },
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: $dark-bgColor;
    overflow-y: scroll;
}

</style>