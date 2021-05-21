var data2 = [
    [3, 'Cheese', true],
    [1, 'Apples', true],
    [2, 'Carrots', true],
    [1, 'Oranges', false],
];
var filterOptions = function (o, cell, x, y, value, config) {
    var value = o.getValueFromCoords(x - 1, y);
    console.log(o, cell, x, y, value, config);
    console.log("dsdsd");
    if (value == 1) {
        config.source = ['Apples', 'Bananas', 'Oranges'];
    } else if (value == 2) {
        config.source = ['Carrots'];
    } else {
        config.source = ['Apples', 'Bananas', 'Carrots', 'Oranges', 'Cheese'];
    }
    return config;
}

spreadsheet = jspreadsheet(document.getElementById('spreadsheet2'), {
    data: data2,
    columns: [
        { type: 'dropdown', title: 'Category', width: '300', source: [{ 'id': '1', 'name': 'Fruits' }, { 'id': '2', 'name': 'Legumes' }, { 'id': '3', 'name': 'General Food' }] },
        { type: 'dropdown', title: 'Food', width: '200', source: ['Apples', 'Bananas', 'Carrots', 'Oranges', 'Cheese'], filterOptions: filterOptions },
        { type: 'checkbox', title: 'Buy', width: '100' },
    ],
    onchange: function (instance, cell, c, r, value) {
        if (c == 0) {
            var columnName = jspreadsheet.getColumnNameFromId([c + 1, r]);
            console.log(instance, cell, c, r, value, columnName);
            instance.jexcel.setValue(columnName, '');
        }
    },
    license: 'NDc4ZDc3NWJiNjIzNzU4MTVmNjA4MjdlYjk1MjlmZDZiYzk4MWM3ZmM2OTdiZDczOWQ2MGRkZjdhNTc4ODExNmMyMDZkZDIwNzExYzJmM2EwOTBiYWUxM2M0NGY1YzNiZmVmZTY1OGY5OWI2ZDg2NDMyNjgwOTFhZGQ2MzVlYmEsZXlKdVlXMWxJam9pY0dGMWJDNW9iMlJsYkNJc0ltUmhkR1VpT2pFMk5EY3pPRGc0TURBc0ltUnZiV0ZwYmlJNld5SnFjMmhsYkd3dWJtVjBJaXdpWTI5a1pYTmhibVJpYjNndVkyOXRJaXdpYW5Od2NtVmhaSE5vWldWMExtTnZiU0lzSW1OellpNWhjSEFpTENKalpIQnVMbWx2SWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9pSXlJbjA9',
});
console.log(spreadsheet.getRowData([0]));

// let arr = []; $.ajax
//     ({
//         url: "https://api-new.quixx.xyz/api/quixx/v1/" + "approved/delivery/district",
//         type: "GET",

//         headers:
//         {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": 'Bearer ' + localStorage.getItem('token')
//         },
//         success: function (data) {
//             for (var i = 0; i < data.data.length; i++) {
//                 arr[i] = { id: i, name: data.data[i] };
//             }
//             changedArea("Dhaka");
//         }
//     });

// function changedArea(where) {
//     urlForAll = "https://api-new.quixx.xyz/api/quixx/v1/";
//     url = urlForAll + "approved/delivery/upazila/" + where;
//     if (where === "Dhaka") {
//         url = urlForAll + "approved/delivery/thana/Dhaka";
//     }
//     if (where === "Cox's Bazar") {
//         url = urlForAll + "approved/delivery/upazila/Cox'sBazar";
//     }
//     $.ajax
//         ({
//             url: url,
//             type: "GET",
//             headers:
//             {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 "Authorization": 'Bearer ' + localStorage.getItem('token')
//             },
//             success: function (data) {
//                 let area = [];
//                 for (var i = 0; i < data.data.length; i++) {
//                     area[i] = data.data[i];
//                 }
//                 spreadsheet = jspreadsheet(document.getElementById('spreadsheet2'), {
//                     data: data2,
//                     columns: [
//                         { type: 'dropdown', title: 'Category', width: '300', source: arr },
//                         { type: 'dropdown', title: 'Food', width: '200', source: area, filterOptions: filterOptions },
//                         { type: 'checkbox', title: 'Buy', width: '100' },
//                     ],
//                     onchange: function (instance, cell, c, r, value) {
//                         if (c == 0) {
//                             var columnName = jspreadsheet.getColumnNameFromId([c + 1, r]);
//                             console.log(instance, cell, c, r, value, columnName);
//                             instance.jexcel.setValue(columnName, '');
//                         }
//                     },
//                     license: 'NDc4ZDc3NWJiNjIzNzU4MTVmNjA4MjdlYjk1MjlmZDZiYzk4MWM3ZmM2OTdiZDczOWQ2MGRkZjdhNTc4ODExNmMyMDZkZDIwNzExYzJmM2EwOTBiYWUxM2M0NGY1YzNiZmVmZTY1OGY5OWI2ZDg2NDMyNjgwOTFhZGQ2MzVlYmEsZXlKdVlXMWxJam9pY0dGMWJDNW9iMlJsYkNJc0ltUmhkR1VpT2pFMk5EY3pPRGc0TURBc0ltUnZiV0ZwYmlJNld5SnFjMmhsYkd3dWJtVjBJaXdpWTI5a1pYTmhibVJpYjNndVkyOXRJaXdpYW5Od2NtVmhaSE5vWldWMExtTnZiU0lzSW1OellpNWhjSEFpTENKalpIQnVMbWx2SWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9pSXlJbjA9',
//                 });
//                 console.log(spreadsheet.getRowData([0]));
//             }
//         });
// }

// var data2 = [
//     [13, 'Adabor', true]
// ];
// var filterOptions = function (o, cell, x, y, value, config) {
//     var value = o.getValueFromCoords(x - 1, y);

//     if (value == 1) {
//         config.source = ['Apples', 'Bananas', 'Oranges'];
//     } else if (value == 2) {
//         config.source = ['Carrots'];
//     } else {
//         config.source = ['Apples', 'Bananas', 'Carrots', 'Oranges', 'A'];
//     }

//     return config;
// }
