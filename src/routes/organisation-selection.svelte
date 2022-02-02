<script>
    import {onMount} from 'svelte';
    import { goto } from "$app/navigation";
    import {vercticle_name} from '../stores/verticle_store';
    import {get_organistaion_method} from '../services/organisation_services';
    import {org_name} from '../stores/organisation_store';
    let verticle = null;
    let org_list = [];
    let org_select = null;
    onMount(async () =>{
        vercticle_name.subscribe(value =>{
            verticle = value.verticle;
        });
        console.log("vectore name", verticle);
        let response = await get_organistaion_method();
        console.log("response", response);
        org_list = response.body.data;
        console.log("org_list", org_list);

    });
    function onclickhandel(){
        org_name.set({org_id:org_select});
        let replaceState = false;
        goto("catagory", { replaceState });
        // alert(org_select);
    }

</script>

<div class="mainContent ">
    <h1>you are on the organization page</h1>
    <label for="org">Select Organisation</label>
    <select name="org" id="org" bind:value={org_select} on:change={() => onclickhandel()}  >
        {#each org_list as org }
        <option value={org.org_id}>{org.org_name}</option>
            
        {/each}
    </select>
    <div>
        {org_select}
    </div>


</div>