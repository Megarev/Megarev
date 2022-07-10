var addButton = document.getElementById("AddSplit");
var SplitAmt = document.getElementById("SplitAmt");
var cardNumber = 1;
var totalSplit = 0;
var formLocation = document.getElementsByTagName("form")[0];
var namesList = 
    `<option value="Name 1></option>
    <option value="Name 2></option>
    <option value="Name 3></option>
    <option value="Name 4></option>
    <option value="Name 5></option>`;

SplitAmt.innerText = totalSplit;
addButton.addEventListener("click", addSplit)

function addSplit(){
    var addCardHTML = `
    <div class="card bg-success text-white m-1">
    <div class="card-header">Split ${cardNumber+1}</div>
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
                id="Amount-${cardNumber+1}"
                placeholder="Amount"
                aria-label="Amount"
            />
        </div>
        <div class="col">
            <input
                type="number"
                class="form-control"
                id="Amount-${cardNumber+1}"
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
</div>`
 formLocation.innerHTML+= addCardHTML;
 cardNumber++;   
}