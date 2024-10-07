
const changeTypeToDisplayName = (type: "DR" | "WA" | "SW" | "PB"): string => {
    let changedName = "";
    switch (type) {
        case "DR":
            changedName = "乾燥機";
            break;
        case "WA":
            changedName = "洗濯機";
            break;
        case "SW":
            changedName = "シャワー室";
            break;
        case "PB":
            changedName = "大浴場";
            break;
        default:
            break;
    }
    return changedName;
}


const utill = {
    changeTypeToDisplayName
};

export default utill;
