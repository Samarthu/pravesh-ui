<script>
    import { goto } from "$app/navigation";
    import Breadcrumb from "./breadcrumb.svelte";

    let routePrev = "";
    let routeNDA = "";
    let routeHouse = "";
    let routeStationStaff = "";
    let routeTeamLead = "";
    let routeLandLords = "";

    function routeToPage() {
        let replaceState = false;
        goto(routePrev, { replaceState });
    }

    function routeToNDA() {
        let replaceState = false;
        goto(routeNDA, { replaceState });
    }

    function routeToHouse() {
        let replaceState = false;
        goto(routeHouse, { replaceState });
    }

    function routeToStaff() {
        let replaceState = false;
        goto(routeStationStaff, { replaceState });
    }

    function routeToTeamLead() {
        let replaceState = false;
        goto(routeTeamLead, { replaceState });
    }

    function routeToLandLords() {
        let replaceState = false;
        goto(routeLandLords, { replaceState });
    }

    routePrev = "catagory";
    routeNDA = "nda";
    routeHouse = "housekeeping";
    routeStationStaff = "stationstaff";
    routeTeamLead = "teamlead";
    routeLandLords = "landlords";
</script>

<!-- Workforce    -->
<div class="mainContent ">
    <div class="breadcrumb">
        <div class="breadcrumb-section">
            <p class="breadcrumbtext">
                <span class="text-textgrey pr-1 text-base"
                    >Home / Onboard New /
                </span> <span class="text-base"> Workforce</span>
            </p>
        </div>
    </div>
    <div class="contentsection">
        <div class="innersection ">
            <h4 class="headingText">Workforce</h4>
            <p class="descriptionText">
                Select a workforce type to continue onboarding
            </p>

            <div class="cardsectio">
                <div class="cardWrapper ">
                    <div on:click={routeToNDA} class="bg-bgEcomm cardItems ">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img src="../src/img/nda.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                NDA/DA/HDA
                                            </h4>
                                            <p class="cardDescription">
                                                Associates who makes shipment
                                                delivery
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div on:click={routeToHouse} class="bg-velocity cardItems">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img
                                        src="../src/img/HouseKeeping.png"
                                        alt=""
                                    />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                House Keeping /<br /> Security
                                            </h4>
                                            <p class="cardDescription">
                                                In house maintenance staff
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div on:click={routeToStaff} class="bg-bgEcomm cardItems">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage ">
                                    <img
                                        src="../src/img/stationstaff.png"
                                        alt=""
                                    />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Station staff /<br /> Process Associate
                                            </h4>
                                            <p class="cardDescription">
                                                Associates managing systems and
                                                processes
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div on:click={routeToTeamLead} class="bg-credit cardItems">
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img src="../src/img/teamlead.png" alt="" />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Team lead /<br /> Station Manager
                                            </h4>
                                            <p class="cardDescription">
                                                OLeading the station/inhouse
                                                team
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div
                        on:click={routeToLandLords}
                        class="bg-withRun  cardItems"
                    >
                        <a href="">
                            <div class="cardContainer">
                                <div class="cardImage">
                                    <img
                                        src="../src/img/landloard.png"
                                        alt=""
                                    />
                                </div>
                                <div class="cardContent">
                                    <div class="cardText">
                                        <div class="businessContent">
                                            <h4 class="cardHeading">
                                                Landlords
                                            </h4>
                                            <p class="cardDescription">
                                                Real estate owners of the
                                                Warehouse/Station
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
