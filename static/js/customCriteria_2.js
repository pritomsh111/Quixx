var createCriteria = () => {
    document.getElementById('one-cc').disabled = true;
    document.getElementById('two-cc').disabled = false;
    document.getElementById('two-cc').style.fontSize = '13px';
    document.getElementById('one-cc').style.fontSize = '14.5px';
    document.getElementById('setCriteriaDetails').style.display = "none";
    $('#createCriteria').show();
};

var createField = (types, values = undefined) => {
    let typeForCreate = types === "dayType" ? ".col.dayType" : types === "productType" ? ".col.productType" : types === "weight" ? ".col.weight" : types === "distance" ? ".col.distance" : null;
    let placeHolder = types === "dayType" ? "... Urgent, SameDay, NextDay ..." : types === "productType" ? "... Glass, Food ..." : types === "weight" ? "... 1-2, 1-4, 3, 0.6 ..." : types === "distance" ? "... 1-2, 2, 3, 0.4 ..." : null;
    let classesName = types === "dayType" ? "dc" : types === "productType" ? "tc" : types === "weight" ? "wc" : types === "distance" ? "dsc" : null;
    let increment = types === "dayType" ? day : types === "productType" ? type : types === "weight" ? weight : types === "distance" ? distance : null;

    let div = document.querySelector(`${typeForCreate}`);

    let dummyDivFlex = document.createElement("div");
    dummyDivFlex.className = `${classesName}${increment} flexIt`;

    let input = document.createElement("input");
    input.type = "text";
    input.value = values !== undefined ? values : "";
    input.style.cssText = "color: #0066b3; margin-top:0.4rem; width: 100%;";
    input.className = `form-control`;
    input.placeholder = placeHolder;

    let deleteIcon = document.createElement("i");
    deleteIcon.className = `material-icons`;
    deleteIcon.style.cssText = "cursor: pointer;";
    deleteIcon.innerHTML = "delete_outline";
    deleteIcon.onclick = remove.bind(this, `${classesName}${increment}`);
    types === "dayType" ? day++ : types === "productType" ? type++ : types === "weight" ? weight++ : types === "distance" ? distance++ : null;
    dummyDivFlex.append(input, deleteIcon);

    div.append(dummyDivFlex);
}

var remove = (criteriatype) => {
    document.querySelector(`.flexIt.${criteriatype}`).remove();
}

document.querySelector("#criteriaSubmit").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById('criteriaSubmit').disabled = true;
    $('#tickActivate').hide();
    $(".circle-loader").removeClass("load-complete");

    $("#sureActivate").html("Are you sure?");
    $("#myModalCriteria").modal('show');
});

document.querySelector("#modalCriteriaSet").addEventListener("click", function (e) {
    let method = flag ? "PUT" : "POST";
    document.getElementById('criteriaSubmit').disabled = true;
    document.getElementById('modalCriteriaCancel').disabled = true;
    document.getElementById('modalCriteriaSet').disabled = true;
    let dayType, productType, weight, distance;
    dayType = [];
    productType = [];
    weight = [];
    distance = [];
    Array.from(document.querySelectorAll(".flexIt")).map(item => {
        if (item.children[0].value) {
            if (item.classList.item(0).includes("dc")) {
                dayType.push(item.children[0].value);
            }
            else if (item.classList.item(0).includes("wc")) {
                weight.push(item.children[0].value);
            }
            else if (item.classList.item(0).includes("ds")) {
                distance.push(item.children[0].value);
            }
            else if (item.classList.item(0).includes("tc")) {
                productType.push(item.children[0].value);
            }
        }
    });
    $.ajax
        ({
            type: method,
            url: urlForAll + "delivery/criteria/keys/" + org_ID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            data: JSON.stringify({
                "dayType": dayType,
                "productType": productType,
                "weight": weight,
                "distance": distance
            }),
            success: function (data) {
                $("#sureActivate").html("Please wait!");
                setTimeout(function () {
                    $(".circle-loader").addClass("load-complete");

                    $('#tickActivate').show();

                    $("#sureActivate").html(`Criteria ${flag ? "Updated" : "Set"}`);
                }, 900);

                setTimeout(function () {
                    $("#myModalCriteria").modal('hide');
                    document.getElementById('modalCriteriaCancel').disabled = false;
                    document.getElementById('modalCriteriaSet').disabled = false;
                    document.getElementById('criteriaSubmit').disabled = false;
                }, 2000);
            },
            error: function (data) {
                document.getElementById('criteriaSubmit').disabled = false;
                document.getElementById('modalCriteriaCancel').disabled = false;
                document.getElementById('modalCriteriaSet').disabled = false;
                let ob = Object.keys(data);
                let modalErr = document.querySelector('#myModalWrongDManCreate p');
                if (ob[17] == "responseJSON") {
                    modalErr.innerHTML = data.responseJSON.errorMessage;
                }
                else {
                    modalErr.innerHTML = "Please Wait! We are working!";
                }
                $('#myModalCriteria').modal('hide');
                setTimeout(() => {
                    $('#myModalWrongDManCreate').modal('show');
                }, 0);
            }
        });
});


