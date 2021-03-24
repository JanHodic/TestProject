using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestProjectEria.Data;
using TestProjectEria.Models;

namespace TestProjectEria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkSortsController : ControllerBase
    {
        private readonly TestProjectEriaContext _context;

        public WorkSortsController(TestProjectEriaContext context)
        {
            _context = context;
        }

        // GET: api/WorkSorts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkSort>>> GetWorkSort()
        {
            return await _context.WorkSort.ToListAsync();
        }

        // GET: api/WorkSorts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkSort>> GetWorkSort(int id)
        {
            var workSort = await _context.WorkSort.FindAsync(id);

            if (workSort == null)
            {
                return NotFound();
            }

            return workSort;
        }

        // PUT: api/WorkSorts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkSort(int id, WorkSort workSort)
        {
            if (id != workSort.Id)
            {
                return BadRequest();
            }

            _context.Entry(workSort).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkSortExists(id))
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

        // POST: api/WorkSorts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WorkSort>> PostWorkSort(WorkSort workSort)
        {
            _context.WorkSort.Add(workSort);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetWorkSort", new { id = workSort.Id }, workSort);
        }

        // DELETE: api/WorkSorts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkSort>> DeleteWorkSort(int id)
        {
            var workSort = await _context.WorkSort.FindAsync(id);
            if (workSort == null)
            {
                return NotFound();
            }

            _context.WorkSort.Remove(workSort);
            await _context.SaveChangesAsync();

            return workSort;
        }

        private bool WorkSortExists(int id)
        {
            return _context.WorkSort.Any(e => e.Id == id);
        }
    }
}
