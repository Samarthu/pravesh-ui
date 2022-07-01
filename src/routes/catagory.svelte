<script>
    import { goto } from "$app/navigation";
    import {onMount} from 'svelte';
    import {get_categories_list} from '../services/category_services';
    import {get_category_ui_properties} from '../services/category_services';
    import {category_store_name} from '../stores/category_store';
    import {facility_data_store} from '../stores/facility_store';
    import Breadcrumb from "../routes/breadcrumb.svelte";
    import {img_url_name} from '../stores/flags_store';
    import Toast from './components/toast.svelte';
    import Spinner from "./components/spinner.svelte";
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import {success_toast ,error_toast,warning_toast} from '../services/toast_theme';
    let toast_text = "";
    let toast_type = null;
    let show_spinner = false;

    let routeNext = "";
    let routeNext2 = "";
    let routeNext3 = "";
    let category_list = [];
    let category_ui_properties_list = [];  
    let combined_category_properties = [];  

    export let url = "";

    function routeToPage() {
        let replaceState = false;
        goto("organisation-selection", { replaceState });
    }

    function routeToPage2() {
        let replaceState = false;
        goto(routeNext2, { replaceState });
    }

    function routeToPage3() {
        let replaceState = false;
        goto(routeNext3, { replaceState });
    }
    function clickhandle(category_id) {
        category_store_name.set({category_name:category_id});
        
        let replaceState = false;
        goto("workdetails", { replaceState });
        console.log("category_id",category_id);
        

    }

    routeNext = "bussines";
    routeNext2 = "workforce";
    routeNext3 = "vendor";
    onMount(async () =>{
        show_spinner = true;
        if(!$facility_data_store.org_id){
            goto("facility_type_select",{replaceState :false})
        }
        let category_response = await get_categories_list();

        console.log("category_response",category_response);
        if(category_response.body.status == "green"){
            if(category_response.body.status == "green"){
            for(let i=0;i<category_response.body.data.length;i++){
               category_list.push( category_response.body.data[i]["category"]);
            }
        }
        else{
            // alert("Category list not found");
            error_toast("Category list not found");
        }

        console.log("category_list",category_list);
      

        }
        else{
            show_spinner = false;
            // toast_type = "error";
            // toast_text = "Category list not found";
            error_toast("Category list not found");


        }
       

        let response = await get_category_ui_properties();

        if(response.body.status == "green"){
            response = response.body.data['category_ui_properties'];
            category_ui_properties_list = JSON.parse(response)
            console.log("ui property",category_ui_properties_list);
            for(let i =0;i<category_list.length;i++){
                for(let j=0;j<category_ui_properties_list.length;j++){
                    if(category_list[i] == category_ui_properties_list[j]['type']){
                        combined_category_properties.push(category_ui_properties_list[j]);
                        
                        break;
                    }
                }
                
            }
            combined_category_properties = combined_category_properties;
            // console.log("combined_category_properties",combined_category_properties);

        }
        else{
            show_spinner = false;
            error_toast("Category  UI propeerties not found");
            // toast_type = "error";
            // toast_text = "Category  UI propeerties not found";
        }
        show_spinner = false;

    })
</script>

{#if show_spinner}
<Spinner />
    
{/if}

<!-- Category -->
<div class="mainContent ">
    <div class="breadcrumb">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext">
                <span class="text-textgrey pr-1 text-base"
                    >Home / Onboard New /
                </span> <span class="text-base"> Category</span>
            </p>
        </div>
    </div>
    <div class="contentsection">
        <div class="innersection ">
            <h4 class="headingText">Category</h4>
            <p class="descriptionText">
                Select a category type to continue onboarding
            </p>
            <div class="cardsectio">
                <div class="cardWrapper ">
                    {#each combined_category_properties as category }
                    <div class={category.class_name}  on:click={() =>clickhandle(category.type)} >
                        
                            <div  class="cardContainer">
                                <div class="cardImage ">
                                    <img src="{$img_url_name.img_name}/{category.image_name}" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">{category.category_name}</h4>
                                            <p class="cardDescription">
                                                {category.card_description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                        
                    {/each}
                    <!-- <div class="bg-velocity cardItems" on:click={routeToPage3}>
                        <a href="">
                            <div  class="cardContainer">
                                <div class="cardImage ">
                                    <img src="../src/img/manager.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">Vendor</h4>
                                            <p class="cardDescription">
                                                Add new vendor who provides
                                                services, manpower
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div> -->

                    <!-- <div on:click={routeToPage2} class="bg-bgEcomm cardItems ">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img src="../src/img/Group.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Workforce
                                            </h4>
                                            <p class="cardDescription">
                                                Add new staff/associate who
                                                work’s on the field
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div> -->
                </div>
            </div>
            <div on:click={routeToPage} class="flex mt-m49">
                <div class="backButton">
                    <img src="{$img_url_name.img_name}/arrowleft.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</div>
<Toast type={toast_type}  text={toast_text}/>
<SvelteToast />
