using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTriggers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            CREATE OR REPLACE FUNCTION trigger_set_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.""UpdatedAt"" = current_timestamp at time zone 'utc';
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
            ");

            migrationBuilder.Sql(@"
            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON ""Posts""
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            DROP TRIGGER set_timestamp ON ""Posts"";
            ");

            migrationBuilder.Sql(@"
            DROP FUNCTION trigger_set_timestamp;
            ");
        }
    }
}