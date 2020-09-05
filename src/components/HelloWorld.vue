<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <!-- <h1>SAFARICOM MPESA PUSHER FUNCTIONALITY.</h1> -->
        <h1 style="text-decoration:underline; color:black;">
          <b>MPESA LARAVEL INTEGRATION WITH A REAL TIME APPLICATION.</b>
        </h1>
        <h3>Fill The Details Below To Send Cash To The Organisation.</h3>
        <br />
        <div class="mb-4" style="border:2px solid black; border-radius: 10px;">
          <h2 class="my-4">Using Mpesa PayBill Number.</h2>
          <v-row class="mb-4">
            <v-col class="md-4">
              <h3>Amount:</h3>
            </v-col>
            <v-col class="md-4">
              <v-text-field
                v-model="amount"
                type="number"
                label="Amount"
                outlined
              ></v-text-field>
            </v-col>
            <v-col class="md-4">
              <v-btn outlined @click="sendMoney" color="success" fab large dark>
                <v-icon v-show="showingProgressForSending" >mdi-send</v-icon>
                <v-progress-circular
                v-show="!showingProgressForSending"
                  :size="50"
                  color="green"
                  indeterminate
                ></v-progress-circular>
              </v-btn>
            </v-col>
          </v-row>
          <br />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Pusher from "pusher-js";
export default {
  name: "HelloWorld",
  mounted() {
    // Pusher.logToConsole = true;
    var pusher = new Pusher("ff5ed2584a0c21619365", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe("payment-channel");
    channel.bind("PaymentEvent", function(data) {
      // app.messages.push(JSON.stringify(data));
      console.log("This is the pusher notification.");
      console.log(data);
    });
  },
  data: () => ({
    amount: null,
    messages: [],
    showingProgressForSending: true,
  }),
  components: {},
  methods: {
    sendMoney() {
      console.log("I have clicked end Money." + this.amount);
      var obj = {};
      obj["amount"] = this.amount;
      axios
        .post(
          "https://safaricommobilemoneyintegration.georgekprojects.tk/api/simulateTransaction",
          obj
        )
        .then
        // response => {
        //   // console.log(response);
        // }
        ()
        .catch((error) => {
          console.log("This is the error in the request.");
          console.log(error);
        });
    },
  },
};
</script>
