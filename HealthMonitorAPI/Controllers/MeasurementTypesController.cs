#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthMonitorAPI.Data;
using HealthMonitorAPI.Entities;

namespace HealthMonitorAPI.Controllers
{
    /// <summary>
    /// This API has been exposed to create additional Measurement Types via direct API Calls, no frontend UI was created to handle these CRUD operations.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementTypesController : ControllerBase
    {
        private readonly DataContext _context;

        public MeasurementTypesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/MeasurementTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeasurementType>>> GetMeasurementTypes()
        {
            return await _context.MeasurementTypes.ToListAsync();
        }

        // GET: api/MeasurementTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MeasurementType>> GetMeasurementType(int id)
        {
            var measurementType = await _context.MeasurementTypes.FindAsync(id);

            if (measurementType == null)
            {
                return NotFound();
            }

            return measurementType;
        }

        // PUT: api/MeasurementTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeasurementType(int id, MeasurementType measurementType)
        {
            if (id != measurementType.Id)
            {
                return BadRequest();
            }

            _context.Entry(measurementType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeasurementTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MeasurementTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MeasurementType>> PostMeasurementType(MeasurementType measurementType)
        {
            _context.MeasurementTypes.Add(measurementType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeasurementType", new { id = measurementType.Id }, measurementType);
        }

        // DELETE: api/MeasurementTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeasurementType(int id)
        {
            var measurementType = await _context.MeasurementTypes.FindAsync(id);
            if (measurementType == null)
            {
                return NotFound();
            }

            _context.MeasurementTypes.Remove(measurementType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeasurementTypeExists(int id)
        {
            return _context.MeasurementTypes.Any(e => e.Id == id);
        }
    }
}
