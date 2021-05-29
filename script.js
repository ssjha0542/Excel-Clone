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
let allAlignBtns=document.querySelectorAll(".alignment-container");
firstSheet.addEventListener("click",function(){
    let sheetsArr=document.querySelectorAll(".sheet");
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active-sheet");
    })
    if(!firstSheet.classList[1]){
        firstSheet.classList.add("active-sheet");
    }
})
addBtnContainer.addEventListener("click",function(){
    let sheetsArr=document.querySelectorAll(".sheet");
    let lastSheetElem=sheetsArr[sheetsArr.length-1];
    let idx=lastSheetElem.getAttribute("sheetIdx");
    idx=Number(idx);
    let NewSheet=document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    NewSheet.setAttribute("sheetIdx",idx+1);
    NewSheet.innerText=`Sheet ${idx+2}`;
    sheetList.appendChild(NewSheet);
    NewSheet.addEventListener("click",function(){
        let sheetsArr=document.querySelectorAll(".sheet");
        sheetsArr.forEach(function(sheet){
            sheet.classList.remove("active-sheet");
        })
        if(!NewSheet.classList[1]){
            NewSheet.classList.add("active-sheet");
        }
    })
})
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
    })
}
allCells[0].click();
leftBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";
})
centerBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="center";
})
rightBtn.addEventListener("click", function(){
    let address=addressBar.value;
    let {rid,cid}=getRidCidFronAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="right";
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
