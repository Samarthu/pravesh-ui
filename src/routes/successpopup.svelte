<script>

    import { goto } from "$app/navigation";

    let routeNext = "";

    function routeToOnboardsummary() {
        let replaceState = false;
        goto(routeNext, { replaceState });
    }

    routeNext = "onboardsummary";
</script>

<!-- <div on:click={routeToOnboardsummary} class="relative">
    <div class="h-screen w-full z-10 inset-0 overflow-y-auto">
        <div class="absolute w-full h-full inset-0 bg-gray-500 opacity-75">
        </div>
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
           
            <div class=" relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div>
                    <div class="rounded-lg p-8 bg-white shadow px-12 xs:px-6">
                        <div class="bg-white dark:bg-gray-800 ">
                            <div class=" z-20">
                                
                                    <img src="../src/img/checked.png"  class="m-auto w-16 mb-6" alt="">
                            
                                <h2 class="text-green">
                                    Onboarding Successfully Completed
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->


<div on:click={routeToOnboardsummary}>
    <div class="modalWrappersuccess"
        id="modal-id">
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class="modalsuccessbody ">
            <div class="">
                <div class="mainbodyModal">

                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none"
                        class="w-16 h-16 flex items-center text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M39 0C17.4962 0 0 17.4962 0 39C0 60.5038 17.4962 78 39 78C60.5038 78 78 60.5038 78 39C78 17.4962 60.5038 0 39 0ZM60.797 28.7368L35.8722 53.4662C34.406 54.9323 32.0602 55.0301 30.4962 53.5639L17.3008 41.5414C15.7368 40.0752 15.6391 37.6316 17.0075 36.0677C18.4737 34.5038 20.9173 34.406 22.4812 35.8722L32.9398 45.4511L55.2256 23.1654C56.7895 21.6015 59.2331 21.6015 60.797 23.1654C62.3609 24.7293 62.3609 27.1729 60.797 28.7368Z"
                            fill="#6AC259" />
                    </svg>

                    <h2 class="successTextgreen ">Onboarding Successfully Completed</h2>
                        <!-- <p class="successDes">Now Intiate for background verification</p> -->
                </div>

            </div>
        </div>
    </div>
</div>