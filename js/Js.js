
function functionMenuSearch() {
    var input, filter, ul, li, a, i, sld;
    input = document.getElementById("menuSearch");

    sld = document.getElementById("name-sld"); 
    sld.innerHTML = input.value.replace(' ', '').toLowerCase();
    filter = input.value.toLowerCase();
    //ul = document.getElementById("menuList");
    //li = ul.getElementsByTagName("li");
    //for (i = 0; i < li.length; i++){
    //    a = li[i].getElementsByTagName("a")[0];
    //    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //        li[i].style.display = "";
    //    } else {
    //        li[i].style.display = "none";
    //    }
    //}
    
}

function myFunc() {
    var table = document.getElementById("table-main");
    var row = table.insertRow(4);
    var id_customer = row.insertCell(0);
    var name_customer = row.insertCell(1);
    var name_company = row.insertCell(2);
    var tax_code = row.insertCell(3);
    var address = row.insertCell(4);
    var phone_number = row.insertCell(5);
    var email = row.insertCell(6);
    var customers = [{ id_customer: "KH0000044", name_customer: "Lí Bí", name_company: "MISA", tax_code: "8745115", address: "Hà Giang", phone_number: "0348415877", email: "adsds@gmail.com" }];

    customers.forEach(function (entry) {
        id_customer.innerHTML = entry.id_customer;
        name_customer.innerHTML = entry.name_customer;
        name_company.innerHTML = entry.name_company;
        tax_code.innerHTML = entry.tax_code;
        address.innerHTML = entry.address;
        phone_number.innerHTML = entry.phone_number;
        email.innerHTML = entry.email;
    });

    var index = document.getElementById("info-index");
    var text = "Hiển thị " + table.rows.length + " kết quả";
    index.innerHTML = text;
}

function renameSelect() {
    var selected = document.getElementById("name-sld");
    selected.innerHTML = "Danh mục";
}

function customer_add() {
    document.querySelector(".customer-add").style.display = 'flex';
}

function customer_add_close() {
    document.querySelector(".customer-add").style.display = 'none';
}

function confirm_add() {
    
    
    var customer = {
        id_customer: document.getElementById("customer_id").value,
        name_customer: document.getElementById("customer_name").value,
        name_company: document.getElementById("customer_cpn").value,
        tax_code: document.getElementById("customer_tax_code").value,
        address: document.getElementById("customer_address").value,
        phone_number: document.getElementById("customer_phone").value,
        email: document.getElementById("customer_email").value,
    };
    if (customer.id_customer === "" || customer.name_customer === "" || customer.phone_number === "") {
        alert("Mời điền đầy đủ các thông tin có dấu (*)");
    }
    else {
        var table = document.getElementById("table-main");
        var row = table.insertRow(table.rows.length);
        var id_customer = row.insertCell(0);
        var name_customer = row.insertCell(1);
        var name_company = row.insertCell(2);
        var tax_code = row.insertCell(3);
        var address = row.insertCell(4);
        var phone_number = row.insertCell(5);
        var email = row.insertCell(6);
        id_customer.innerHTML = customer.id_customer;
        name_customer.innerHTML = customer.name_customer;
        name_company.innerHTML = customer.name_company;
        tax_code.innerHTML = customer.tax_code;
        address.innerHTML = customer.address;
        phone_number.innerHTML = customer.phone_number;
        email.innerHTML = customer.email;
        alert("Thêm thành công");
    }
    
    var index = document.getElementById("info-index");
    var text = "Hiển thị " + (table.rows.length - 1) + " kết quả";
    index.innerHTML = text;
}