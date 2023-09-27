using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchivoHistoricoApi.Models;

namespace ArchivoHistoricoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarrouselController : ControllerBase
    {
        private readonly ArchivoHistoricoContext _context;

        public CarrouselController(ArchivoHistoricoContext context)
        {
            _context = context;
        }

        // GET: api/Carrousel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carrousel>>> GetCarrousel()
        {
          if (_context.Carrousel == null)
          {
              return NotFound();
          }
            return await _context.Carrousel.ToListAsync();
        }

        // GET: api/Carrousel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Carrousel>> GetCarrousel(int id)
        {
          if (_context.Carrousel == null)
          {
              return NotFound();
          }
            var carrousel = await _context.Carrousel.FindAsync(id);

            if (carrousel == null)
            {
                return NotFound();
            }

            return carrousel;
        }

        // PUT: api/Carrousel/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarrousel(int id, Carrousel carrousel)
        {
            if (id != carrousel.Id)
            {
                return BadRequest();
            }

            _context.Entry(carrousel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarrouselExists(id))
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

        // POST: api/Carrousel
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Carrousel>> PostCarrousel(Carrousel carrousel)
        {
          if (_context.Carrousel == null)
          {
              return Problem("Entity set 'ArchivoHistoricoContext.Carrousel'  is null.");
          }
            _context.Carrousel.Add(carrousel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarrousel", new { id = carrousel.Id }, carrousel);
        }

        // DELETE: api/Carrousel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarrousel(int id)
        {
            if (_context.Carrousel == null)
            {
                return NotFound();
            }
            var carrousel = await _context.Carrousel.FindAsync(id);
            if (carrousel == null)
            {
                return NotFound();
            }

            _context.Carrousel.Remove(carrousel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarrouselExists(int id)
        {
            return (_context.Carrousel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
