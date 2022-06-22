<script>
    import { goto } from "$app/navigation";
    import {img_url_name} from '../stores/flags_store';
    import {reset_all_stores} from '../services/pravesh_config';

    let routeProfile = "";
    let routeDashboard = "";

    function routeToProfile() {
        let replaceState = false;
        goto(routeProfile, { replaceState });
    }

    function routeToPageDashboard() {
        let a = reset_all_stores();
        if(a){
            let replaceState = false;
        goto(routeDashboard, { replaceState });

        }
       
    }

    routeProfile = "profile";
    routeDashboard = "dashboard"; 
</script>

<nav class="navbarTop">
    <div class="top-left">
        <div class="flex items-center">
            <div on:click={routeToPageDashboard} class="homelogo" id="mobileBar">
                <a href="#">
                    <img
                        src="{$img_url_name.img_name}/home.png"
                        class="xs:hidden sm:hidden block"
                        alt="homelogolg"
                    /></a
                >
                <a
                    href="#"
                    id="showMenu"
                    onclick="myFunction()"
                    class="hidden xs:block sm:block"
                >
                    <img src=" {$img_url_name.img_name}/bar.png" alt="barsm" /></a
                >
            </div>
            <div class="pravesh-logo ml-3 cursor-pointer" on:click={routeToPageDashboard}>
                <img
                    src="{$img_url_name.img_name}/pravesh-logo.png"
                    class="xs:hidden sm:hidden block"
                    alt=""
                />
                <img
                    src="{$img_url_name.img_name}/mobile.png"
                    class="hidden xs:block sm:block"
                    alt=""
                />
            </div>
        </div>
    </div>
    <div class="top-right ml-auto">
        <ul class="flex items-center mr-4">
            <!-- <li class="xs:hidden md:block">
                <div class="flex items-center mr-4">
                    <div class="relative mx-4 lg:mx-0">
                        <span class="searchicon">
                            <svg
                                class="w-5 h-5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </span>
                        <input
                            class="searchbox"
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                </div>
            </li> -->
            <li on:click={routeToProfile} class="">
                <span href=""> <img src="{$img_url_name.img_name}/Userpic.png" alt="" /></span>
            </li>
        </ul>
    </div>
</nav>
