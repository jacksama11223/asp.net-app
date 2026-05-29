using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartLMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddQAAttachments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AttachmentIds",
                table: "CommunityQuestions",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "AttachmentIds",
                table: "CommunityAnswers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachmentIds",
                table: "CommunityQuestions");

            migrationBuilder.DropColumn(
                name: "AttachmentIds",
                table: "CommunityAnswers");
        }
    }
}
