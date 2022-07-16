import { writable } from "svelte/store";

export const workorderdetails = writable({
    organisation : null,
    station :null,
    cost_center:null,
    work_order_type:null,
    resource_type:null,
    van_work_type:null,
    month_and_year:null,
    adhoc_date:null,
    approver_id:null,
    remarks:null,
    send_sms:null
});
