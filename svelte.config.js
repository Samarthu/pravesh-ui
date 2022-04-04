/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';

const config = {
	// kit: {
	// 	// hydrate the <div id="svelte"> element in src/app.html
		
	// 	vite: {
	// 		ssr: {
	// 		  noExternal: [ 'dayjs' ]
	// 		}
	// 	  }
	// }

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
