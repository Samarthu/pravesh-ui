const get_date_format = (date,format) =>{
    if(typeof(date)!= "object"){
        return "please provide a valid date";
    }
    else{
        console.log("date",date);
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        if(format == 'dd-mm-yyyy'){
            return String(day+"-"+month+"-"+year);

        }
        else if(format == 'yyyy-mm-dd'){
            return String(year+"-"+month+"-"+day);

        }
        else if(format == 'mm-dd-yyyy'){
            return String(month+"-"+day+"-"+year);


        }
        else{
            return "please provide a valid date format";
        }
    }


    
}
export{
    get_date_format
}