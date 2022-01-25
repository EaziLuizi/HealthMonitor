using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthMonitorAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MeasurementTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    UnitOfMeasure = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeasurementTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Measurements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Value = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Value2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MeasurementTypeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Measurements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Measurements_MeasurementTypes_MeasurementTypeId",
                        column: x => x.MeasurementTypeId,
                        principalTable: "MeasurementTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "MeasurementTypes",
                columns: new[] { "Id", "Description", "Name", "UnitOfMeasure" },
                values: new object[] { 1, "A Body Weight Measurement", "Weight", "kg" });

            migrationBuilder.InsertData(
                table: "MeasurementTypes",
                columns: new[] { "Id", "Description", "Name", "UnitOfMeasure" },
                values: new object[] { 2, "A Blood Pressure Measurement expecing 2 values, the first being SYSTOLIC, the second being DIASTOLIC", "Blood Pressure", "mm Hg" });

            migrationBuilder.InsertData(
                table: "MeasurementTypes",
                columns: new[] { "Id", "Description", "Name", "UnitOfMeasure" },
                values: new object[] { 3, "A Resting Heart Rate Measurement", "Heart Rate", "bpm" });

            migrationBuilder.CreateIndex(
                name: "IX_Measurements_MeasurementTypeId",
                table: "Measurements",
                column: "MeasurementTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Measurements");

            migrationBuilder.DropTable(
                name: "MeasurementTypes");
        }
    }
}
