import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        browser: {
            hydrate: true,
            router: true
          },      
        paths: {
            assets: '',
            base: '/pravesh-ui'
        },
        adapter: adapter({
            // default options are shown
            // pages: '/roster-management',
            // assets: '/roster-management',
            fallback: "index.html",
            // precompress: false

        })
        //,

        // adapter:adapter({
        //  fallback: "/home/akshay/new-sample/build/_app/pages/about.svelte-be298a1a.js"
        // })

    }


};

export default config;
