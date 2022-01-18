<script>
    import Main from "./main.svelte";

    import { goto } from "$app/navigation";

    let routeOnboard = "";
    let routeDashboard = "";
    let routeSupplier = "";
    let routeDownloads = "";
    let routeSupport = "";

    export let url = "";

    function routeToPageOnboard() {
        let replaceState = false;
        goto(routeOnboard, { replaceState });
    }

    function routeToPageDashboard() {
        let replaceState = false;
        goto(routeDashboard, { replaceState });
    }

    function routeToPageSupplier() {
        let replaceState = false;
        goto(routeSupplier, { replaceState });
    }

    function routeToPageDownloads() {
        let replaceState = false;
        goto(routeDownloads, { replaceState });
    }

    function routeToPageSupport() {
        let replaceState = false;
        goto(routeSupport, { replaceState });
    }

    routeOnboard = "bussines"; 
    routeDashboard = "dashboard";
    routeSupplier = "supplier";   
    routeDownloads = "downloads"; 
    routeSupport = "support"; 
</script>

<div class="w-full flex">
    <div class="sidenav xshidden" id="mobilemenu">
        <ul class="menuList mt-mt19px">
            <li class="listItem hidden xs:block">
                <a on:click={routeToPageDashboard} href="javascript:void(0)">
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M3.92859 8.64282L11 3.14282L18.0714 8.64282V17.2857C18.0714 17.7024 17.9059 18.1021 17.6112 18.3968C17.3165 18.6915 16.9168 18.8571 16.5 18.8571H5.50002C5.08325 18.8571 4.68355 18.6915 4.38885 18.3968C4.09415 18.1021 3.92859 17.7024 3.92859 17.2857V8.64282Z"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.64282 18.8571V11H13.3571V18.8571"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span  class="menuname">Home</span>
                </a>
            </li>
            <li on:click={routeToPageOnboard}  class="listItem">
                <a href="javascript:void(0)" >
                    <!-- class="active" -->
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M14.1429 18.0715V16.5C14.1429 15.6665 13.8117 14.8671 13.2223 14.2777C12.6329 13.6883 11.8335 13.3572 11 13.3572H5.5C4.66647 13.3572 3.86707 13.6883 3.27767 14.2777C2.68827 14.8671 2.35715 15.6665 2.35715 16.5V18.0715"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.25 10.2143C9.98576 10.2143 11.3929 8.8072 11.3929 7.07145C11.3929 5.33569 9.98576 3.92859 8.25 3.92859C6.51425 3.92859 5.10715 5.33569 5.10715 7.07145C5.10715 8.8072 6.51425 10.2143 8.25 10.2143Z"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M17.2857 7.85718V12.5715"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M19.6428 10.2142H14.9286"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="menuname">Onboard New</span>
                </a>
            </li>
            <li on:click={routeToPageSupplier} class="listItem">
                <a class="" href="javascript:void(0)">
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M14.9286 18.0714V16.5C14.9286 15.6664 14.5975 14.867 14.0081 14.2776C13.4187 13.6882 12.6193 13.3571 11.7857 13.3571H5.5C4.66647 13.3571 3.86707 13.6882 3.27767 14.2776C2.68827 14.867 2.35715 15.6664 2.35715 16.5V18.0714"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.64286 10.2143C10.3786 10.2143 11.7857 8.8072 11.7857 7.07145C11.7857 5.33569 10.3786 3.92859 8.64286 3.92859C6.9071 3.92859 5.5 5.33569 5.5 7.07145C5.5 8.8072 6.9071 10.2143 8.64286 10.2143Z"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M19.6428 18.0714V16.5C19.6423 15.8036 19.4106 15.1272 18.9839 14.5768C18.5573 14.0265 17.96 13.6334 17.2857 13.4593"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M14.1429 4.0307C14.8189 4.20379 15.4181 4.59697 15.846 5.14823C16.2739 5.69949 16.5062 6.3775 16.5062 7.07534C16.5062 7.77319 16.2739 8.45119 15.846 9.00246C15.4181 9.55372 14.8189 9.94689 14.1429 10.12"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="menuname">Suppliers</span>
                </a>
            </li>
            <li class="listItem">
                <a class="" href="javascript:void(0)">
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M18.2365 14.0564C17.7366 15.2385 16.9548 16.2802 15.9594 17.0903C14.9639 17.9004 13.7852 18.4544 12.5262 18.7037C11.2673 18.9531 9.96637 18.8902 8.7373 18.5207C7.50822 18.1511 6.38839 17.4861 5.4757 16.5838C4.56301 15.6815 3.88525 14.5693 3.50168 13.3445C3.11811 12.1197 3.04041 10.8197 3.27536 9.55791C3.51032 8.29617 4.05078 7.11119 4.8495 6.10658C5.64822 5.10196 6.68087 4.3083 7.85718 3.79498"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M18.8571 11C18.8571 9.96821 18.6539 8.9465 18.2591 7.99323C17.8642 7.03995 17.2854 6.17379 16.5558 5.44419C15.8262 4.71458 14.9601 4.13583 14.0068 3.74097C13.0535 3.34611 12.0318 3.14288 11 3.14288V11H18.8571Z"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="menuname">Reports</span>
                </a>
            </li>

            <li class="listItem">
                <a class="" href="javascript:void(0)">
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M10.9997 18.8572C15.3391 18.8572 18.8569 15.3394 18.8569 11C18.8569 6.66065 15.3391 3.14288 10.9997 3.14288C6.66034 3.14288 3.14258 6.66065 3.14258 11C3.14258 15.3394 6.66034 18.8572 10.9997 18.8572Z"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M18.8567 11H15.7139"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6.28544 11H3.14258"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M11 6.28574V3.14288"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M11 18.8572V15.7143"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="menuname">Attendance Tracker</span>
                </a>
            </li>
            <li class="listItem">
                <a class="" href="javascript:void(0)">
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M12.571 3.14288H6.2853C5.86853 3.14288 5.46883 3.30844 5.17413 3.60314C4.87943 3.89784 4.71387 4.29754 4.71387 4.71431V17.2857C4.71387 17.7025 4.87943 18.1022 5.17413 18.3969C5.46883 18.6916 5.86853 18.8572 6.2853 18.8572H15.7139C16.1306 18.8572 16.5303 18.6916 16.825 18.3969C17.1197 18.1022 17.2853 17.7025 17.2853 17.2857V7.85717L12.571 3.14288Z"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12.5713 3.14288V7.85717H17.2856"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M14.1431 11.7857H7.85742"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M14.1431 14.9286H7.85742"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M9.42885 8.64288H8.64314H7.85742"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="menuname">Work Order</span>
                </a>
            </li>
            <li on:click={routeToPageDownloads} class="listItem">
                <a class="" href="javascript:void(0)">
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M17.2861 9.14282V15.4285C17.2861 15.8453 17.1206 16.245 16.8259 16.5397C16.5312 16.8344 16.1315 17 15.7147 17L6.28613 17C5.86937 17 5.46967 16.8344 5.17497 16.5397C4.88027 16.245 4.71471 15.8453 4.71471 15.4285L4.71471 9.14282"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M14.1431 8.71426L11.0003 11.8571L7.85742 8.71426"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M11 11.8571V1.64283"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="menuname">Downloads</span>
                </a>
            </li>
            <li on:click={routeToPageSupport} class="listItem">
                <a class="" href="javascript:void(0)">
                    <svg
                        class="svgIcon"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                            d="M10.9997 18.8572C15.3391 18.8572 18.8569 15.3394 18.8569 11C18.8569 6.66065 15.3391 3.14288 10.9997 3.14288C6.66034 3.14288 3.14258 6.66065 3.14258 11C3.14258 15.3394 6.66034 18.8572 10.9997 18.8572Z"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.71387 8.64288C8.89859 8.11776 9.2632 7.67496 9.74312 7.39291C10.223 7.11086 10.7873 7.00776 11.3359 7.10187C11.8846 7.19597 12.3822 7.48122 12.7407 7.90708C13.0992 8.33294 13.2954 8.87193 13.2946 9.42859C13.2946 11 10.9374 11.7857 10.9374 11.7857"
                            stroke="#F2F2F2"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <mask id="path-3-inside-1_1083:4632" fill="white">
                            <ellipse
                                cx="10.9996"
                                cy="14.9286"
                                rx="0.785714"
                                ry="0.785715"
                            />
                        </mask>
                        <path
                            d="M10.7853 14.9286C10.7853 14.8103 10.8812 14.7143 10.9996 14.7143V16.7143C11.9858 16.7143 12.7853 15.9148 12.7853 14.9286H10.7853ZM10.9996 14.7143C11.1179 14.7143 11.2139 14.8103 11.2139 14.9286H9.21387C9.21387 15.9148 10.0134 16.7143 10.9996 16.7143V14.7143ZM11.2139 14.9286C11.2139 15.0469 11.1179 15.1429 10.9996 15.1429V13.1429C10.0134 13.1429 9.21387 13.9424 9.21387 14.9286H11.2139ZM10.9996 15.1429C10.8812 15.1429 10.7853 15.0469 10.7853 14.9286H12.7853C12.7853 13.9424 11.9858 13.1429 10.9996 13.1429V15.1429Z"
                            fill="#F2F2F2"
                            mask="url(#path-3-inside-1_1083:4632)"
                        />
                    </svg>
                    <span class="menuname">Support</span>
                </a>
            </li>
        </ul>
    </div>
    <!-- <Main /> -->
</div>
