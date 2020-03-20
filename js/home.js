loadItems();
var money = 0.00;
var item = 0;
function loadItems() {
    $.ajax({
        type: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/http://tsg-vending.herokuapp.com/items',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'datatype': 'json',
        success: function (items) {
            $('#Buttons').empty();
            $.each(items, function (index, item) {
                var itemButton = '<button type="button" class="col-md-3" style="margin: 1%;" onclick="selectItem(' + item.id + ')"><p>';
                itemButton += item.name + '</p>';
                itemButton += '<p>$' + item.price + '</p>';
                itemButton += '<p> Quantity left: ' + item.quantity + '</p></button>';
                $('#Buttons').append(itemButton);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("FAILURE!");
        }
    })
}

function addMoney(value) {
    money += value;
    var moneyString = money.toFixed(2);
    $('#moneyIn').empty();
    $('#moneyIn').append(moneyString);
}

function selectItem(itemId){
    $('#itemNum').empty();
    $('#itemNum').append(itemId);
    item = itemId;
}

function vendItem() {
    $.ajax({
        type: 'POST',
        url: 'https://cors-anywhere.herokuapp.com/http://tsg-vending.herokuapp.com/money/' + money + '/item/' + item,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'datatype': 'json',
        success: function (change) {
            $('#moneyOut').empty();
            var changeString = '';
            if (change.quarters > 0){
                changeString += 'quarters ' + change.quarters;
            }
            if(change.nickels > 0){
                changeString += '<br>nickels ' + change.nickels;
            }
            if(change.dimes > 0){
                changeString += '<br>dimes ' + change.dimes;
            }
            if(change.pennies > 0){
                changeString += '<br>pennies ' + change.pennies;
            }
            $('#moneyOut').append(changeString);
            money = 0;
            addMoney(0);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#message').empty();
            $('#message').append(jqXHR.responseJSON.message);
        }
    })
}