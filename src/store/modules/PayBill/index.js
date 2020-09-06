const state = {
    sentAmounts: null,
};
const mutations = {
    SETTING_THE_SENT_AMOUNTS_STATE(state,payload){
            state.sentAmounts = payload;
    },
    UNSETTING_THE_AMOUNTS_SENT(state,payload){
        state.sentAmounts = payload;
    }
};
const actions = {
    // ! this is the function that is used to set the sentAmount state. 
    settingAmountState({commit},amount){

        commit("SETTING_THE_SENT_AMOUNTS_STATE",amount);

    }
};
const getters = {    
    sentAmountStateGetter: state => state.sentAmounts,
};


const PayBill = {
    state,
    mutations,
    actions,
    getters
}

export default PayBill;