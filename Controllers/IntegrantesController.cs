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
    public class IntegrantesController : ControllerBase
    {
        private readonly ArchivoHistoricoContext _context;

        public IntegrantesController(ArchivoHistoricoContext context)
        {
            _context = context;
        }

        // GET: api/Integrantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Integrantes>>> GetIntegrantes()
        {
          if (_context.Integrantes == null)
          {
              return NotFound();
          }
            return await _context.Integrantes.ToListAsync();
        }

        // GET: api/Integrantes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Integrantes>> GetIntegrantes(int id)
        {
          if (_context.Integrantes == null)
          {
              return NotFound();
          }
            var integrantes = await _context.Integrantes.FindAsync(id);

            if (integrantes == null)
            {
                return NotFound();
            }

            return integrantes;
        }

        // PUT: api/Integrantes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIntegrantes(int id, Integrantes integrantes)
        {
            if (id != integrantes.Id)
            {
                return BadRequest();
            }

            _context.Entry(integrantes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IntegrantesExists(id))
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

        // POST: api/Integrantes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Integrantes>> PostIntegrantes(Integrantes integrantes)
        {
          if (_context.Integrantes == null)
          {
              return Problem("Entity set 'ArchivoHistoricoContext.Integrantes'  is null.");
          }
            _context.Integrantes.Add(integrantes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIntegrantes", new { id = integrantes.Id }, integrantes);
        }

        // DELETE: api/Integrantes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntegrantes(int id)
        {
            if (_context.Integrantes == null)
            {
                return NotFound();
            }
            var integrantes = await _context.Integrantes.FindAsync(id);
            if (integrantes == null)
            {
                return NotFound();
            }

            _context.Integrantes.Remove(integrantes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IntegrantesExists(int id)
        {
            return (_context.Integrantes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
