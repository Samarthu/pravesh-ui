<script>
    export  let type;
     let duration=10;
     let flag = false;
    export let text;
    import { fade, fly } from 'svelte/transition';
    import { flip } from "svelte/animate";

    $:{
        // type=type,
        
        // text=text
        // console.log("type",type);
        
        // console.log("text",text);
        // type=type
        // countdown = 10;
        // flag = true;
        // duration = 10;
        // if(flag){
        //     start_countdown();
        //     duration = 10;
        // }
        

        // if(type){
        //     console.log("type in reactive",type);
        // }
        // start_countdown();
    }

    function close_click(){
        type = "nothing";
        text = null;
        console.log("after toast click, type:",type," text:",text);
        setTimeout(console.log(" timeout after toast click, type:",type," text:",text),3000)
    }
    let countdown = 10;
  let timer;
  $: {
    if (duration === 0) {
      if (timer) {
        clearInterval(timer);
        // resend_flag = true;
        // type = null;
        // text = null;
        // timer = null;
        // duration = null;
        console.log("inside reactive");
      }
    }
  }
  
    function start_countdown(){
		 timer = setInterval(() => {
            duration -= 1;
    }, 1000);
    // console.log("hiiiiiiii");
  }
  
 
</script>

<div >

    {#if type == "success"}

    <div id="toast-success" class="toast-success-msg" role="alert" >
        <div class="toast-icons-wrapper">
            <svg class="svgsuccess" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        </div>
        <div class="toastSuccessText">{text}</div>
        <button type="button" class="toastCloseButton" data-dismiss-target="#toast-success" aria-label="Close" on:click={()=>close_click()}>
            <span class="sr-only">Close</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>

    {:else if type == "error"}
    
    
    <div id="toast-danger" class="toast-danger-msg" role="alert">
        <div class="toast-icons-wrapper">
            <svg class="svgDanger" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </div>
        <div class="toastDangerText">{text}</div>
        <button type="button" class="toastCloseButton" data-dismiss-target="#toast-success" aria-label="Close" on:click={()=>close_click()}>
            <span class="sr-only">Close</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>

    {:else if type == "warning"}
    
    
    <div id="toast-warning" class="toast-warning-msg " role="alert">
        <div class="toast-icons-wrapper">
            <svg class="svgWarning" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
              </svg>
        </div>
        <div class="toastWarningText">{text}</div>
        <button type="button" class="toastCloseButton" data-dismiss-target="#toast-success" aria-label="Close" on:click={()=>close_click()}>
            <span class="sr-only">Close</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>

    {/if}
    
    
   
    
   

</div>
<!-- <div transition:fade >
    "++++++++++++++++++++++"
</div> -->
 <!-- <div id="actionModalDialogue" tabindex="-1" class="actionDialogue">
        <div class="actionDialogueWrapper">
            <div class="actionDialogueModalContent">
                <div class="actionDialogueModalBody">
                    <svg class="actionDialogueSvg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 class="actionDialogueText">Are you sure you want to proceed without saving?
                    </h3>
                    <div class="pt-3">
                    <button data-modal-toggle="popup-modal" type="button" class="dialogueNobutton   ">No</button>
                    <button data-modal-toggle="popup-modal" type="button" class="dialogueYesbutton ">
                        Yes
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

 <!-- <div id="onboardingCompleted" tabindex="-1" class="actionDialogueOnboard">
        <div class="actionDialogueOnboardWrapper">
            <div class="OnboardDialogueModalContent text-center">
                <div class="text-center">
                    <img src="../src/img/checkedonboard.png" class="w-w35px mx-auto mb-5" alt="">
                    <h3 class="text-green text-lg font-medium">Onboarding Completed Successfully</h3>
                </div>
            </div>
        </div>
    </div> -->

<style>

   
</style>