var fillInputDetails = (types, values = undefined) => {
    let typeForCreate = types === "dayType" ? ".dyn.dayType" : types === "productType" ? ".dyn.productType" : types === "weight" ? ".dyn.productWeight" : types === "distance" ? ".dyn.productDistance" : null;
    let placeHolder = types === "dayType" ? "... Urgent, SameDay, NextDay ..." : types === "productType" ? "... Glass, Food ..." : types === "weight" ? "... 1-2, 1-4, 3, 0.6 ..." : types === "distance" ? "... 1-2, 2, 3, 0.4 ..." : null;
    let classesName = types === "dayType" ? "qdc" : types === "productType" ? "qtc" : types === "weight" ? "qwc" : types === "distance" ? "qdsc" : null;
    let increment = types === "dayType" ? day : types === "productType" ? type : types === "weight" ? weight : types === "distance" ? distance : null;

    let div = document.querySelector(`${typeForCreate}`);

    let dummyDivFlex = document.createElement("div");
    dummyDivFlex.className = `${classesName}${increment} flexIt2`;

    let identifier = document.createElement("span");
    identifier.innerHTML = values !== undefined ? `${values}:` : "";
    identifier.style.cssText = "color: #0066b3; margin:1rem 0; width: 12%;";

    let input = document.createElement("input");
    input.type = "text";
    // identidier.value = values !== undefined ? values : "";
    input.style.cssText = "color: #0066b3;";
    input.className = `form-control ${typeForCreate.substr(5)}${values.replace(/ /, "")}`;

    types === "dayType" ? day++ : types === "productType" ? type++ : types === "weight" ? weight++ : types === "distance" ? distance++ : null;
    dummyDivFlex.append(identifier, input);

    div.append(dummyDivFlex);
}

function setUpdateCriteria() {
    document.getElementById('one-cc').disabled = false;
    document.getElementById('two-cc').disabled = true;
    document.getElementById('two-cc').style.fontSize = '14.5px';
    document.getElementById('one-cc').style.fontSize = '13px';
    document.getElementById('setCriteriaDetails').style.display = "block";
    document.getElementById('createCriteria').style.display = "none";
    if (flag) {
        Array.from(document.querySelectorAll("#setCriteriaDetails .flexIt2")).map(item => item.remove());
        fillInput(true);
        criteriaEnabled ? getData() : null;
    }
}

function getData() {
    $.ajax
        ({
            type: "GET",
            url: urlForAll + "delivery/criteria/" + org_ID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                Object.keys(data.data).map(item => {
                    if (item === "id" || item === "userId") {
                        return;
                    }
                    Array.from(Object.keys(data.data[item]).map(itemKeys => {
                        // console.log(itemKeys);
                        // console.log("");
                        // console.log(document.querySelector(`.${item}${itemKeys}`), `.${item}${itemKeys}`);

                        document.querySelector(`.${item}${itemKeys}`) ? document.querySelector(`.${item}${itemKeys}`).value = data.data[item][itemKeys.replace(/ /, "")] : null;
                    }));
                });
            },
            error: function (data) {

            }
        });
}

function fillupFields() {
    Object.keys(fillData).map(item => {
        fillData[item].map(i => {
            console.log(document.querySelector(`div[class*='${i.replace(/ /, "")}']`));
        });
    });
    // $.ajax
    //     ({
    //         type: criteriaEnabled ? "PUT" : "POST",
    //         url: urlForAll + "delivery/criteria/" + criteriaEnabled ? "update/" : "create/" + org_ID,
    //         headers:
    //         {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             "Authorization": 'Bearer ' + localStorage.getItem('token')
    //         },
    //         success: function (data) {
    //         },
    //         error: function (data) {
    //         }
    //     });
}