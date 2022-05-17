<template>
  <div class="like">
      <Card>
          <span>猜你喜欢</span>
      </Card>
      <ul>
          <li 
          @click="goDetail(item.id)"
           v-for="(item,index) in likeList" :key="index">
              <h2>
                  <img v-lazy="item.imgUrl" alt="">
              </h2>
              <h3 class="name">{{item.name}}</h3>
              <div class="price">
                  <span>￥</span>
                  <b>{{item.price}}</b>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import Card from '@/components/home/Card'
//mint-ui的懒加载组件
export default {
    props:['likeList'],
    data() {
        return {
            
        }
    },
    methods: {
        goDetail(id){
            this.$router.push({
                path: '/detail',
                query:{
                    id
                }
            })
        }
    },
    components: {
        Card
    },
}
</script>

<style scoped>
h2{
    font-size: 0;
}
.like ul{
    display: flex;
    flex-wrap: wrap;
}
.like ul li{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
}
.like img{
    width: 4.693333rem;
    height: 4.693333rem;
}
.name{
    width: 93%;
    font-size: 0.4rem;
    padding: 0.08rem 0 0 0;
    font-weight: 300;
    color: #222222;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.price{
    width: 93%;
    font-size: 0.533333rem;
    color: #b0352f;
    margin-bottom: 0.266667rem;
}
.price span{
    font-size: 0.373333rem;
    font-weight: 600;
}
</style>