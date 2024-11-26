import { getAllShopOrder } from './fetch-api.js';
$(document).ready(function () {

    getAllShopOrder().then(response => {
        console.log(response);
        let placeHoder = $('#order-table');
        let out = ``;

        for (let i = 0; i < response.data.length; i++) {
            let element = response.data[i];
            out += `<tr>
    <td>${element.id}</td>
    <td>${element.username}</td>
    <td>${element.address}</td>
    <td>${element.orderTime}</td>
    <td>${element.total_price}</td>
    <td>${element.status}</td>
    <td>
        <button class="btn btn-info btn-detail">Detail</button>
        <button class="btn btn-warning btn-confirm">Confirm</button>
        <button class="btn btn-danger btn-deny">Deny</button>
    </td>`;
        }
        placeHoder.html(out);
    })
});
