import { createStore } from 'vuex'



const setlocalStorge =(state) =>{
  const { cartList } = state
  const cartaListString = JSON.stringify(cartList)
  localStorage.cartList = cartaListString
}

const getlocalStorge = () =>{
  try{
    return JSON.parse(localStorage.cartList)
  }catch(e){
    return {}
  }
}
export default createStore({
  state: {
    cartList:getlocalStorge(),
    addressList:[]
  },
  mutations: {
    changeCartInfo(state,payload){
      const { shopId, productId, productInfo} = payload
      let shopInfo = state.cartList[shopId] || {
        shopName:'',productList:{}
      }
      // if(!shopInfo){ shopInfo={} }
      let product = shopInfo.productList[productId]
      if(!product){
        product=productInfo
        product.count = 0
       }
      product.count = product.count + payload.num
      if(payload.num>0){product.check = true}
      if(product.count<0){
        product.count=0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] =shopInfo
      setlocalStorge(state)
    },
    changeCartChecked(state,payload){
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setlocalStorge(state)

    },
    cleanCartProducts(state,payload){
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setlocalStorge(state)
    },
    setCartItemsChecked(state,payload){
      const { shopId } =payload
      const products = state.cartList[shopId].productList
      if(products) {
        for(let key in products){
          const product = products[key]
          product.check =true
        }
        setlocalStorge(state)
      }
    },
    changeshopName(state,payload){
      const {shopId, shopName} = payload
      const shopInfo =  state.cartList[shopId] || {
        shopName:'', productList:{}
      }
      shopInfo.shopName = shopName
      state.cartaList[shopId] = shopInfo
      setlocalStorge(state)

    },
    clearCartData(state,shopId){
      state.cartList[shopId].productList = {}
    },
    changeAddressList(state,addressList){
      state.addressList.splice(0,state.addressList.length, ...addressList)
    }
  },
})
