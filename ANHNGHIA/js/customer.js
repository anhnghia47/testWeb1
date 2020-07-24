$(document).ready(function () {
    // Khởi tạo hàm và dữ liệu
    customer = new Customer();
})

// Biến đếm số khách hàng
var countRow = 0;

// Đối tượng khách hàng quản lí các sự kiện
class Customer {
    constructor() {
        try {
            this.initEvent();
            this.loadFakeData();
        } catch (e) {
            console.log(e);
        }

    }

    // Khởi tạo các sự kiện cho đối tượng khách hàng
    initEvent() {
        $(".table-option .add").on("click", this.addDisplay);
        $(".customer-add .content-button-right-dl").on("click", this.addClose);
        $(".customer-add .close").on("click", this.addClose);
        $(".customer-add .content-button-right-cf").on("click", this.confirmAdd);
        $(".search #menuSearch").keyup(this.menuSearch);
        $("table").on("click", "tbody tr", this.rowOnClick)
        $(".table-option .delete").on("click", this.deleteDisplay);
        $(".customer-delete .content-button-dl").on("click", this.deleteClose);
    }

    // Hiển thị form thêm khách hàng
    addDisplay() {
        $(".customer-add").css("display", "flex");
    }

    // Ẩn form thêm khách hàng
    addClose() {
        
        $(".customer-add").css("display", "none");
    }

    // Xóa hàng khách hàng đã chọn
    deleteDisplay() {
        $(".customer-delete").css("display", "flex");
    }

    // Ẩn form xóa khách hàng
    deleteClose() {
        $(".customer-delete").css("display", "none");
    }

    // Lấy đối tượng khách hàng
    getCustomer() {
        var customer = {
            customerID: $("#customer_id").val().trim(),
            customerName: $("#customer_name").val().trim(),
            companyName: $("#customer_cpn").val().trim(),
            birthDay: $("#customer_birthday").val().trim(),
            address: $("#customer_address").val().trim(),
            phoneNumber: $("#customer_phone").val().trim(),
            email: $("#customer_email").val().trim(),
            is5Food: $("#customer_is5Food").is(":checked")
        };
        return customer;
    }

    // Xác nhận thêm khách hàng
    confirmAdd(customer) {
        try {
            var customer = {
                customerID: $("#customer_id").val().trim(),
                customerName: $("#customer_name").val().trim(),
                companyName: $("#customer_cpn").val().trim(),
                birthDay: $("#customer_birthday").val(),
                address: $("#customer_address").val().trim(),
                phoneNumber: $("#customer_phone").val().trim(),
                email: $("#customer_email").val().trim(),
                is5Food: $("#customer_is5Food").is(":checked")
            };
            if (customer[`customerID`] === "" || customer[`customerName`] === "" || customer[`phoneNumber`] === "") {
                alert("Mời điền đầy đủ các thông tin có dấu (*)");
            }
            else {
                countRow++;
                var isOddEvent = countRow % 2 == 0 ? `<tr>` : `<tr class="oddEven">`;
                var customerinfoInput = isOddEvent + `<td>` + customer[`customerID`] + `</td><td>` + customer[`customerName`]
                    + `</td><td>` + customer[`companyName`] + `</td><td class="text-align">` + formatDateByStr(customer[`birthDay`])
                    + `</td><td>` + customer[`address`] + `</td><td>` + customer[`phoneNumber`]
                    + `</td><td>` + customer[`email`] + `</td><td class="text-align">` + creatCheckBoxByValue(customer[`is5Food`]) + `</td></tr>`;
                $("#table-main tbody").append(customerinfoInput);
                $("#info-index").text("Hiển thị " + countRow + " kết quả");
                alert("Thêm khách hàng thành công.");
               
            }
        } catch (e) {
            console.log(e);
        }

    }

    // Tìm kiếm tùy chọn
    menuSearch() {
        try {
            var textInput;
            textInput = $("#menuSearch").val().trim().toUpperCase();
            $(".menu-list-option").each(function () {
                if ($(this).text().toUpperCase().includes(textInput)) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        } catch (e) {
            console.log(e);
        }
        
    }


    // Load dữ liệu fake
    loadFakeData() {
        try {
            $.each(fakeData, function (index, item) {
                countRow++;
                
                var isOddEven = countRow % 2 == 0 ? `<tr>` : `<tr class="oddEven">`;               
                var customerinfoInput = isOddEven + `<td>` + item[`customerID`] + `</td><td>` + item[`customerName`]
                    + `</td><td>` + item[`companyName`] + `</td><td class="text-align">` + formatDateByObj(item[`birthDay`])
                    + `</td><td>` + item[`address`] + `</td><td>` + item[`phoneNumber`]
                    + `</td><td>` + item[`email`] + `</td><td class="text-align">` + creatCheckBoxByValue(item[`is5Food`]) + `</td></tr>`;
                $("#table-main tbody").append(customerinfoInput);
                $("#info-index").text("Hiển thị " + countRow + " kết quả");
                
            })
        } catch (e) {
            console.log(e);
        }
    }

    // Xử lí khi click vào 1 dòng
    rowOnClick(sender) {      
        this.classList.add("row-selected");
        $(this).siblings().removeClass("row-selected");
    }
};

// Định dạng ngày tháng theo xâu
function formatDateByStr(date) {
    try {
        
        var day = date.split("-")[2];
        var month = date.split("-")[1];
        var year = date.split("-")[0];
            return day + "/" + month + "/" + year;
        
    } catch (e) {
        console.log(e);
    }
    
}

// Định dạng ngày tháng theo đối tượng
function formatDateByObj(date) {
    try {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        month = (month < 10) ? "0" + month : month;
        day = (day < 10) ? "0" + day : day;
        return day + "/" + month + "/" + year;
    } catch (e) {

    }

}

// Tạo checkbox với giá trị true hay false
function creatCheckBoxByValue(value) {
    var checkBoxHTML = $(`<input type="checkbox" />`);
    if (value) {
        checkBoxHTML = checkBoxHTML.attr("checked", true);
    }
    return checkBoxHTML[0].outerHTML;
}

// Dữ liệu giả
var fakeData = [
    {
        customerID: "KH0000024",
        customerName: "Lê Duẩn",
        companyName: "MISA",
        birthDay: new Date(1994, 4, 7),
        address: "Hà Nội",
        phoneNumber: "036643489",
        email: "traeww@gmail.com",
        is5Food: false
    },

    {
        customerID: "KH0000012",
        customerName: "Trưng Trắc",
        companyName: "MISA",
        birthDay: new Date(1984, 1, 13),
        address: "Hà Nội",
        phoneNumber: "034123389",
        email: "tsdsaqww@gmail.com",
        is5Food: true
    },
    {
        customerID: "KH0000010",
        customerName: "Trưng Nhị",
        companyName: "MISA",
        birthDay: new Date(1990, 3, 23),
        address: "Hà Nội",
        phoneNumber: "034123389",
        email: "adsnskaqww@gmail.com",
        is5Food: false
    }  
        
       
]
