<template>
  <div id="app">
    <h1 style="text-decoration:underline; color:black;"> <b>MPESA LARAVEL INTEGRATION WITH A REAL TIME APPLICATION.</b></h1>
    <h3> Fill The Details Below To Send Cash To The Organisation.</h3>
    <div class="container">        
          <div class="row">
            <div class="col-md-6">
              Amount: <input v-model="amount" type="number" name="" id=""/>
            </div>
            <div class="col-md-6">
              <br>
              <button @click="sendMoney"> Send Money.</button>
            </div>

          </div>        
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Pusher from 'pusher-js'
export default {

mounted(){
  // Pusher.logToConsole = true;

    var pusher = new Pusher('ff5ed2584a0c21619365', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('payment-channel');
    channel.bind('PaymentEvent', function(data) {
      // app.messages.push(JSON.stringify(data));
      console.log("This is the pusher notification.");
      console.log(data);
      
    });
},

  name: 'App',
  data: () => ({
        amount:null,
        messages: [],
  }),
  components: {
    
  },
  methods: {
      sendMoney(){
        console.log("I have clicked end Money."+this.amount);
        var obj = {};
        obj['amount'] = this.amount;
        axios.post("https://safaricommobilemoneyintegration.georgekprojects.tk/api/simulateTransaction",obj).then(
            // response => {    
            //   // console.log(response);             
            // }
        ).catch( error =>{
            console.log("This is the error in the request.");
            console.log(error);
        });
      }
  },

  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
