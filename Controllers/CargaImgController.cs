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
    public class CargaImgController : ControllerBase
    {
        private readonly ArchivoHistoricoContext _context;

        public CargaImgController(ArchivoHistoricoContext context)
        {
            _context = context;
        }

        // GET: api/CargaImg
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CargaImg>>> GetCargaImg()
        {
          if (_context.CargaImg == null)
          {
              return NotFound();
          }
            return await _context.CargaImg.ToListAsync();
        }

        // GET: api/CargaImg/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CargaImg>> GetCargaImg(int id)
        {
          if (_context.CargaImg == null)
          {
              return NotFound();
          }
            var cargaImg = await _context.CargaImg.FindAsync(id);

            if (cargaImg == null)
            {
                return NotFound();
            }

            return cargaImg;
        }

        // PUT: api/CargaImg/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCargaImg(int id, CargaImg cargaImg)
        {
            if (id != cargaImg.Id)
            {
                return BadRequest();
            }

            _context.Entry(cargaImg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CargaImgExists(id))
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

        // POST: api/CargaImg
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CargaImg>> PostCargaImg(CargaImg cargaImg)
        {
          if (_context.CargaImg == null)
          {
              return Problem("Entity set 'ArchivoHistoricoContext.CargaImg'  is null.");
          }
            _context.CargaImg.Add(cargaImg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCargaImg", new { id = cargaImg.Id }, cargaImg);
        }

        // DELETE: api/CargaImg/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCargaImg(int id)
        {
            if (_context.CargaImg == null)
            {
                return NotFound();
            }
            var cargaImg = await _context.CargaImg.FindAsync(id);
            if (cargaImg == null)
            {
                return NotFound();
            }

            _context.CargaImg.Remove(cargaImg);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CargaImgExists(int id)
        {
            return (_context.CargaImg?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
