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
          <h2 class="my-4">Using Mpesa PayBill Number For Testing.</h2>
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
              <v-btn
                outlined
                @click="sendMoney"
                class="d-inline-block"
                color="success"
                fab
                large
                dark
              >
                <v-icon v-show="showingProgressForSending">mdi-send</v-icon>
                <v-progress-circular
                  v-show="!showingProgressForSending"
                  :size="50"
                  color="green"
                  indeterminate
                ></v-progress-circular>
              </v-btn>
              <span style="color:green" v-show="!showingProgressForSending">
                Waiting
              </span>
              <div class="d-inline-block" v-if="!showingProgressForSending">
                <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="8"
                  :dots-num="3"
                  color="green"
                />
              </div>
            </v-col>
          </v-row>
          {{response}}
          <br />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Pusher from "pusher-js";
import { HollowDotsSpinner } from "epic-spinners";
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
   computed: {
    ...mapGetters(["sentAmountStateGetter"]),    
  },
  created() {  
    const self = this;      
    var pusher = new Pusher("ff5ed2584a0c21619365", {
      cluster: "ap2",
    });
    
    var channel = pusher.subscribe("payment-channel");
    channel.bind("PaymentEvent", function(data) {   
       console.log(data);
       console.log("This is the data."+self.amount);
       
       if (data.content.TransAmount === String(self.amount+'.00')) {
        console.log("I have made a Valid Transacrion.");
        self.response = "I have made a Valid Transacrion.";
        self.showingProgressForSending = !self.showingProgressForSending
      }
      else{
        console.log("We Have Somathing Wrong.  The Transaction Amount:"+data.content.TransAmount);
        self.response = "You Are Not The Cash Sender.";
      }
       
    });
  },
  data() {
    return {
      amount: null,
      messages: [],
      showingProgressForSending: true,
      response:null,
    }},
  components: {
    HollowDotsSpinner,
  },
  methods: {
    pusherConfirmationFunction(data){
      console.log("This is the pusherConfirmationFunction");
      if (data.content.TransAmount === this.amount) {
        console.log("I have made a Transacrion.");
      }
      else{
        console.log("We Have Somathing Wrong.");
      }
    },
    sendMoney() {
      this.showingProgressForSending = !this.showingProgressForSending;

      // ! this section is used to set the state for the mapGetters. 

      this.$store.dispatch("settingAmountState",String(this.amount+'.00'));

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
