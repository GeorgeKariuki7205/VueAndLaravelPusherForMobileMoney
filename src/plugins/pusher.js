import Vue from 'vue';
 
Vue.use(require('vue-pusher'), {
    api_key: 'ff5ed2584a0c21619365',
    options: {
        cluster: 'ap2',
        encrypted: false,
    }
});