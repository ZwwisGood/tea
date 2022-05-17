<template>
  <div class="recommend">
      <Card>
      </Card>
    <ul>
      <li v-for="(item, index) in recommendList" :key="index">
        <h2>
          <img :src="item.imgUrl" alt="" />
        </h2>
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.content }}</p>
          <div class="price">
            <span>￥</span>
            <b>{{ item.price }}</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '@/components/home/Card'
export default {
  name: '',
  props: ['recommendList'],
  data() {
    return {

    }
  },
  components: {
      Card,
  }
}
</script>


<style scoped>
.recommend ul li {
  position: relative;
}
.recommend ul li h2 {
  text-align: center;
}
.recommend ul li img {
  width: 9.6rem;
  height: 3.84rem;
  border-radius: 0.32rem;
}
.recommend ul li > div {
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 0.533333rem;
  right: 0.533333rem;
  top: 0;
}
.recommend ul li > div h3 {
  font-size: 0.426667rem;
  margin-bottom: 0.133333rem;
}
.recommend ul li > div p {
  margin-top: 0.08rem;
  font-size: 0.373333rem;
}
.price {
  margin-top: 0.666667rem;
  color: #b0352f;
  text-align: right;
}
.price span {
  font-size: 0.373333rem;
}
</style>