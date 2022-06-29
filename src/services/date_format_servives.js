const get_date_format = (date,format) =>{
    if(typeof(date)!= "object"){
        return "please provide a valid date";
    }
    else{
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const half_months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        
        // console.log("date",date);
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let name = months[month-1];
        let half_name = half_months[month-1];

        console.log("11 name",name)
        // console.log("type of month",typeof(month));
        if(month < 10){
            month = "0"+String(month);
        }

        if(day < 10){
            day = "0"+String(day);
        }
        
        if(format == 'dd-mm-yyyy'){
            return String(day+"-"+month+"-"+year);

        }
        else if(format == 'dd/mm/yyyy'){
            return String(day+"/"+month+"/"+year);
        }
        else if(format == 'yyyy-mm-dd'){
            return String(year+"-"+month+"-"+day);

        }
        else if(format == 'mm-dd-yyyy'){
            return String(month+"-"+day+"-"+year);

        }
        else if(format == 'MMMM/YYYY'){
            // const d = new Date();
            return String(name+"_"+year);

        }
        else if(format == 'DD/MM/YYYY'){
            // const d = new Date();
            return String(day+"-"+half_name+"-"+year);

        }
        // 09-Jun-2022
        else if(format == 'dd-mm-yyyy-hh-mm'){
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am'; 
            hours = hours % 12; 
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return String(day+"-"+month+"-"+year+ " "+hours+":"+minutes +" "+ ampm);

        }
        
        else{
            return "please provide a valid date format";
        }
    }


    
}
export{
    get_date_format
}