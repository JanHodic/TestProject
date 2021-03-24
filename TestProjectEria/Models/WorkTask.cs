using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectEria.Models
{
    public class WorkTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string WorkSort { get; set; }
        public DateTime TrackedTime { get; set; }
    }
}
