// import { uuidv4 } from "../utils";
// import { get } from "svelte/store";
// import { ToastConstants } from '../constants';
// import { ToastStore, UserStore } from "../stores";
// import {restext} from "../stores/restext"
// // import erjs from '@pwa-hub/erjs';

// const isOnline = () => {};

// export const authHeader = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user && user.token) {
//     return { Authorization: `Token ${user.user.token}` };
//   }
//   return {};
// };

// export const handleResponse = async (response) => {
//     return response.text().then((text) => {
//       if (!response.ok) {
//         // erjs.loadSpinner.show();
//         if (response.status === 401 || response.status === 403) {
//           try {
//             UserStore.logout.set(true);
//             alert('Redirect User to /login');
//           } catch (err) {
//             return ToastStore.set([
//               ...get(ToastStore),
//               {
//                 id: uuidv4(),
//                 title: ToastConstants.error.title,
//                 type: ToastConstants.error.type,
//                 message: "Error Logging Out",
//               },
//             ]);
//           }
//         }
//         if (response.status === 409) {
//           // Conflict Error
//           return response;
//         }
//         if (response.status === 500) {
//           // console.log("--------------------kjdbfv reugwqveugwqveug v------>",text)
//           // return ToastStore.set([
//           //   ...get(ToastStore),
//           //   {
//           //     id: uuidv4(),
//           //     title: ToastConstants.error.title,
//           //     type: ToastConstants.error.type,
//           //     message: text,
//           //   },
//           // ]);
//           // let a=text.toString()
//           // let pos1=a.indexOf("Traceback")
//           // let pos2=a.indexOf("</pre>")
//           // alert(a.slice(pos1,pos2))
//           // return restext.set({
//           //   text:text
//           // })
          
//         }

//         if (response.status === 503 || response.status === 504) {
//           ToastStore.set([
//             ...get(ToastStore),
//             {
//               id: uuidv4(),
//               title: ToastConstants.error.title,
//               type: ToastConstants.error.type,
//               message: "Service Temporarily Unavailable",
//             },
//           ]);
//           isOnline();
//         }
//         // const error = new Error("Something went wrong");
//         return response;
//       }
//       let data = { message: "" };
//       try {
//           data = text && JSON.parse(text);
//           // erjs.loadSpinner.hide();
//       } catch (e) {
//           // erjs.loadSpinner.hide();
//       }
//       return data;
//     });
//   };

// export function request(
//     url,
//     options= {},
//     isFullUrlPresent = false,
//     syncOfflineFirst = false,
//     type= ""
//   ) {
    
//     // erjs.loadSpinner.show();
//     let queryString = "";
//     let { body, method } = options;
//     console.log("Body is---->",body);
//     console.log("Method is--->",method)
//     options = {
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",

//       },
//       mode: "cors",
//       ...options,
//     };
  
//     let endpoint = isFullUrlPresent ? url : `/api/method/${url}`;
  
//     // if (!method || method === "GET") {
//     //   if (body && typeof body === "object") {
//     //     let parts = Object.keys(body).map((current) => {
//     //       return `${current}=${body[current]}`;
//     //     });
//     //     queryString = `?${parts.join("&")}`;
//     //   } else {
//     //     queryString = "";
//     //   }
//     //   delete options.body;
//     // }
  
//     if (options.body && typeof options.body === "object") {
//       options.body = JSON.stringify(options.body);
//     }
  
//     // if ((method === "POST" || method === "PUT") && syncOfflineFirst) {
//     //   // erjs.loadSpinner.hide();
//     //   // TODO - Handle Offline DB Sync
//     //   console.log("Inside check condition")
//     // }
//     console.log("Options are: ---->",options)
//     // console.log(queryString,"->querystring")
//     // console.log(`${endpoint}${queryString || ""}`,"->fullstring")
//     return fetch(`${endpoint}${queryString || ""}`, options).then(
//       handleResponse
//     );
//   }

// import { uuidv4 } from "../utils";
// import { get } from "svelte/store";
// import { ToastConstants } from '../constants';
// import { ToastStore, UserStore } from "../stores";
// import {restext} from "../stores/restext"
// // import erjs from '@pwa-hub/erjs';

// const isOnline = () => {};

// export const authHeader = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user && user.token) {
//     return { Authorization: `Token ${user.user.token}` };
//   }
//   return {};
// };

