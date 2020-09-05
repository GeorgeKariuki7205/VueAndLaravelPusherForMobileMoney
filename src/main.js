import Vue from 'vue'
import App from './App.vue'
// import Pusher from 'pusher-js'

// Pusher.logToConsole = true;

// var pusher = new Pusher('ff5ed2584a0c21619365', {
//   cluster: 'ap2'
// });

// var channel = pusher.subscribe('payment-channel');
// channel.bind('PaymentEvent', function(data) {
//   // app.messages.push(JSON.stringify(data));
//   console.log(data);
// });
new Vue({  
  render: h => h(App),
}).$mount('#app')
