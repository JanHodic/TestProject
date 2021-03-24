using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestProjectEria.Models;

namespace TestProjectEria.Data
{
    public class TestProjectEriaContext : DbContext
    {
        public TestProjectEriaContext (DbContextOptions<TestProjectEriaContext> options)
            : base(options)
        {
        }

        public DbSet<TestProjectEria.Models.WorkTask> WorkTask { get; set; }

        public DbSet<TestProjectEria.Models.WorkSort> WorkSort { get; set; }
    }
}
