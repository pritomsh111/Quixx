let typesArray = ["dayType", "productType", "productWeight", "productDistance", "productCity"];

var createCriteria = () => {
    document.getElementById('one-cc').disabled = true;
    document.getElementById('two-cc').disabled = false;
    document.getElementById('two-cc').style.fontSize = '13px';
    document.getElementById('one-cc').style.fontSize = '14.5px';
    document.getElementById('setCriteriaDetails').style.display = "none";
    $('#createCriteria').show();
};

var createField = (types, values = undefined) => {
    let typeForCreate = types === "dayType" ? ".col.dayType" : types === "productType" ? ".col.productType" : types === "weight" ? ".col.weight" : types === "distance" ? ".col.distance" : types === "city" ? ".col.city" : null;
    let placeHolder = types === "dayType" ? "... Urgent, SameDay, NextDay ..." : types === "productType" ? "... Glass, Food ..." : types === "weight" ? "... 1-2, 1-4, 7..." : types === "distance" ? "... 1-2, 2, 3 ..." : types === "city" ? "... Inside Dhaka, Outside Dhaka ..." : null;
    let classesName = types === "dayType" ? "dc" : types === "productType" ? "tc" : types === "weight" ? "wc" : types === "distance" ? "dsc" : types === "city" ? "cc" : null;
    let increment = types === "dayType" ? day : types === "productType" ? type : types === "weight" ? weight : types === "distance" ? distance : types === "city" ? city : null;

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
    types === "dayType" ? day++ : types === "productType" ? type++ : types === "weight" ? weight++ : types === "distance" ? distance++ : types === "city" ? city++ : null;
    dummyDivFlex.append(input, deleteIcon);

    div.append(dummyDivFlex);
}

var remove = (criteriatype) => {
    document.querySelector(`.flexIt.${criteriatype}`).remove();
}

document.querySelector("#criteriaSubmit").addEventListener("click", function (e) {
    e.preventDefault();
    $('#tickActivate').hide();
    $(".circle-loader").removeClass("load-complete");

    $("#sureActivate").html("Are you sure?");
    $("#myModalCriteria").modal('show');
});

document.querySelector("#modalCriteriaSet").addEventListener("click", function (e) {
    let method = flag ? "PUT" : "POST";
    document.getElementById('modalCriteriaCancel').disabled = true;
    document.getElementById('modalCriteriaSet').disabled = true;
    let dayType, productType, weight, distance, city;
    dayType = [];
    productType = [];
    weight = [];
    distance = [];
    city = [];
    Array.from(document.querySelectorAll(".flexIt")).map(item => {
        if (item.children[0].value) {
            if (item.classList.item(0).includes("dc")) {
                dayType.push(item.children[0].value.trim().replace(/ /g, ""));
            }
            else if (item.classList.item(0).includes("wc")) {
                weight.push(item.children[0].value.trim().replace(/ /g, ""));
            }
            else if (item.classList.item(0).includes("ds")) {
                distance.push(item.children[0].value.trim().replace(/ /g, ""));
            }
            else if (item.classList.item(0).includes("tc")) {
                productType.push(item.children[0].value.trim().replace(/ /g, ""));
            }
            else if (item.classList.item(0).includes("cc")) {
                city.push(item.children[0].value.trim().replace(/ /g, ""));
            }
        }
    });
    // Custom keys, not all keys, check array length, then place undefined!
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
                "distance": distance,
                "city": city
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
                }, 2000);
            },
            error: function (data) {
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
    let typeForCreate = types === "dayType" ? ".dyn.dayType" : types === "productType" ? ".dyn.productType" : types === "weight" ? ".dyn.productWeight" : types === "distance" ? ".dyn.productDistance" : types === "city" ? ".dyn.productCity" : null;
    let placeHolder = types === "dayType" ? "... Urgent, SameDay, NextDay ..." : types === "productType" ? "... Glass, Food ..." : types === "weight" ? "... 1-2, 1-4, 3 ..." : types === "distance" ? "... 1-2, 2, 6 ..." : types === "city" ? "... Inside Dhaka, Outside Dhaka ..." : null;
    let classesName = types === "dayType" ? "qdc" : types === "productType" ? "qtc" : types === "weight" ? "qwc" : types === "distance" ? "qdsc" : types === "city" ? "qcc" : null;
    let increment = types === "dayType" ? day : types === "productType" ? type : types === "weight" ? weight : types === "distance" ? distance : types === "city" ? city : null;

    let div = document.querySelector(`${typeForCreate}`);

    let dummyDivFlex = document.createElement("div");
    dummyDivFlex.className = `${classesName}${increment} flexIt2`;

    let identifier = document.createElement("span");
    identifier.innerHTML = values !== undefined ? `${values.replace(/ /g, "")}:` : "";
    identifier.style.cssText = "color: #0066b3; margin:1rem 0; width: 20%;";

    let input = document.createElement("input");
    input.type = "text";
    // identidier.value = values !== undefined ? values : "";
    input.style.cssText = "color: #0066b3;";
    input.className = `form-control ${typeForCreate.substr(5)}${values.replace(/ /g, "")}`;
    input.addEventListener("keyup", blockInputs.bind(this, `${typeForCreate.substr(5)}`));

    types === "dayType" ? day++ : types === "productType" ? type++ : types === "weight" ? weight++ : types === "distance" ? distance++ : types === "city" ? city++ : null;
    dummyDivFlex.append(identifier, input);

    div.append(dummyDivFlex);
}

