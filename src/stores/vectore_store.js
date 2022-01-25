import { writable, derived } from 'svelte/store';

export const vectore_name = writable({
    verticle: null

});

export const get_organization_link = derived(vectore_name,
    $vectore_name => '/api/resource/Organization?fields=["*"]&filters=[["domain","=","'+$vectore_name.verticle+'"]]');