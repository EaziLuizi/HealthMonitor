namespace HealthMonitorAPI.Entities
{
    public class Measurement
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public decimal Value { get; set; }
        public decimal? Value2 { get; set; }
        public int? MeasurementTypeId { get; set; }
        public MeasurementType? MeasurementType { get; set; }
    }
}
