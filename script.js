let addBtnContainer=document.querySelector(".add-sheet_container");
let sheetList=document.querySelector(".sheets-list");
let firstSheet=document.querySelector(".sheet");
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