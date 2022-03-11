import { writable, derived } from 'svelte/store';

export const bank_details = writable({
account_holder: null,
account_number: null,
bank_name: null,
bank_type: null,
branch_city: null,
branch_name: null,
branch_pin_code: null,
document_details: [],
facility_id: null,
ifsc_code: null,
re_enter_account_number: null

});

export const verify_ifsc_code_api_url = derived(bank_details,
    $bank_details =>'https://elasticrun.in/ifscapi/'+$bank_details.ifsc_code);

    // export const verify_ifsc_code_api_url = derived(bank_details,
    //     $bank_details =>'https://ifsc.razorpay.com/'+$bank_details.ifsc_code);
