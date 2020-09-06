import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import store from './store'
// import Pusher from "pusher-js";

//     var pusher = new Pusher("ff5ed2584a0c21619365", {
//       cluster: "ap2",
//     });
    
//     var channel = pusher.subscribe("payment-channel");
//       channel.bind("PaymentEvent", function(data) {   
//       console.log(data);
//       console.log("This is the data.");
//       store.dispatch("settingAmountState",data.content.TransAmount);
//     });

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
