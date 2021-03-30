//console.log("Covid 19 tracker");
const tableBody = document.getElementById("tableBody");
const searchCountry = document.getElementById("SearchCounty");
const error = document.getElementById("error");
const th = document.getElementsByTagName("th");

function createRow(Country, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered) {

    let tr = document.createElement("tr");
    tr.className = "tableRow";
    let country = document.createElement("td");
    country.innerHTML = Country;
    tr.appendChild(country);

    let newConfirmed = document.createElement("td");
    newConfirmed.innerHTML = NewConfirmed;
    tr.appendChild(newConfirmed);

    let newDeaths = document.createElement("td");
    newDeaths.innerHTML = NewDeaths;
    tr.appendChild(newDeaths);

    let newRecovered = document.createElement("td");
    newRecovered.innerHTML = NewRecovered;
    tr.appendChild(newRecovered);

    let totalConfirmed = document.createElement("td");
    totalConfirmed.innerHTML = TotalConfirmed;
    tr.appendChild(totalConfirmed);

    let totalDeaths = document.createElement("td");
    totalDeaths.innerHTML = TotalDeaths;
    tr.appendChild(totalDeaths);

    let totalRecovered = document.createElement("td");
    totalRecovered.innerHTML = TotalRecovered;
    tr.appendChild(totalRecovered);

    tableBody.append(tr);
}

function showData(apiData) {
    //console.log(apiData.Countries);
    apiData.Countries.map((data) => {
        createRow(data.Country, data.NewConfirmed, data.NewDeaths, data.NewRecovered, data.TotalConfirmed, data.TotalDeaths, data.TotalRecovered);
    })

}

fetch('https://api.covid19api.com/summary')
    .then((apiData) => {
       // console.log(apiData);
        return apiData.json();
    }).then((apiData) => {
       // console.log(apiData);
        showData(apiData);
    }).catch((error) => {
        console.error(error);
    });

function searchByCountry() {
    filter_text = searchCountry.value.toUpperCase();
    let tr = tableBody.getElementsByTagName("tr");
    let flag = false;
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().startsWith(filter_text)) {
                flag = true;
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    if (!flag) {
        error.classList.remove("hide");
        error.innerHTML = "No Data Found";
    } else {
        error.className = "hide";
    }
}


function sort(e) {
    e.target.firstElementChild.style.display = "inline";
    let sort;let thead;
    if (e.target.getAttribute("sort")) {
        if (e.target.getAttribute("sort") === "A") {
            e.target.setAttribute("sort", "D");
            sort = "D";
            e.target.firstElementChild.setAttribute("src", "img/Arrow-Up.png");
        } else {
            e.target.setAttribute("sort", "A");
            sort = "A";
            e.target.firstElementChild.setAttribute("src", "img/Arrow-Down.png");
        }
    } else {
       
        e.target.setAttribute("sort", "A");
        sort = "A";
        e.target.firstElementChild.setAttribute("src", "img/Arrow-Down.png");
    }
    thead = document.getElementsByTagName("th");

    for (i = 0; i < thead.length; i++) {
        if (thead[i].innerText === e.target.innerText) {
            index = i;
        }
    }
    var table, rows, switching, i, x, y, shouldSwitch, index;
    switching = true;
    while (switching) {
        switching = false;
        rows = tableBody.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[index];
            y = rows[i + 1].getElementsByTagName("td")[index];

            if(index === 0){
                if (sort === "A") {
                    if (x.innerHTML.toUpperCase() < y.innerHTML.toUpperCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toUpperCase() > y.innerHTML.toUpperCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }else{
                if (sort === "A") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

searchCountry.addEventListener("keyup", searchByCountry);

for (let i = 0; i < th.length; i++) {
    th[i].addEventListener("click", () => {
        for (let i = 0; i < th.length; i++) {
            th[i].firstElementChild.style.display = "none";
        }
    });
    th[i].addEventListener("click", sort);

}
