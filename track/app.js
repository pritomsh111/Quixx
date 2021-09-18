axios.defaults.baseURL = "http://api-new.quixx.xyz:8080/api/quixx/v1/track/delivery/";

let tick = document.querySelector(".delivery__progress");
let path = document.querySelectorAll(".delivery__progress>div");
let ret_can_hold = document.querySelector(".delivery__progress").children[4]
    .children[0];
let trackBtn = document.querySelector("#trackBtn");
let trackId = document.querySelector("#trackID");
let errorSpan = document.querySelector(".errorInput>span");
let trackDelivery = document.querySelector(".track__delivery");
let trackDeliveryH2 = document.querySelector(".track__delivery>h2");
let interval;

let product_name = document.querySelector("#product_name");
let product_quantity_1 = document.querySelector("#product_quantity_1");
let product_quantity_2 = document.querySelector("#product_quantity_2");
let per_product_cost_1 = document.querySelector("#per_product_cost_1");
let per_product_cost_2 = document.querySelector("#per_product_cost_2");
let receiver_name = document.querySelector("#receiver_name");
let receiver_address = document.querySelector("#receiver_address");

trackId.addEventListener("keyup", function (event) {
    if (event.target.value) {
        trackBtn.classList.add("show-off");
        errorSpan.innerHTML = "";
    } else {
        trackBtn.classList.remove("show-off");
    }
});
trackBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let input = trackId.value;
    trackId.value = "";
    trackBtn.classList.remove("show-off");
    httpFuncGet(input);
    if (interval) {
        clearInterval(interval);
        interval = 0;
    }
    interval = setInterval(() => {
        httpFuncGet(input);
    }, 180000);
});

async function httpFuncGet(input) {
    let params = {
        method: "GET",
        url: `?trackId=${input}`,
    };
    try {
        let result = await axios(params);
        if (Object.keys(result.data.data).length) {
            console.log(result.data.data);
            trackDelivery.classList.add("show-off");
            trackDeliveryH2.innerHTML = "Tracking Details";
            progressFull(result.data.data);
        }
        else {
            throw new Error("Wrong Track ID");
        }
        // console.log(result);
    } catch (e) {
        errorSpan.innerHTML = "Wrong Track ID!";
    }
}

