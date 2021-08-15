let addBtnContainer=document.querySelector(".add-sheet_container");
let sheetList=document.querySelector(".sheets-list");
let firstSheet=document.querySelector(".sheet");
let allCells=document.querySelectorAll(".grid .col");
let addressBar=document.querySelector(".address-box");
let leftBtn=document.querySelector(".left");
let rightBtn=document.querySelector(".right");
let centerBtn=document.querySelector(".center");
let fontBtn=document.querySelector(".font-size");
let fontFamily=document.querySelector(".font-family");
let boldElement=document.querySelector(".bold");
let italicElement=document.querySelector(".italic");
let underlineElement=document.querySelector(".underline");
let formulaInput=document.querySelector(".formula-box");
let allAlignBtns=document.querySelectorAll(".allignment_container>*");
let gridContainer = document.querySelector(".grid_container");
let topLeftBlock = document.querySelector(".top-left-block");
let sheetDB = workSheetDB[0];


firstSheet.addEventListener("click",handleActiveSheet)
    

addBtnContainer.addEventListener("click",function(){
    let sheetsArr=document.querySelectorAll(".sheet");
    let lastSheetElem=sheetsArr[sheetsArr.length-1];
    let idx=lastSheetElem.getAttribute("sheetIdx");
    idx=Number(idx);
    let NewSheet=document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    NewSheet.setAttribute("sheetIdx",idx+1);
    NewSheet.innerText=`Sheet ${idx+1}`;
    sheetList.appendChild(NewSheet);
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active-sheet");
    })
    sheetsArr=document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length-1].classList.add("active-sheet");
    initCurrentSheetDB();
    
    sheetDB=workSheetDB[idx];
    initUI();
    
   
    NewSheet.addEventListener("click",handleActiveSheet);
})
function handleActiveSheet(e){
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
    //  index
    let sheetIdx = MySheet.getAttribute("sheetIdx");
    sheetDB = workSheetDB[sheetIdx - 1];
    // get data from that and set ui
    setUI(sheetDB);
}
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function handleCells(){
        let rid=Number(allCells[i].getAttribute("rid"));
        let cid=Number(allCells[i].getAttribute("cid"));
        let rowAdd=rid+1;
        let colAdd=String.fromCharCode(cid+65);
        let address=colAdd+rowAdd;
        addressBar.value=address;
        let cellObject=sheetDB[rid][cid];
        if(cellObject.bold==true){
            boldElement.classList.add("active-btn");
        }
        else{
            boldElement.classList.remove("active-btn");
        }
        if(cellObject.italic==true){
            italicElement.classList.add("active-btn");
        }
        else{
            italicElement.classList.remove("active-btn");
        }
        if(cellObject.underline==true){
            underlineElement.classList.add("active-btn");
        }
        else{
            underlineElement.classList.remove("active-btn");
        }
        /********handling the alignments ***********/
        for(let i=0;i<allAlignBtns.length;i++){
            allAlignBtns[i].classList.remove("active-btn");
        }
        if(cellObject.halign=="left"){
           leftBtn.classList.add("active-btn");
        }
        else if(cellObject.halign=="right"){
            rightBtn.classList.add("active-btn");
        }
        else if(cellObject.halign=="center"){
            centerBtn.classList.add("active-btn");
        }
    });
    allCells[i].addEventListener("keydown", function (e) {
        let obj = allCells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBar.value;
        let { rid, cid } = getRidCidFronAddress(address);
        let leftCol = document.querySelectorAll(".left-col .left-col_box")[rid];
        leftCol.style.height = height + "px";
    });
}
allCells[0].click();
leftBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";
    for(let i=0;i<allAlignBtns.length;i++){
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    let cellObject=sheetDB[rid][cid];
    cellObject.halign="left";
})
centerBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="center";
    for(let i=0;i<allAlignBtns.length;i++){
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    let cellObject=sheetDB[rid][cid];
    cellObject.halign="center";
})
rightBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="right";
    for(let i=0;i<allAlignBtns.length;i++){
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    let cellObject=sheetDB[rid][cid];
    cellObject.halign="right";
})
function getRidCidFronAddress(address){
    let cellColAdr=address.charCodeAt(0);
    let cellrowAdr=address.slice(1);
    let cid=cellColAdr-65;
    let rid=Number(cellrowAdr)-1;
    return {cid,rid};
}
fontBtn.addEventListener("change",function(){
    let fontSize=fontBtn.value;
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize=fontSize+"px";
})
fontFamily.addEventListener("change",function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cFont=fontFamily.value;
    cell.style.fontFamily=cFont;
})
boldElement.addEventListener("click",function(){
    let isActive=boldElement.classList.contains("active-btn");
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDB[rid][cid];
    
    if(isActive==false){
        cell.style.fontWeight="bold";
        boldElement.classList.add("active-btn");
        cellObject.bold=true;
    }
    else{
        cell.style.fontWeight="normal";
        boldElement.classList.remove("active-btn");
        cellObject.bold=false;
    }
})
italicElement.addEventListener("click",function(){
    let isActive=italicElement.classList.contains("active-btn");
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDB[rid][cid];
    if(isActive==false){
        cell.style.fontStyle="italic";
        italicElement.classList.add("active-btn");
        cellObject.italic=true;
    }
    else{
        cell.style.fontStyle="normal";
        italicElement.classList.remove("active-btn");
        cellObject.italic=false;
    }
})
underlineElement.addEventListener("click",function(){
    let isActive=underlineElement.classList.contains("active-btn");
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject=sheetDB[rid][cid];
    if(isActive==false){
        cell.style.textDecoration="underline";
        underlineElement.classList.add("active-btn");
        cellObject.underline=true;
    }
    else{
        cell.style.textDecoration="none";
        underlineElement.classList.remove("active-btn");
        cellObject.underline=false;
    }
})
function initUI(){
    for(let i=0;i<allCells.length;i++){
        allCells[i].style.fontWeight="normal";
         allCells[i].style.fontStyle="normal";
         allCells[i].style.textDecoration="none";
         allCells[i].style.fontSize="10px";
         allCells[i].style.textAlign="left";
         allCells[i].innerText="";
     }
}
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("blur",function handleCells(){
        
        
        let address=addressBar.value;
       let {rid,cid}=getRidCidFronAddress(address);
        let cellObject=sheetDB[rid][cid];
        let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        cellObject.value=cell.innerText;
    })
}
function setUI(sheetDB){
     for(let i=0;i<sheetDB.length;i++){
         for(let j=0;j<sheetDB[i].length;j++){
            let cell=document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let{bold,italic,underline,fontFamily,fontSize,halign,value}=sheetDB[i][j];
            cell.style.fontWeight=bold==true?"bold":"normal";
            cell.style.fontStyle=italic==true?"italic":"normal";
            cell.style.textDecoration=underline==true?"underline":"none";
            cell.innerText=value;

         }
     }
}

