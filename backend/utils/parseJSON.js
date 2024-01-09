const parseJSON =  (data)=>{
    
    let temp = data.replace("json", "");
    temp = temp.replaceAll("```","");
    let json_object = JSON.parse(temp);
    return json_object;
}
module.exports = parseJSON;