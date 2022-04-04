<script>
    export  let type;
     let duration=10;
     let flag = false;
    export let text;
    import { fade, fly } from 'svelte/transition';
    import { flip } from "svelte/animate";

    $:{
        type=type,
        
        text=text
        console.log("type",type);
        
        console.log("text",text);
        // countdown = 10;
        flag = true;
        if(flag){
            start_countdown();
            duration = 10;
        }
        
        // start_countdown();
    }

    function close_click(){
        type = null;
        text = null;
    }
    let countdown = 10;
  let timer;
  $: {
    if (duration === 0) {
      if (timer) {
        clearInterval(timer);
        // resend_flag = true;
        type = null;
        timer = null;
        duration = null;
        // console.log("inside reactive");
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
            <svg class="svgDanger" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
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
            <svg class="svgWarning" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
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