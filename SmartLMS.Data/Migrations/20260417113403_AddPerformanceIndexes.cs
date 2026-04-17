using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartLMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPerformanceIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_UserID_Timestamp",
                table: "ActivityLogs",
                columns: new[] { "UserID", "Timestamp" });

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_UserId_Timestamp",
                table: "AuditLogs",
                columns: new[] { "UserId", "Timestamp" });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_UserID_CourseID",
                table: "Enrollments",
                columns: new[] { "UserID", "CourseID" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ActivityLogs_UserID_Timestamp",
                table: "ActivityLogs");

            migrationBuilder.DropIndex(
                name: "IX_AuditLogs_UserId_Timestamp",
                table: "AuditLogs");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_UserID_CourseID",
                table: "Enrollments");
        }
    }
}
