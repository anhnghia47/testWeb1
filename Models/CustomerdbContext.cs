using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MISA.CukCuk08.Models
{
    public partial class CustomerdbContext : DbContext
    {
        public CustomerdbContext()
        {
        }

        public CustomerdbContext(DbContextOptions<CustomerdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=35.194.166.58;port=3306;user=nvmanh;password=12345678@Abc;database=MISADemo_NTNGHIA", x => x.ServerVersion("10.3.22-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasComment("Bảng thông tin khách hàng");

                entity.Property(e => e.CustomerId)
                    .HasColumnType("varchar(36)")
                    .HasComment("Khóa chính")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CompanyName)
                    .HasColumnType("varchar(255)")
                    .HasComment("Tên công ty")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerAddress)
                    .HasColumnType("varchar(255)")
                    .HasComment("Địa chỉ khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerBirthday)
                    .HasColumnType("datetime")
                    .HasComment("Ngày sinh khách hàng");

                entity.Property(e => e.CustomerCode)
                    .HasColumnType("varchar(100)")
                    .HasComment("Số thẻ thành viên")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerEmail)
                    .HasColumnType("varchar(100)")
                    .HasComment("Email khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerGroup)
                    .HasColumnType("varchar(100)")
                    .HasComment("Mã nhóm khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerName)
                    .HasColumnType("varchar(150)")
                    .HasComment("Họ tên khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerNote)
                    .HasColumnType("varchar(255)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerNumber)
                    .HasColumnType("varchar(50)")
                    .HasComment("Số điện thoại khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CustomerTaxCode)
                    .HasColumnType("varchar(100)")
                    .HasComment("Mã số thuế")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Is5FoodMember)
                    .HasColumnName("is5FoodMember")
                    .HasComment("Là thành viên của 5Food hay không");
            });

            
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
