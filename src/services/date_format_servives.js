const get_date_format = (date,format) =>{
    if(typeof(date)!= "object"){
        return "please provide a valid date";
    }
    else{
        // console.log("date",date);
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
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
        else if(format == 'yyyy-mm-dd'){
            return String(year+"-"+month+"-"+day);

        }
        else if(format == 'mm-dd-yyyy'){
            return String(month+"-"+day+"-"+year);


        }
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