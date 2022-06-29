<script>
    import { goto } from "$app/navigation";

    let routeNotOnboardedReports = "";
    let bgvdatareports = "";
    let bulkmap = "";

    function routeToPageNotOnboarded() {
        let replaceState = false;
        goto(routeNotOnboardedReports, { replaceState });
    }

    function routeToBgvData() {
        let replaceState = false;
        goto(bgvdatareports, { replaceState });
    }

    function routeToBulk() {
        let replaceState = false;
        goto(bulkmap, { replaceState });
    }

    bulkmap = "bulkmap";
    bgvdatareports = "bgvdatareport";
    routeNotOnboardedReports = "notonboardedreport";
</script>

<div class="mainContent ">
    <div class="breadcrumb breadcrumbtext">
        <div class="breadcrumb-section px-3">
            <p class=" border-none">
                <span class="text-3xl xs:text-2xl"> Reports</span>
            </p>
            <p class="cardDes leading-8">Select one to get report</p>
        </div>
    </div>

    <div class="px-5 grid grid-cols-4 gap-9 mt-8 xsl:grid-cols-1 xsl:gap-6">
        <div class="reportCard bg-white rounded-lg">
            <h3>Associates Not onboarded </h3>
            <p>Get report of facilities who have worked but have name mismatch issues</p>
            <div class="text-right">
                <button class="ErBlueButton" on:click="{routeToPageNotOnboarded}">Get Data</button>
            </div>
        </div>
        <div class="reportCard bg-white rounded-lg">
            <h3>Bulk Employee Mapping</h3>
            <p>Bulk Upload File for Employee ID Mapping</p>
            <div class="text-right">
                <button class="ErBlueButton" on:click="{routeToBulk}">Get Data</button>
            </div>
        </div>
        <div class="reportCard bg-white rounded-lg">
            <h3>BGV Data </h3>
            <p>Get background verification data report of all associates</p>
            <div class="text-right">
                <button class="ErBlueButton" on:click="{routeToBgvData}">Get Data</button>
            </div>
        </div>
      


    </div>

</div>