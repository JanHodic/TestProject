using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TestProjectEria.Migrations
{
    public partial class dateTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "TrackedTime",
                table: "WorkTask",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "TrackedTime",
                table: "WorkTask",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime));
        }
    }
}