//***************formula container***************//
formulaInput.addEventListener("keydowm",function(e){
    if(e.key=="Enter"&& formulaInput.value!=""){
        let formula=formulaInput.value;
        let address = addressBar.value;
        // getCurrentCell
        let { rid, cid } = getRIdCIdfromAddress(address);
        // 2d
        let cellObject = sheetDB[rid][cid];
        let prevFormula = cellObject.formula;
        if (prevFormula == formula) {
            return;
        }
        // previoulsy formula is set so remove it  
        if (prevFormula != "" && prevFormula != formula) {
            removeFormula(cellObject, address);
        }
        //compute value of formula
        let value=evaluate(formula);
        setUIByFormula(value, rid, cid);
        setFormula(evaluatedValue, Newformula, rid, cid, address);
        changeChildrens(cellObject);
    }
})
function evaluate(formula) {
    let formulaTokens = formula.split(" ");
  
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            
            let { rid, cid } = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            let {value} = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }
    let ans = eval(formula);
    return ans;
}
function setUIByFormula(value, rid, cid) {
document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
}
function setFormula(value, formula, rid, cid, address) {
    let cellObject = sheetDB[rid][cid];
    cellObject.value = value;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
    // (A1 + A2)
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            cellObject.children.push(address)
        }
    }
}
function changeChildrens(cellObject) {
    let childrens = cellObject.children;
    for (let i = 0; i < childrens.length; i++) {
        let chAddress = childrens[i];
        let chRICIObj = getRIdCIdfromAddress(chAddress);
        let chObj = sheetDB[chRICIObj.rid][chRICIObj.cid];
        let formula = chObj.formula;
        let evaluatedValue = evaluate(formula);
        setUIByFormula(evaluatedValue, chRICIObj.rid, chRICIObj.cid);
        chObj.value = evaluatedValue;
        changeChildrens(chObj);
    }

}
function removeFormula(cellObject, address) {
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let parentCellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            
            let childrens = parentCellObject.children;
            let idx = childrens.indexOf(address);
            childrens.splice(idx, 1);
        }
    }
    cellObject.formula = "";
}

function getRIdCIdfromAddress(adress) {
    // B3
    let cellColAdr = adress.charCodeAt(0);

    let cellrowAdr = adress.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };

}

