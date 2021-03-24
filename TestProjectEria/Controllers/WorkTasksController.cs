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
    public class WorkTasksController : ControllerBase
    {
        private readonly TestProjectEriaContext _context;

        public WorkTasksController(TestProjectEriaContext context)
        {
            _context = context;
        }

        // GET: api/WorkTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkTask>>> GetWorkTask()
        {
            return await _context.WorkTask.ToListAsync();
        }

        // GET: api/WorkTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkTask>> GetWorkTask(int id)
        {
            var workTask = await _context.WorkTask.FindAsync(id);

            if (workTask == null)
            {
                return NotFound();
            }

            return workTask;
        }

        // PUT: api/WorkTasks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkTask(int id, WorkTask workTask)
        {
            if (id != workTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(workTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkTaskExists(id))
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

        // POST: api/WorkTasks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WorkTask>> PostWorkTask(WorkTask workTask)
        {
            _context.WorkTask.Add(workTask);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetWorkTask", new { id = workTask.Id }, workTask);
        }

        // DELETE: api/WorkTasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkTask>> DeleteWorkTask(int id)
        {
            var workTask = await _context.WorkTask.FindAsync(id);
            if (workTask == null)
            {
                return NotFound();
            }

            _context.WorkTask.Remove(workTask);
            await _context.SaveChangesAsync();

            return workTask;
        }

        private bool WorkTaskExists(int id)
        {
            return _context.WorkTask.Any(e => e.Id == id);
        }
    }
}
