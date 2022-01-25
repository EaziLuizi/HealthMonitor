using System.ComponentModel.DataAnnotations;

namespace HealthMonitorAPI.Entities
{
    public class MeasurementType
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(200)]
        public string Description { get; set; } = string.Empty;

        [StringLength(10)]
        public string UnitOfMeasure { get; set; } = string.Empty;
    }
}
