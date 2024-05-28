function addNewSmartPhone() {
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        url: "http://localhost:8080/api/smartphones",
        success: successHandler
    });
    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/smartphones",
        success: function (data) {
            let content = '<table id="display-list"><thead><tr>' +
                '<th>Producer</th><th>Model</th><th>Price</th><th>Delete</th>' +
                '</tr></thead><tbody>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += '</tbody></table>';
            $('#smartphoneList').html(content).show();
            $('#add-smartphone').hide();
            $('#display-create').show();
            $('#title').show();
        }
    });
}

function displayFormCreate() {
    $('#smartphoneList').hide();
    $('#add-smartphone').show();
    $('#display-create').hide();
    $('#title').hide();
}

function getSmartphone(smartphone) {
    return `<tr><td>${smartphone.producer}</td><td>${smartphone.model}</td><td>${smartphone.price}</td>` +
        `<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td></tr>`;
}

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: successHandler
    });
}