const status = {
    just_created: 1,
    enroute_to_pickup: 2,
    picked_up: 3,
    enroute_to_delivery: 4,
    delivered: 5,
    returned: 6,
    cancelled: 7,
    on_hold: 8,
    recreated_by_org: 9
};
function progressFull({ track_id, status_history, delivery_details }) {
    console.log(track_id, status_history, delivery_details);
    let result = delivery_details.delivery_status.toLowerCase();
    document.querySelector("#track_IDD").innerHTML = track_id;
    document.querySelector(".delivery__status").innerHTML = result.replace(/_/g, " ");
    let index = Object.keys(status).indexOf(result);

    for (let i = 0; i <= index; i++) {
        if (i > 4 && result !== "delivered") {
            let step5 = document.querySelector('.step__5 span');
            if (result === "returned") {
                ret_can_hold.innerHTML = "&#11152;";
                step5.innerHTML = "Returned";
            }
            else if (result === "cancelled") {
                ret_can_hold.innerHTML = "&#x02A2F;";
                step5.innerHTML = "Cancelled";
            }
            else if (result === "on_hold") {
                ret_can_hold.innerHTML = "&#33;";
                step5.innerHTML = "On Hold";
            }
            else if (result === "recreated_by_org") {
                ret_can_hold.innerHTML = "&#x021BB;";
                step5.innerHTML = "Recreated";
            }
            else {
                i = 10;
            }
            path[i - 1].classList.add("ret_can_hold");
            tick.children[i - 1].children[0].classList.add("ret_can_hold");
            path[i - 2].classList.remove("complete_path");
            break;
        }
        tick.children[i].children[0].classList.add("tick_visible");
        path[i].classList.add("done_status");
        if (i < index) {
            path[i].classList.add("complete_path");
        }
    }
    index < 4 && path[index + 1].classList.add("next_delivery_status");

    let dateString = delivery_details.delivery_created_date;
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];

    document.querySelector(
        ".delivery__details>div:nth-child(1)>h2:first-of-type"
    ).innerHTML = dayName;
    document.querySelector(
        ".delivery__details>div:nth-child(1)>h2:last-of-type"
    ).innerHTML = dateString.replace(/-/g, "/");

    document.querySelector(
        ".delivered__place"
    ).children[0].children[0].innerHTML = `<strong>${new Date(status_history.slice(-1)[0].time)}</strong>`;
    document.querySelector(".delivery__location>p").innerHTML =
        `<strong>${delivery_details.receiver_address}</strong>`;

    let tbody = document.querySelector(
        ".shipment__progress__details table tbody"
    );

    const shipment = status_history.reduce((accumulator, item) => {
        accumulator[item.status.toLowerCase()] = { "date": item.time };
        return accumulator;
    }, {});

    let newRow;
    if (tbody.rows.length) {
        Array.from(tbody.rows).map((row) => {
            row.remove();
        });
    }

    Object.keys(shipment).map((item, index) => {
        newRow = tbody.insertRow(0);
        newRow.style.cssText = `--i:${index}`;
        Object.keys(shipment[item]).map((td) => {
            if (item === "delivered") {
                newRow.insertCell(0).innerHTML =
                    '<div style="--j:' + index + '" class="check-wrap"></div>';
            }
            else if (item === "returned") {
                newRow.insertCell(0).innerHTML = "<div class='returnedx'><span>&#11152;</span></div>";
            }
            else if (item === "cancelled") {
                newRow.insertCell(0).innerHTML = "<div class='cancelledx'><span>&#x02A2F;</span></div>";
            }
            else if (item === "on_hold") {
                newRow.insertCell(0).innerHTML = "<div class='on_holdx'><span>&#33;</span></div>";
            }
            else if (item === "recreated_by_org") {
                newRow.insertCell(0).innerHTML = "<div class='recreated_by_orgx'><span>&#x021BB;</span></div>";
            }
            else if (index === Object.keys(shipment).length - 1) {
                newRow.insertCell(0).innerHTML =
                    '<div style="--j:' + index + '" class="check-wrap"></div>';
                newRow.insertCell(1).innerHTML = item.toUpperCase().replace(/_/g, " ");
                newRow.insertCell(2).innerHTML = shipment[item][td];

                newRow = tbody.insertRow(0);

                newRow.style.cssText = `--i:${index + 1}`;

                newRow.insertCell(0).innerHTML =
                    '<div style="--j:' +
                    index +
                    '" class="snippet" data-title=".dot-stretching"><div class="stage"><div class="dot-stretching"></div></div></div>';
                newRow.insertCell(1).innerHTML = Object.keys(status)
                [Object.keys(shipment).length].toUpperCase()
                    .replace(/_/g, " ");
                newRow.insertCell(2).innerHTML =
                    '<div style="--j:' +
                    index +
                    '" class="snippet" data-title=".dot-stretching"><div class="stage"><div class="dot-stretching"></div></div></div>';
                return;
            } else {
                newRow.insertCell(0).innerHTML =
                    '<div style="--j:' + index + '" class="check-wrap"></div>';
            }
            newRow.insertCell(1).innerHTML = item.toUpperCase().replace(/_/g, "  ");
            newRow.insertCell(2).innerHTML = shipment[item][td];
        });
    });
    console.log("Helllllll");
    product_name.innerHTML = delivery_details.product_name;
    product_quantity_2.innerHTML = delivery_details.product_qty;
    if (delivery_details.product_qty === 1) {
        per_product_cost_1.innerHTML = "Total Cost";
    }
    else {
        per_product_cost_1.innerHTML = "Per Product Cost";
    }
    per_product_cost_2.innerHTML = delivery_details.product_cost + "<sup>&#2547;</sup>";
    receiver_name.innerHTML = delivery_details.receiver_name;
    receiver_address.innerHTML = delivery_details.receiver_address;
}

// Shipment Progress visibility clickHandler

document
    .querySelector(".shipment__progress")
    .addEventListener("click", function () {
        this.classList.toggle("active");
        if (window.innerWidth < 360) {
            if (this.classList.contains("active"))
                document.querySelector(".shipment__details").style.marginTop = "17rem";
            else
                document.querySelector(".shipment__details").style.marginTop = "0rem";
        } else if (window.innerWidth < 820) {
            if (this.classList.contains("active"))
                document.querySelector(".shipment__details").style.marginTop = "22rem";
            else
                document.querySelector(".shipment__details").style.marginTop = "0rem";
        }
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 350);
    });

// Shipment Details - Product
function shipmentDetails2(e) {
    e.target.innerHTML =
        e.target.innerHTML.trim() === "Show Less -"
            ? "Show More +"
            : e.target.innerHTML.trim() === "Show More +"
                ? "Show Less -"
                : null;
    document
        .querySelector(
            ".shipment__details .shipment__details__products ul:not(:first-child)"
        )
        .classList.toggle("show__list");
}

document
    .querySelector(
        ".shipment__details .shipment__details__products>ul>li:last-child>span:last-child"
    )
    .addEventListener("click", shipmentDetails2);

if (location.search) {
    let search = new URLSearchParams(location.search);
    for (let [key, value] of search.entries()) {
        httpFuncGet(value);
    }
}
