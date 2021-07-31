const status = {
    just_created: 1,
    enroute_to_pickup: 2,
    picked_up: 3,
    enroute_to_delivery: 4,
    delivered: 5,
    returned: 6,
    cancelled: 7,
    on_hold: 8,
};
function progressFull() {
    let result = "enroute_to_delivery".toLowerCase();
    let index = Object.keys(status).indexOf(result);
    let tick = document.querySelector(".delivery__progress");
    let path = document.querySelectorAll(".delivery__progress>div");
    let ret_can_hold = document.querySelector(".delivery__progress").children[4].children[0];

    for (let i = 0; i <= index; i++) {
        if (i > 4 && result !== "delivered") {
            result === "returned"
                ? (ret_can_hold.innerHTML = "&#11152")
                : result === "cancelled"
                    ? (ret_can_hold.innerHTML = "&#128473")
                    : result === "on_hold" ? (ret_can_hold.innerHTML = "&#33;") : i = 10;
            path[i - 1].classList.add("ret_can_hold");
            tick.children[i - 1].children[0].classList.add("ret_can_hold")
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
}

let dateString = "2021-04-07";
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date(dateString);
var dayName = days[d.getDay()];

document.querySelector(".delivery__details>div:nth-child(1)>h2:first-of-type").innerHTML = dayName;
document.querySelector(".delivery__details>div:nth-child(1)>h2:last-of-type").innerHTML = dateString.replace(/-/g, "/");

document.querySelector(".delivered__place").children[0].children[0].innerHTML = `<strong>${new Date(2021, 11, 24, 10, 33, 30)}</strong>`;
document.querySelector(".delivery__location>p").innerHTML = "<strong>Cumilla</strong>";


// Table Styling
let tbody = document.querySelector(".shipment__progress__details table tbody");

const shipment = {
    just_created: {
        date: "2019-21-32 20:30"
    },
    enroute_to_pickup: {
        date: "2019-21-32 13:30"
    },
    picked_up: {
        date: "2019-21-32 14:30"
    },
    enroute_to_delivery: {
        date: "2019-21-32 15:30"
    },
    // delivered: {
    //     date: "2019-21-32 16:30"
    // },
    // returned: {
    //     date: "2019-21-32 19:30"
    // },
    // cancelled: {
    //     date: "2019-21-32 17:30"
    // },
    // on_hold: {
    //     date: "2019-21-32 18:30"
    // },
}
let newRow, newCell;
Object.keys(shipment).map((item, index) => {
    newRow = tbody.insertRow(0);
    newRow.style.cssText = `--i:${index}`;
    Object.keys(shipment[item]).map(td => {
        if (item === "delivered") {
            newRow.insertCell(0).innerHTML = '<div style="--j:' + index + '" class="check-wrap"></div>';
        }
        else if (item === "returned") {
            newRow.insertCell(0).innerHTML = "<div class='returnedx'>&#11152</div>";
        }
        else if (item === "cancelled") {
            newRow.insertCell(0).innerHTML = "<div class='cancelledx'>X</div>";
        }
        else if (item === "on_hold") {
            newRow.insertCell(0).innerHTML = "<div class='on_holdx'>&#33;</div>";
        }
        else if (index === Object.keys(shipment).length - 1) {
            newRow.insertCell(0).innerHTML = '<div style="--j:' + index + '" class="check-wrap"></div>';
            newRow.insertCell(1).innerHTML = item.toUpperCase().replace(/_/g, " ");
            newRow.insertCell(2).innerHTML = shipment[item][td];

            newRow = tbody.insertRow(0);

            newRow.style.cssText = `--i:${index + 1}`;

            newRow.insertCell(0).innerHTML = '<div style="--j:' + index + '" class="snippet" data-title=".dot-stretching"><div class="stage"><div class="dot-stretching"></div></div></div>';
            newRow.insertCell(1).innerHTML = Object.keys(status)[Object.keys(shipment).length].toUpperCase().replace(/_/g, " ");
            newRow.insertCell(2).innerHTML = '<div style="--j:' + index + '" class="snippet" data-title=".dot-stretching"><div class="stage"><div class="dot-stretching"></div></div></div>';
            return;
        }
        else {
            newRow.insertCell(0).innerHTML = '<div style="--j:' + index + '" class="check-wrap"></div>';
        }
        newRow.insertCell(1).innerHTML = item.toUpperCase().replace(/_/g, "  ");
        newRow.insertCell(2).innerHTML = shipment[item][td];
    });
});

// Shipment Progress visibility clickHandler

document.querySelector(".shipment__progress").addEventListener("click", function () {
    this.classList.toggle("active");
    if (window.innerWidth < 360) {
        if (this.classList.contains("active"))
            document.querySelector(".shipment__details").style.marginTop = "17rem";
        else
            document.querySelector(".shipment__details").style.marginTop = "0rem";
    }
    else if (window.innerWidth < 820) {
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

document.querySelector(".shipment__details .shipment__details__products>ul>li:last-child>span:last-child")
    .addEventListener("click", function (e) {
        e.target.innerHTML = e.target.innerHTML.trim() === "Show Less -" ? "Show More +" : e.target.innerHTML.trim() === "Show More +" ? "Show Less -" : null;
        document.querySelector(".shipment__details .shipment__details__products ul:not(:first-child)").classList.toggle("show__list");
    });