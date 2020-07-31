using System;
using System.Collections.Generic;

namespace MISA.CukCuk08.Models
{
    public partial class Customer
    {
        public Customer()
        {
            CustomerId = Guid.NewGuid().ToString();
        }
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerTaxCode { get; set; }
        public string CompanyName { get; set; }
        public DateTime? CustomerBirthday { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerNumber { get; set; }
        public string CustomerEmail { get; set; }
        public bool? Is5FoodMember { get; set; }
        public string CustomerNote { get; set; }
        public string CustomerGroup { get; set; }
    }
}
