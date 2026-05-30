using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartLMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCommunityResourceMetrics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookmarkCount",
                table: "CommunityResources",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DownloadCount",
                table: "CommunityResources",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CommunityResources",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHidden",
                table: "CommunityResources",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "PopularityScore",
                table: "CommunityResources",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "CommunityResources",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "CommunityResources",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "ViralScore",
                table: "CommunityResources",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookmarkCount",
                table: "CommunityResources");

            migrationBuilder.DropColumn(
                name: "DownloadCount",
                table: "CommunityResources");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CommunityResources");

            migrationBuilder.DropColumn(
                name: "IsHidden",
                table: "CommunityResources");

            migrationBuilder.DropColumn(
                name: "PopularityScore",
                table: "CommunityResources");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "CommunityResources");

            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "CommunityResources");

            migrationBuilder.DropColumn(
                name: "ViralScore",
                table: "CommunityResources");
        }
    }
}
