<script>
    import Toast from './components/toast.svelte';
    import Breadcrumb from "./breadcrumb.svelte";
    import Spinner from "./components/spinner.svelte";
    import { goto } from "$app/navigation";
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import {success_toast ,error_toast,warning_toast} from '../services/toast_theme';

    let show_spinner;
    let toast_type = null;
    let toast_text = null;

</script>
{#if show_spinner}
<Spinner />
    
{/if}

<!-- Business Verticle -->
<div class="mainContent ">
    <Breadcrumb />
    <div class="contentsection">
        <div class="innersection ">
            <h4 class="headingText mb-2">Onboard New Supplier </h4>
                        <div class="mb-5">
                            <div class="cardWrapper ">
                                <div class="bg-velocity flex items-center justify-center cardItems">
                                    <button on:click|preventDefault={()=> goto("bussines")}>
                                    
                                        <div class="py-12 xsl:py-6">
                                            <h4 class="cardHeading">Normal Supplier </h4>
                                        </div>
                                    
                                </button>
                                </div>
                                <div class="bg-withRun flex items-center justify-center cardItems">
                                    <button on:click|preventDefault={()=> goto("supplier_onboarding")}>
                                    
                                        <div class="py-12 xsl:py-6">
                                            <h4 class="cardHeading">Online /Offline Supplier </h4>
                                        </div>
                                    
                                </button>
                                </div>
                                
                                <!-- <div class="bg-bgEcomm flex items-center justify-center cardItems">
                                    <a href="">
                                        <div class="py-12 xsl:py-6">
                                            <h4 class="cardHeading">Offline Supplier </h4>
                                        </div>
                                    </a>
                                </div> -->

                            </div>
                        </div>
           
            
        </div>
        
    </div>
</div>

<Toast type={toast_type}  text={toast_text}/>
<SvelteToast />

