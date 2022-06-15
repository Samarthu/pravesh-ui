import { writable, derived } from 'svelte/store';

export const vercticle_name = writable({
    verticle: null

});

export const get_organization_link = derived(vercticle_name,
    $vercticle_name => '/api/resource/Organization?fields=["*"]&filters=[["domain","=","'+$vercticle_name.verticle+'"]]&limit_page_length=*');