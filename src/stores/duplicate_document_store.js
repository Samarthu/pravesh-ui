import { writable,derived } from 'svelte/store';
export const duplicate_documents_store = writable({
    documents:[]
});