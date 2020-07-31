
$(document).ready(function () {
    // Khởi tạo hàm và dữ liệu
    customer = new Customer();
})

// Biến đếm số khách hàng
var countRow = 0;
var option = 0;
// Đối tượng khách hàng quản lí các sự kiện
class Customer {
    constructor() {
        try {
            this.initEvent();
            this.loadFakeData();
            this.clickOutTable();
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
        $(".customer-delete .content-button-cf").on("click", this.deleteConfirm);
        $(".table-option .edit").on("click", this.editDisplay);
        $(".table-option .copy").on("click", this.copyCustomer);
    }

    // Hiển thị form thêm khách hàng
    addDisplay() {
        option = 1;
        $(".customer-add .title-left").text("Thêm khách hàng");
        $(".customer-add input").val(null);
        $(".customer-add").css("display", "flex");
    }

    // Ẩn form thêm khách hàng
    addClose() {
        $(".customer-add").css("display", "none");
    }

    // Xóa hàng khách hàng đã chọn
    deleteDisplay() {
        if ($(".row-selected").length != 0) {
            $(".customer-delete").css("display", "flex");
        } else {
            alert("Chưa chọn khách hàng");
        }

    }

    // Ẩn form xóa khách hàng
    deleteClose() {
        $(".customer-delete").css("display", "none");
    }

    // Ấn xác nhận xóa khách hàng
    deleteConfirm() {
        if ($(".row-selected").length > 0) {
            var customerIdSelected = $(".row-selected").data("id");
            $.ajax({
                url: "https://localhost:44318/api/customers",
                method: "DELETE",
                data: customerIdSelected,
                dataType: string
            }).done(function (response) {
                alert("Xóa thành công khách hàng mã " + customerIdSelected);
                location.reload();
            }).fail(function (response) {
                debugger
            });


        } else {
            alert("Chưa chọn khách hàng");
            $(".customer-delete").css("display", "none");
        }

    }

    // Xác nhận thêm khách hàng
    confirmAdd(customer) {
        try {
            var customer = {               
                customerGroup: $("#customer_group").val().trim(),
                customerName: $("#customer_name").val().trim(),
                customerNumber: $("#customer_phone").val().trim(),
                customerCode: $("#customer_code").val().trim(),
                customerBirthday: $("#customer_birthday").val().trim() == "" ? "1900-01-01" : $("#customer_birthday").val().trim(),
                companyName: $("#customer_cpn").val().trim(),
                customerEmail: $("#customer_email").val().trim(),
                is5FoodMember: $("#customer_is5Food").is(":checked"),
                customerAddress: $("#customer_address").val().trim(),
                customerTaxCode: $("#customer_tax_code").val().trim(),
                customerNote: $("#customer_cmt").val().trim()
            };
            
            if (customer[`customerCode`] === "" || customer[`customerName`] === "" || customer[`customerNumber`] === "") {
                alert("Mời điền đầy đủ các thông tin có dấu (*)");
            }
            else {
                switch (option) {
                    case 1:
                        countRow++;
                        
                        // Thêm data vừa nhập vào server
                        $.ajax({
                            url: "https://localhost:44318/api/customers",
                            method: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(customer),
                            dataType: "json",
                            
                        }).done(function (response) {
                            // Hiển thị lên UI
                            var isOddEvent = countRow % 2 == 0 ? `<tr>` : `<tr class="oddEven">`;
                            var customerinfoInput = $(isOddEvent + `<td>` + customer[`customerCode`] + `</td><td>` + customer[`customerName`]
                                + `</td><td>` + customer[`companyName`] + `</td><td class="text-align">` + formatDateByStr(customer[`customerBirthday`])
                                + `</td><td>` + customer[`customerAddress`] + `</td><td>` + customer[`customerNumber`]
                                + `</td><td>` + customer[`customerEmail`] + `</td><td class="text-align">` + creatCheckBoxByValue(customer[`is5FoodMember`]) + `</td></tr>`);
                            customerinfoInput.data("id", response.customerId);
                            $("#table-main tbody").append(customerinfoInput);
                            $("#info-index").text("Hiển thị " + countRow + " kết quả");
                            fakeData.push(customer);
                            $(".customer-add").css("display", "none");
                            alert("Thêm khách hàng thành công.");                            
                        }).fail(function (response) { debugger; });

                        
                        break;
                    case 2:
                        $.ajax({
                            url: "https://localhost:44318/api/customers/update",
                            method: "PUT",
                            contentType: "application/json",
                            data: JSON.stringify(customer),
                            dataType: "json",
                            success: function (response) {
                                debugger;
                            },
                            fail: function (response) { debugger; }
                        });
                        alert("Chỉnh sửa thông tin khách hàng thành công.");
                        location.reload();
                        break;
                    default:
                        alert("Không có lựa chọn phù hợp");
                }


            }
        } catch (e) {
            console.log(e);
        }

    }

    // Chỉnh sửa khách hàng
    editDisplay() {
        option = 2;
        $(".customer-add input").val(null);
        if ($(".row-selected").length != 0) {
            $(".customer-add .title-left").text("Chỉnh sửa thông tin khách hàng");
            $(".customer-add").css("display", "flex");

            // Lấy dữ liệu trên server tương ứng với khách hàng đã chọn
            var customerIdSelected = $(".row-selected").data("id");
            $.ajax({
                url: "https://localhost:44318/api/customers/" + customerIdSelected,
                method: "GET",
                contentType: "application/json",
            }).done(function (response) {
                $("#customer_group").val(response.customerGroup);
                $("#customer_name").val(response.customerName);
                $("#customer_cpn").val(response.companyName)
                $("#customer_birthday").val(response.customerBirthday.split("T")[0]);
                $("#customer_address").val(response.customerAddress);
                $("#customer_phone").val(response.customerNumber);
                $("#customer_email").val(response.customerEmail);
                $("#customer_is5Food").prop("checked", response.is5FoodMember);
                $("#customer_code").val(response.customerCode);
                $("#customer_tax_code").val(response.customerTaxCode);
                $("#customer_cmt").val(response.customerNote);
            });

            // Xác nhận cập nhập dữ liệu
        } else {
            alert("Chưa chọn khách hàng");
            $(".customer-add").css("display", "none");
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

    // Click vào phần tử khác phần tử của bảng
    clickOutTable() {
        $(document).click(function (event) {
            var clickOutId = true;
            if (event.target == $(".customer-delete .cf-text")[0]) {
                clickOutId = false;
            }
            for (var i = 0; i < $(".table-option .text").length; i++) {
                if ($(".table-option .text")[i] == event.target)
                    clickOutId = false;
            }
            for (var i = 0; i < $("td").length; i++) {
                if ($("td")[i] == event.target)
                    clickOutId = false;
            }

            // Xóa chọn khi click ngoài bảng
            if (clickOutId) {
                $("tbody .row-selected").removeClass("row-selected");
            }
        });
    }

    // Load dữ liệu fake
    loadFakeData() {
        try {
            $.ajax({
                url: "https://localhost:44318/api/customers",
                method: "GET",
                data: "",
                contentType: "application/json",
                dataType: "",                                
            }).done(function (response) {
                $.each(response, function (index, item) {
                    countRow++;
                    var isOddEven = countRow % 2 == 0 ? `<tr>` : `<tr class="oddEven">`;
                    var customerinfoInput = $(isOddEven + `<td>` + item[`customerCode`] + `</td><td>` + item[`customerName`]
                        + `</td><td>` + item[`companyName`] + `</td><td class="text-align">` + formatDateByStr(item[`customerBirthday`])
                        + `</td><td>` + item[`customerAddress`] + `</td><td>` + item[`customerNumber`]
                        + `</td><td>` + item[`customerEmail`] + `</td><td class="text-align">` + creatCheckBoxByValue(item[`is5FoodMember`]) + `</td></tr>`);
                    customerinfoInput.data("id", item[`customerId`]);
                    $("#table-main tbody").append(customerinfoInput);
                    $("#info-index").text("Hiển thị " + countRow + " kết quả");

                })
            }).fail(function (response) {
                debugger
            });



        } catch (e) {
            console.log(e);
        }
    }

    // Xử lí khi click vào 1 dòng
    rowOnClick(sender) {
        this.classList.add("row-selected");
        $(this).siblings().removeClass("row-selected");

    }

    // Xử lí khi click vào nhân bản khách hàng
    copyCustomer() {
        if ($(".row-selected").length != 0) {
            // Lấy dữ liệu trên server tương ứng với khách hàng đã chọn
            var customerIdSelected = $($(".row-selected")[0]).children()[0].textContent;
            $.ajax({
                url: "https://localhost:44318/api/customer/" + customerIdSelected,
                method: "GET",
                contentType: "application/json",
            }).done(function (response) {
                $.ajax({
                    url: "https://localhost:44318/api/customer",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(response),
                    dataType: "json",
                    success: function (response) {

                    },
                    fail: function (response) { debugger; }
                });
                alert("Nhân bản khách hàng thành công.");
                location.reload();
            });
        }
        else {
            alert("Chưa chọn khách hàng");
            $(".customer-add").css("display", "none");
        }
    }
};

// Định dạng ngày tháng theo xâu
function formatDateByStr(date) {
    try {        
            var day = date.split("-")[2].split("T")[0];
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
        customerId: "KH0000024",
        customerName: "Lê Duẩn",
        companyName: "MISA",
        customerBirthday: new Date(1994, 4, 7),
        customerAddress: "Hà Nội",
        customerNumber: "036643489",
        customerEmail: "traeww@gmail.com",
        is5FoodMember: false
    },

    {
        customerId: "KH0000012",
        customerName: "Trưng Trắc",
        companyName: "MISA",
        customerBirthday: new Date(1984, 1, 13),
        customerAddress: "Hà Nội",
        customerNumber: "034123389",
        customerEmail: "tsdsaqww@gmail.com",
        is5FoodMember: true
    },
    {
        customerId: "KH0000010",
        customerName: "Trưng Nhị",
        companyName: "MISA",
        customerBirthday: new Date(1990, 3, 23),
        customerAddress: "Hà Nội",
        customerNumber: "034123389",
        customerEmail: "adsnskaqww@gmail.com",
        is5FoodMember: false
    }


]
