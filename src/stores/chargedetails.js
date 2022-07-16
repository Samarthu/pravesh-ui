import { writable } from "svelte/store";
export const chargedetails = writable({
        normal_rates:null,
        working_hours:null,
        ad_hoc_rates:null,
        overtime_charges:null,
        agreed_km_limit:null,
        contract_days:null,
        extra_km_charges:null
});