function lockElse(classNameInput, event) {

    Array.from(document.querySelectorAll(`#setCriteriaDetails .flexIt2 input:not(input[class*=${classNameInput}])`))
        .map(item => {
            if (event.target.classList.item(1).includes("dayType") || event.target.classList.item(1).includes("productCity")) {
                if (item.classList.item(1).includes("productCity") || item.classList.item(1).includes("dayType")) {
                    return;
                }
            }
            item.disabled = true;
            item.placeholder = "You're Not Allowed To Set This";
        });
}

function unlockAll(classNameInput) {
    let dis = false;
    Array.from(document.querySelectorAll(`#setCriteriaDetails .flexIt2 input[class*=${classNameInput}]`))
        .map(item => {
            if (item.value) {
                dis = true;
            }
        });
    if (dis === false) {
        console.log(dis);
        Array.from(document.querySelectorAll(`#setCriteriaDetails .flexIt2 input`))
            .map(item => {
                item.disabled = false;
                item.placeholder = "";
            });
    }
}

function blockInputs(classNameInput, event) {
    if (event.key === "Backspace") {
        unlockAll(classNameInput, event);
    }
    else {
        lockElse(classNameInput, event);
    }
}

async function setUpdateCriteria() {
    document.getElementById('one-cc').disabled = false;
    document.getElementById('two-cc').disabled = true;
    document.getElementById('two-cc').style.fontSize = '14.5px';
    document.getElementById('one-cc').style.fontSize = '13px';
    document.getElementById('setCriteriaDetails').style.display = "block";
    document.getElementById('createCriteria').style.display = "none";
    if (flag) {
        Array.from(document.querySelectorAll("#setCriteriaDetails .flexIt2")).map(item => item.remove());
        await fillInput(true);
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

                    if (data.data[item]) {
                        Array.from(Object.keys(data.data[item]).map(itemKeys => {
                            console.log(itemKeys);
                            console.log("");
                            console.log(document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`), `.${item}${itemKeys}`, `.${item}${itemKeys.replace(/ /g, "")}`);

                            document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`) ? document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`).value = data.data[item][itemKeys] : null;
                        }));
                    }

                    // if (data.data[item]) {

                    //     Array.from(Object.keys(data.data[item]).map(itemKeys => {
                    //         console.log(itemKeys);
                    //         console.log("");
                    //         console.log(document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`), `.${item}${itemKeys}`, `.${item}${itemKeys.replace(/ /g, "")}`);

                    //         document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`) ? document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`).value = data.data[item][itemKeys] : null;
                    //     }));
                    // }
                });
            },
            error: function (data) {

            }
        });
}

function fillupFields() {
    if (flag) {
        $('#tickActivateConfirm').hide();
        $(".circle-loader").removeClass("load-complete");

        $("#sureActivateConfirm").html("Are you sure?");
        $("#myModalCriteriaConfirm").modal('show');
    }
}


document.querySelector("#modalCriteriaSetConfirm").addEventListener("click", function () {
    document.getElementById('modalCriteriaCancelConfirm').disabled = true;
    document.getElementById('modalCriteriaSetConfirm').disabled = true;
    let array = [];
    Object.keys(fillData).map((item, index) => {
        let obj = {};
        console.log(item, fillData[item]);
        fillData[item].map(i => {
            console.log(i, typesArray[index] + i.replace(/ /g, ""), item, index, document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`))

            obj[i] = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value ? document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value : 0;


            // if (document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`)) {
            //     obj[i] = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value ? document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value : 0;

            // }
            // console.log(i, document.querySelector(`input[class*='${i.replace(/ /g, "")}']`));
        });
        array.push(obj);
    });
    console.log(array);
    $.ajax
        ({
            type: criteriaEnabled ? "PUT" : "POST",
            url: `${urlForAll}delivery/criteria/${criteriaEnabled ? "update" : "create"}/${org_ID}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            data: JSON.stringify({
                "dayTypeMap": array[0],
                "productTypeMap": array[1],
                "productDistanceMap": array[3],
                "productWeightMap": array[2],
                "productCityMap": array[4]
            }),
            success: function (data) {
                console.log(data);
                $("#sureActivateConfirm").html("Please wait!");
                setTimeout(function () {
                    $(".circle-loader").addClass("load-complete");

                    $('#tickActivateConfirm').show();

                    $("#sureActivateConfirm").html(`Criteria ${flag ? "Updated" : "Set"}`);
                }, 900);

                setTimeout(function () {
                    $("#myModalCriteriaConfirm").modal('hide');
                    document.getElementById('modalCriteriaCancelConfirm').disabled = false;
                    document.getElementById('modalCriteriaSetConfirm').disabled = false;
                }, 2000);
            },
            error: function (data) {
                document.getElementById('modalCriteriaCancelConfirm').disabled = false;
                document.getElementById('modalCriteriaSetConfirm').disabled = false;
                let ob = Object.keys(data);
                let modalErr = document.querySelector('#myModalWrongDManCreate p');
                if (ob[17] == "responseJSON") {
                    modalErr.innerHTML = data.responseJSON.errorMessage;
                }
                else {
                    modalErr.innerHTML = "Please Wait! We are working!";
                }
                $('#myModalCriteriaConfirm').modal('hide');
                setTimeout(() => {
                    $('#myModalWrongDManCreate').modal('show');
                }, 0);
            }
        });
});