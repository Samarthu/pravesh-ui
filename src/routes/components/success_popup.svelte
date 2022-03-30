
<script>
    export let text;
    let flag = false;
    let timer;
    let duration = 5;
    let show = false;
    $:{
        text = text;
        flag = true;
        show = true;
        if(flag){
            start_countdown();
            duration = 5;
        }
        
    }
    $: {
    if (duration === 0) {
      if (timer) {
          console.log("inside clearinterval");
        clearInterval(timer);
        // resend_flag = true;
        // type = null;
        // timer = null;
        duration = null;
        show = false;
        
        // console.log("inside reactive");
      }
    }
  }
    function start_countdown(){
		 timer = setInterval(() => {
            duration -= 1;
    }, 1000);
}

</script>
{#if show}
{#if text}
<div>
    <div id="onboardingCompleted" tabindex="-1" class="actionDialogueOnboard">
        <div class="actionDialogueOnboardWrapper">
            <div class="OnboardDialogueModalContent text-center">
                <div class="text-center">
                    <img src="../src/img/checkedonboard.png" class="w-w35px mx-auto mb-5" alt="">
                    <h3 class="text-green text-lg font-medium">{text}</h3>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}
{/if}