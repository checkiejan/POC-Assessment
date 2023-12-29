const processRepsonse =  (data)=>{
    let result = "";
    try{
        let temp = data.replace("json", "");
        temp = temp.replaceAll("```","");
        let json_object = JSON.parse(temp);
        for (const key in json_object) {
            // Check if the property is a string
            if (typeof json_object[key] === 'string') {
                result += json_object[key] + "\n\n";  // Append the string value and a newline
            }
        }
        // result = `${json_object["improvement_description"]}\n\n${json_object["specific_instruction_to_student"]} \n\n${json_object["task_to_do"]}\n\n${json_object["student_revise_essay"]}`;
    }
    catch{

        result= data;
    }
    return result
}
export default processRepsonse;