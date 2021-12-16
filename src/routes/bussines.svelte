<script>
    import { Router, Link, Route } from "svelte-routing";
    import Catagory from "./catagory.svelte";
    import { goto } from "$app/navigation";
    import Breadcrumb from "./breadcrumb.svelte";

    let routeNext = "";

    export let url = "";

    function routeToPage() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }

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
                    <nav>
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
                    </div>

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
            </div>
        </div>
    </div>
</div>
