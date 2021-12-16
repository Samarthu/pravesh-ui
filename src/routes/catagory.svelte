<script>
    import { goto } from "$app/navigation";
    import Breadcrumb from "../routes/breadcrumb.svelte";

    let routeNext = "";
    let routeNext2 = "";
    let routeNext3 = "";

    export let url = "";

    function routeToPage() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }

    function routeToPage2() {
        let replaceState = false;
        goto(routeNext2, { replaceState });
    }

    function routeToPage3() {
        let replaceState = false;
        goto(routeNext3, { replaceState });
    }

    routeNext = "bussines";
    routeNext2 = "workforce";
    routeNext3 = "vendor";
</script>

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
                <div class="cardWrapper">
                    <div class="bg-velocity cardItems">
                        <a href="">
                            <div on:click={routeToPage3} class="cardContainer">
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
                    </div>

                    <div on:click={routeToPage2} class="bg-bgEcomm cardItems ">
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
                    </div>
                </div>
            </div>
            <div on:click={routeToPage} class="flex mt-m49">
                <div class="backButton">
                    <img src="../src/img/arrowleft.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</div>
