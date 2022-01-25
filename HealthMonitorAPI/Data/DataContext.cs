using HealthMonitorAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthMonitorAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<MeasurementType> MeasurementTypes { get; set; }
        public DbSet<Measurement> Measurements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add default measurementTypes...

            modelBuilder.Entity<MeasurementType>().HasData(
                new MeasurementType
                {
                    Id = 1,
                    Name = "Weight",
                    Description = "A Body Weight Measurement",
                    UnitOfMeasure = "kg"
                },
                new MeasurementType
                {
                    Id = 2,
                    Name = "Blood Pressure",
                    Description = "A Blood Pressure Measurement expecing 2 values, the first being SYSTOLIC, the second being DIASTOLIC",
                    UnitOfMeasure = "mm Hg"
                },
                new MeasurementType
                {
                    Id = 3,
                    Name = "Heart Rate",
                    Description = "A Resting Heart Rate Measurement",
                    UnitOfMeasure = "bpm"
                }
            );
        }
    }
}
