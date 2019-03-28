using System;
using System.ComponentModel.DataAnnotations;

namespace KnightsArcade.Models.Database
{
    public partial class Submissions
    {
        public string CreatorName { get; set; }
        [Required]
        public int? GameId { get; set; }
        public string SubmissionName { get; set; }
        public string SubmissionStatus { get; set; }
        public string SubmissionImage0 { get; set; }
        public DateTime? SubmissionDateUtc { get; set; }
        public DateTime? SubmissionReviewDateUtc { get; set; }
        public string SubmissionReviewComments { get; set; }
    }
}