// export const handleResponse = async (response) => {
//     return response.text().then((text) => {
//       if (!response.ok) {
//         // erjs.loadSpinner.show();
//         if (response.status === 401 || response.status === 403) {
//           try {
//             UserStore.logout.set(true);
//             alert('Redirect User to /login');
//           } catch (err) {
//             return ToastStore.set([
//               ...get(ToastStore),
//               {
//                 id: uuidv4(),
//                 title: ToastConstants.error.title,
//                 type: ToastConstants.error.type,
//                 message: "Error Logging Out",
//               },
//             ]);
//           }
//         }
//         if (response.status === 409) {
//           // Conflict Error
//           return response;
//         }
//         if (response.status === 500) {
//           // console.log("--------------------kjdbfv reugwqveugwqveug v------>",text)
//           // return ToastStore.set([
//           //   ...get(ToastStore),
//           //   {
//           //     id: uuidv4(),
//           //     title: ToastConstants.error.title,
//           //     type: ToastConstants.error.type,
//           //     message: text,
//           //   },
//           // ]);
//           // let a=text.toString()
//           // let pos1=a.indexOf("Traceback")
//           // let pos2=a.indexOf("</pre>")
//           // alert(a.slice(pos1,pos2))
//           // return restext.set({
//           //   text:text
//           // })
          
//         }

//         if (response.status === 503 || response.status === 504) {
//           ToastStore.set([
//             ...get(ToastStore),
//             {
//               id: uuidv4(),
//               title: ToastConstants.error.title,
//               type: ToastConstants.error.type,
//               message: "Service Temporarily Unavailable",
//             },
//           ]);
//           isOnline();
//         }
//         // const error = new Error("Something went wrong");
//         return response;
//       }
//       let data = { message: "" };
//       try {
//           data = text && JSON.parse(text);
//           // erjs.loadSpinner.hide();
//       } catch (e) {
//           // erjs.loadSpinner.hide();
//       }
//       return data;
//     });
//   };
export const handleResponse = async (response) =>{
  // console.log( await response.text(),"response"  );
  console.log("response",response);
  if(response.status == 403){
    let domain_name = window.location.hostname;
    console.log('domain',domain_name);
    const res = await request('attendance.override_build_page_for_login_for_oauth?path=login&redirect-to=https://'+domain_name+'/pravesh-ui/&only_url=true',{
            // mode: 'no-cors'
         });
         console.log('res',res);

        //  let a = await res.json();
        //  console.log(window);
        // console.log('a',a);
        
        console.log('body',res.body);
        console.log('message',res.body.message);
        // console.log('url',window.location.hostname);
         window.location = res.body.message;

  }
  
  // let temp = await response.text();
  // console.log("temp",temp);
  
  // let temp = await response.text().then((text) => {
  //   console.log(text);
  // });
  // console.log("temp",temp);
  // response = response.text();
  
    let data = await response.json();
    return {
        body: data
    }

}

export function request(
    url,
    options= {},
    isFullUrlPresent = false,
    syncOfflineFirst = false,
    type= ""
  ) {
    
    // erjs.loadSpinner.show();
    let queryString = "";
    let { body, method } = options;
    console.log("Body is---->",body);
    console.log("Method is--->",method)
    console.log("options is------>",options);
    options = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        // "dataType" : 'json',
        "Contains-Array" : 'true',
        "responseType": 'blob'
      //   // "Accept": "application/json",
      //   "accept": "application/json"
        
      //   // "Access-Control-Allow-Origin": "https://elasticrun.in",
      //   // "Access-Control-Allow-Origin":" *"
        
      
       
      
      },
      
      
      ...options,
    };
  
    let endpoint = isFullUrlPresent ? url : `/api/method/${url}`;
  
    // if (!method || method === "GET") {
    //   if (body && typeof body === "object") {
    //     let parts = Object.keys(body).map((current) => {
    //       return `${current}=${body[current]}`;
    //     });
    //     queryString = `?${parts.join("&")}`;
    //   } else {
    //     queryString = "";
    //   }
    //   delete options.body;
    // }
  
    // if (options.body && typeof options.body === "object") {
    //   options.body = JSON.stringify(options.body);
    // }
  
    // if ((method === "POST" || method === "PUT") && syncOfflineFirst) {
    //   // erjs.loadSpinner.hide();
    //   // TODO - Handle Offline DB Sync
    //   console.log("Inside check condition")
    // }
    console.log("Options are: ---->",options)
    // console.log(queryString,"->querystring")
    // console.log(`${endpoint}${queryString || ""}`,"->fullstring")
    return fetch(`${endpoint}${queryString || ""}`, options).then(
      handleResponse
    );
  }