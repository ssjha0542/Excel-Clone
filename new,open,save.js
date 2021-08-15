let download = document.querySelector(".download");
let clear = document.querySelector(".new");

download.addEventListener("click", function () {
	const data = JSON.stringify(workSheetDb);
	
	const blob = new Blob([data], { type: "application/json" }); 
	const url = window.URL.createObjectURL(blob); 
	const jsonData = JSON.parse(data);
	const xls = json2xls(jsonData);
	let a = document.createElement("a");

	a.download = "file.json"; 
	a.href = url; 
	a.click();
});



clear.addEventListener("click", function (e) {
	
	initUI();
	let newSheetDB = cleanSheetDB();
	sheetDB = newSheetDB;
})

function cleanSheetDB() {
	let newSheetDB = []; 
	for (let i = 0; i < 100; i++) {
		let row = [];
		for (let j = 0; j < 26; j++) {
			let cell = {
				bold: false,
				italic: "noraml",
				underline: "none",
				fontFamily: "Arial",
				fontSize: "16",
				halign: "left",
				value: "",
				children: [],
				formula: "",
			};
			row.push(cell);
		}
		newSheetDB.push(row);
	}
	return newSheetDB;
}