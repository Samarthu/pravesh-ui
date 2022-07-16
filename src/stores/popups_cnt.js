import { writable } from "svelte/store";
// import { browser } from "/env";
// const s_arr = JSON.parse( browser && localStorage.getItem('popup_cnt') || [{
//     count:null,
//     rate_per_item :null,
//     amount:null
// },]);

// export const popup_cnt = writable(browser && s_arr);
// popup_cnt.subscribe((val) => browser &&(localStorage.popup_cnt  =  JSON.stringify(val)));

export const popup_cnt = writable([{
    count:0,
    rate_per_item :0,
    amount:0
},]);

export const org_station_list = writable([]);
export const org_ccw_list = writable([]);


