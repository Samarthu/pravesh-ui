<script>
    import {onMount} from 'svelte';
    import { Router, Link, Route } from "svelte-routing";
    import Catagory from "./catagory.svelte";
    import { goto } from "$app/navigation";
    import {get_verticles_fun} from '../services/business_vertical_services';
    import {vercticle_name} from '../stores/verticle_store';
    import Toast from './components/toast.svelte';
    
    import {get_verticles_ui_fun} from '../services/business_vertical_services';
    import Breadcrumb from "./breadcrumb.svelte";

    let org_list= [];
    let verticle_list = [];
    let combined_list = [];
    let toast_text = "";
    let toast_type = null;


    let routeNext = "";

    export let url = "";

    function routeToPage() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }
    function org_page_routing(verticle_value){
        vercticle_name.set({    verticle: verticle_value})
        
        
        let replaceState = false;
        goto("organisation-selection", { replaceState });

        // alert("button clicked");
    }
    onMount(async () =>{
        let response = await get_verticles_fun();
        if(response.body.status =="green"){
            console.log("verticles api response",response);
        org_list = response.body.data;
        console.log(org_list);
        toast_text = "Verticles Loaded";
        toast_type = "success";

        }
        else{
            
            
        }
        
        for(let i =0;i<org_list.length;i++){
            if(!verticle_list.includes(org_list[i].domain)){
                verticle_list.push(org_list[i].domain);
            }
        }
        verticle_list = verticle_list;
        console.log('verticle list',verticle_list);

        let demo_ui_response = await get_verticles_ui_fun();
        console.log("verticles ui response",demo_ui_response);
        let demo_data = demo_ui_response.body.data['verticle_ui_settings'];
        // demo_data = JSON.stringify(demo_data);
        demo_data = JSON.parse(demo_data);
        
        // console.log(demo_ui_response.body.data['verticle_ui_settings']);

        console.log("demo data", demo_data);
        for(let i =0;i<verticle_list.length;i++){
            for(let j=0;j<demo_data.length;j++){
                if(verticle_list[i] == demo_data[j].verticle_name){
                    // demo_data[j].verticle_name = verticle_list[i];
                    combined_list.push(demo_data[j]);
                }

            }
            
        }
        combined_list = combined_list;
        console.log("combined list",combined_list);
    })

    routeNext = "catagory";

</script>

<!-- Business Verticle -->
<div class="mainContent ">
    <Breadcrumb />
    <div class="contentsection">
        <div class="innersection ">
            <h4 class="headingText">Business Verticle</h4>
            <p class="descriptionText">
                Select a business verticle to continue onboarding
            </p>
            <div class="cardsectio">
                <div class="cardWrapper">
                    {#each combined_list as item }
                    <nav>
                        <div
                            on:click={org_page_routing(item.verticle_name)}
                            class= {item.carditem_class}
                        >
                            <a href="">
                                <div class="cardContainer">
                                    <div class="cardImage">
                                        <img
                                            src="../src/img/{item.image_name}"
                                            alt=""
                                        />
                                    </div>
                                    <div class="cardContent">
                                        <div class="cardText">
                                            <div class="businessContent">
                                                <h4 class="cardHeading">
                                                    {item.card_name}
                                                </h4>
                                                <p class="cardDescription">
                                                    {item.card_description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </nav>
                        
                    {/each}
                    <!-- <nav>
                        <div
                            on:click={routeToPage}
                            class="bg-bgEcomm cardItems "
                        >
                            <a href="">
                                <div class="cardContainer">
                                    <div class="cardImage">
                                        <img
                                            src="../src/img/ecomm.png"
                                            alt=""
                                        />
                                    </div>
                                    <div class="cardContent">
                                        <div class="cardText">
                                            <div class="businessContent">
                                                <h4 class="cardHeading">
                                                    eCommerce
                                                </h4>
                                                <p class="cardDescription">
                                                    Onboard NDA, HDA, Van
                                                    drivers, vendors, station
                                                    manager...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </nav>

                    
                        <nav>
                            <div class="bg-withRun cardItems">
                                <a href="">
                                    <div class="cardContainer">
                                        <div class="cardImage">
                                            <img src="../src/img/withrun.png" alt="" />
                                        </div>
                                        <div class="cardContent">
                                            <div class="cardText">
                                                <div class="businessContent">
                                                    <h4 class="cardHeading">WithRun</h4>
                                                    <p class="cardDescription">
                                                        OOnboard FMCG items, commodity
                                                        products, partners,
                                                        executives...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </nav>
                        
                           

                        
                       

                    
                    

                    <div class="bg-velocity cardItems">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage ">
                                    <img src="../src/img/velocity.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Velocity
                                            </h4>
                                            <p class="cardDescription">
                                                Onboard transporters, executives
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="bg-credit cardItems">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img src="../src/img/credit.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">Credit</h4>
                                            <p class="cardDescription">
                                                Onboard retailers, distributors,
                                                agents
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div> -->

                    <div class="bg-corporate cardItems">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img
                                        src="../src/img/corporate.png"
                                        alt=""
                                    />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Corporate
                                            </h4>
                                            <p class="cardDescription">
                                                Onboard service providers,
                                                assets and equipments
                                                providers...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    
                </div>
                <!-- <div>
                    {#each verticle_list as verticle }
                     <button on:click={org_page_routing(verticle)} class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-blue-600 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md">{verticle}</button>
                        
                    {/each}
                </div> -->
            </div>
        </div>
        
    </div>
</div>

<Toast type={toast_type}  text={toast_text}/>

