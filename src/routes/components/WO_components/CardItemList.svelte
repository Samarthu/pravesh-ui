<script>
    export let countForCardItems;
    export let i;
    ///console.log(i);
    import {popup_cnt} from "../../../stores/popups_cnt";
    import {img_url_name} from "../../../stores/flags_store";
    
    console.log($popup_cnt);
    const removeItems = (idx) => {
      $popup_cnt = [...$popup_cnt.slice(0,idx) , ...$popup_cnt.slice(idx + 1)];
      countForCardItems -= 1;
      console.log($popup_cnt);
  }
  const DeriveAmt = () => {
     let m1 = $popup_cnt[i].count >= 1 ?  $popup_cnt[i].count : 1;
     let m2 = $popup_cnt[i].rate_per_item >=1 ? $popup_cnt[i].rate_per_item : 1;
     $popup_cnt[i].amount = m1 * m2;
  }

</script>

<div class="cardItemsList" >
<div class="cardItem border grid grid-cols-10 gap-6 items-center py-pr14px px-5 rounded-lg xsl:grid-cols-1 mb-3">
    <div class="flex col-span-3">
        <div class="formGroupBulkemp ">
            <label class="formLableBulkemp ">Count</label>
            <div class="formInnerGroup ">
                <input class="inputboxpopover" type="text" on:change={()=>DeriveAmt()} bind:value={$popup_cnt[i].count}>
            </div>
        </div>
    </div>
    <div class="flex col-span-3">
        <div class="formGroupBulkemp ">
            <label class="formLableBulkemp ">Rate/Unit</label>
            <div class="formInnerGroup ">
                <input class="inputboxpopover" type="text" on:change={()=>DeriveAmt()} bind:value={$popup_cnt[i].rate_per_item}>
            </div>
        </div>
    </div>
    <div class="flex col-span-3">
        <div class="formGroupBulkemp ">
            <label class="formLableBulkemp ">Amount</label>
           
            <div class="formInnerGroup ">
                <span class="searchicon">
                Rs.   
                </span>
                <input class="inputbox" type="text" disabled bind:value={$popup_cnt[i].amount}>
            </div>
        </div>
    </div>
    <div class="">
        <button class="closebuttonsection" on:click={()=>removeItems(i)}> <img src="{$img_url_name.img_name}/close.png"
            class="closesup" alt=""></button>
    </div>
    
</div>
</div>

