import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';


const app = createApp({

  data() {

    return {
      products: [],
      temp: {},
      apiurl: 'https://vue3-course-api.hexschool.io',
      path: 'kurokawa2021'


    }

  },


  methods: {

    check() {

      axios.post(`${this.apiurl}/v2/api/user/check`)
        .then((res) => {
          console.log('認證成功');
          this.getlist();
        })
        .catch((err) => {
          console.log('認證失敗');
          window.location = 'index.html';

        })


    },
    out() {

      axios.post(`${this.apiurl}/v2/logout`)
        .then((res) => {

          console.log(res.data);
          //登出轉向
          window.location = 'index.html';

        })
        .catch((err) => {
          console.log(err);
        })


    }
    ,

    getlist() {



      // https://vue3-course-api.hexschool.io/v2/api/kurokawa2021/admin/products
      axios.get(`${this.apiurl}/v2/api/${this.path}/admin/products`)
        .then((res) => {

          console.log(res)

          this.products = res.data.products;


        })
        .catch((err) => {
          console.log(err)
        })
    }


  },


  mounted() {



    // 取token

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = token;



    this.check();



  }


})

//掛載
app.mount('#app');


