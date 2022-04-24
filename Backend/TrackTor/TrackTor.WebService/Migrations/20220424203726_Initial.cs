using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackTor.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "TrackTor");

            migrationBuilder.CreateTable(
                name: "User",
                schema: "TrackTor",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Login = table.Column<string>(type: "text", nullable: false),
                    Hash = table.Column<string>(type: "text", nullable: false),
                    Salt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Track",
                schema: "TrackTor",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Region = table.Column<string>(type: "text", nullable: true),
                    Distance = table.Column<double>(type: "double precision", nullable: false),
                    AverageTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Track", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Track_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "TrackTor",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Result",
                schema: "TrackTor",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TrackId = table.Column<Guid>(type: "uuid", nullable: false),
                    RecordTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Result", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Result_Track_TrackId",
                        column: x => x.TrackId,
                        principalSchema: "TrackTor",
                        principalTable: "Track",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Result_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "TrackTor",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrackCheckPoint",
                schema: "TrackTor",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TrackId = table.Column<Guid>(type: "uuid", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackCheckPoint", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackCheckPoint_Track_TrackId",
                        column: x => x.TrackId,
                        principalSchema: "TrackTor",
                        principalTable: "Track",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Result_Id",
                schema: "TrackTor",
                table: "Result",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Result_TrackId",
                schema: "TrackTor",
                table: "Result",
                column: "TrackId");

            migrationBuilder.CreateIndex(
                name: "IX_Result_UserId",
                schema: "TrackTor",
                table: "Result",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Track_Id",
                schema: "TrackTor",
                table: "Track",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Track_UserId",
                schema: "TrackTor",
                table: "Track",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackCheckPoint_Id",
                schema: "TrackTor",
                table: "TrackCheckPoint",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrackCheckPoint_TrackId",
                schema: "TrackTor",
                table: "TrackCheckPoint",
                column: "TrackId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Id",
                schema: "TrackTor",
                table: "User",
                column: "Id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Result",
                schema: "TrackTor");

            migrationBuilder.DropTable(
                name: "TrackCheckPoint",
                schema: "TrackTor");

            migrationBuilder.DropTable(
                name: "Track",
                schema: "TrackTor");

            migrationBuilder.DropTable(
                name: "User",
                schema: "TrackTor");
        }
    }
}
