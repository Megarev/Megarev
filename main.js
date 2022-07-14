const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
  });
/**
 * Params : total, SrcDest, Time, Date, RefNumber
 */

var addButton = document.getElementById("AddSplit");
var SplitAmt = document.getElementById("SplitAmt");
var splitIDs = [1];
var cardNumber = 1;
var totalAmt = document.getElementById("TotalAmt");
var time = document.getElementById("time");
var date = document.getElementById("date");
var srcdest = document.getElementById("srcdest");
time.innerText = params.time || "No Time?";
date.innerText = params.date || "No Date?";
srcdest.innerText = params.SrcDest || "No Source/Destination?";
totalAmt.innerText = params.total || 100;
var formLocation = document.getElementsByTagName("form")[0];
var SplitCard = document.getElementById("Split");
var sendButton = document.getElementById("sendSplit");
var namesList = 
    `<option value="Name 1></option>
    <option value="Name 2></option>
    <option value="Name 3></option>
    <option value="Name 4></option>
    <option value="Name 5></option>`;

// var invalidChars = [
//   "-",
//   "+",
//   "e",
// ];

SplitAmt.innerText = 0;

addButton.addEventListener("click", addSplit);
sendButton.addEventListener("click", sendSplit);

function addSplit(){
    var addCardHTML = `
    <div class="card bg-info fs-4 m-2">
						<div class="card-header">Split ${cardNumber+1} <button data-dismiss="alert" onclick="deleteSplit(this)" id="Close-${cardNumber+1}" data-target="#closeablecard" type="button" class="close btn float-end btn-danger" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						  </button></div>
						<div class="card-body">
							<div class="row">
								<div class="col">
									<input
										type="text"
										class="form-control"
										id="Name-${cardNumber+1}"
										placeholder="Name"
										aria-label="Name"
										list="names"
									/>
									<datalist id="names">
                                        ${namesList}
									</datalist>
								</div>
                                <div class="col">
									<input
										type="number"
										class="form-control"
										id="sAmount-${cardNumber+1}"
										oninput="editSplit(this)"
                                        onkeydown="checkCharacter(this)"
										placeholder="Amount"
										aria-label="Amount"
									/>
								</div>
								<div class="col">
									<input
										type="number"
										class="form-control"
										id="Amount-${cardNumber+1}"
										oninput="editSplit(this)"
                                        onkeydown="checkCharacter(this)"
										placeholder="Amount"
										aria-label="Amount"
									/>
								</div>
								<div class="col">
									<textarea
										class="form-control"
										id="Note-${cardNumber+1}"
										placeholder="Note"
										aria-label="Note"
										rows="1"
									></textarea>
								</div>
							</div>
						</div>
					</div>`;
	let newCard = document.createElement('div');
	formLocation.appendChild(newCard);
	newCard.outerHTML = addCardHTML;
 splitIDs.push(cardNumber+1);
 cardNumber++;   
}

function deleteSplit(e){
    e.parentNode.parentElement.remove();
    let removeNum = Number(e.attributes.id.value.slice(-1));
    
    let index = splitIDs.indexOf(removeNum);
    if (index !== -1) splitIDs.splice(index,1);

    editSplit();
}

function editSplit(){
    let totalSplits = 0;
    splitIDs.forEach((id,i) => {
        totalSplits += Number(document.getElementById(`Amount-${id}`).value);
    })
    SplitAmt.innerText = totalSplits;
    exceedTotal();
	submitControl();
}

function exceedTotal(){
	let exceedClass = 'bg-danger';
	let notExceedClass = 'bg-warning';
    if (Number(SplitAmt.innerText) > Math.abs(Number(params.total))){
		SplitCard.classList.replace(notExceedClass,exceedClass);
	}
	else SplitCard.classList.replace(exceedClass,notExceedClass)
}

function clearName(e){
	e.parentNode.parentElement.children[0].value = ''
}

function submitControl() {
	if (Number(SplitAmt.innerText) > Math.abs(Number(params.total)))
		sendButton.hidden = true;
	else sendButton.hidden = false;
	
}

function sendSplit(){
	var dateInput = document.createElement("input");
	dateInput.setAttribute("date",params.date);
	var timeInput = document.createElement("input");
	timeInput.setAttribute("time",params.time);
	var refInput = document.createElement("input");
	refInput.setAttribute("refNumber",params.RefNumber);
	formLocation.appendChild(dateInput);
	formLocation.appendChild(timeInput);
	formLocation.appendChild(refInput);
	formLocation.submit();
}

// function checkCharacter(e) {
//     console.log(e.innerText);
//     if (invalidChars.includes(e.key)) {
//         e.preventDefault();
//       } 
// }