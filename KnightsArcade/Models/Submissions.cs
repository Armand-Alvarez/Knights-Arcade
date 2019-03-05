using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KnightsArcade.Models
{
    public partial class Submissions
    {
        public int CreatorId { get; set; }
        [Required]
        public int? GameId { get; set; }
        public string SubmissionName { get; set; }
        public string SubmissionStatus { get; set; }
        public string SubmissionImage0 { get; set; }
        public DateTime SubmissionDateUtc { get; set; }
        public DateTime? SubmissionReviewDateUtc { get; set; }
    }
}
