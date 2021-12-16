<script>
    import { goto } from "$app/navigation";

    let routeBack = "";

    export let url = "";

    function routeToPage() {
        let replaceState = false;
        goto(routeBack, { replaceState });
    }

    routeBack = "catagory";
</script>

<!-- Vendor  -->
<div class="mainContent ">
    <div class="breadcrumb">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext">
                <span class="text-textgrey pr-1 text-base"
                    >Home / Onboard New /
                </span> <span class="text-base"> Vendor</span>
            </p>
        </div>
    </div>
    <div class="contentsection">
        <div class="innersection ">
            <h4 class="headingText">Vendor</h4>
            <p class="descriptionText">
                Select a vendor type to continue onboarding
            </p>
            <div class="cardsectio">
                <div class="cardWrapper">
                    <div class="bg-velocity cardItems">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage ">
                                    <img src="../src/img/investor.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Man Power Contractor
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="bg-bgEcomm cardItems ">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img src="../src/img/truck.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Van Vendor
                                            </h4>
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
