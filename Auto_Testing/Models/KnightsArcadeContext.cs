using Microsoft.EntityFrameworkCore;

namespace Auto_Testing.Models
{
	public partial class KnightsArcadeContext : DbContext
	{
		public KnightsArcadeContext()
		{
		}

		public KnightsArcadeContext(DbContextOptions<KnightsArcadeContext> options)
			: base(options)
		{
		}

		public virtual DbSet<Games> Games { get; set; }
		public virtual DbSet<Tests> Tests { get; set; }
		public virtual DbSet<TestsQueue> Testsqueue { get; set; }
		public virtual DbSet<TestingLog> TestingLog { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{ }
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<TestingLog>(entity =>
			{
				entity.HasKey(e => new { e.TestlogDatetimeUtc });

				entity.ToTable("testinglog");

				entity.Property(e => e.GameId)
					.HasColumnName("game_id")
					.HasColumnType("int(11)");

				entity.Property(e => e.TestlogAttempt)
					.HasColumnName("testlog_attempt")
					.HasColumnType("int(11)");

				entity.Property(e => e.TestlogDatetimeUtc)
					.HasColumnName("testlog_datetime_utc")
					.HasColumnType("datetime")
					.HasDefaultValueSql("'CURRENT_TIMESTAMP'");

				entity.Property(e => e.TestlogLog)
					.HasColumnName("testlog_log")
					.HasColumnType("varchar(255)");
			});

			modelBuilder.Entity<Games>(entity =>
			{
				entity.HasKey(e => e.GameId);

				entity.ToTable("games");

				entity.HasIndex(e => e.GameName)
					.HasName("game_name_UNIQUE")
					.IsUnique();

				entity.Property(e => e.GameId)
					.HasColumnName("game_id")
					.HasColumnType("int(11)");

				entity.Property(e => e.GameControls)
					.IsRequired()
					.HasColumnName("game_controls")
					.HasColumnType("text");

				entity.Property(e => e.GameCreatorName)
					.IsRequired()
					.HasColumnName("game_creatorname")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameDescription)
					.IsRequired()
					.HasColumnName("game_description")
					.HasColumnType("text");

				entity.Property(e => e.GameGenreAction)
					.HasColumnName("game_genre_action")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreAdventure)
					.HasColumnName("game_genre_adventure")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreFighting)
					.HasColumnName("game_genre_fighting")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenrePuzzle)
					.HasColumnName("game_genre_puzzle")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreRacing)
					.HasColumnName("game_genre_racing")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreRpg)
					.HasColumnName("game_genre_rpg")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreRhythm)
					.HasColumnName("game_genre_rhythm")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenrePlatformer)
					.HasColumnName("game_genre_platformer")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreShooter)
					.HasColumnName("game_genre_shooter")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreSports)
					.HasColumnName("game_genre_sports")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreStrategy)
					.HasColumnName("game_genre_strategy")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameGenreSurvival)
					.HasColumnName("game_genre_survival")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GameImage0)
					.IsRequired()
					.HasColumnName("game_image0")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameImage1)
					.HasColumnName("game_image1")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameImage2)
					.HasColumnName("game_image2")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameImage3)
					.HasColumnName("game_image3")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameImage4)
					.HasColumnName("game_image4")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameName)
					.IsRequired()
					.HasColumnName("game_name")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameOnArcade)
					.HasColumnName("game_onarcade")
					.HasColumnType("bit(1)");

				entity.Property(e => e.GamePath)
					.IsRequired()
					.HasColumnName("game_path")
					.HasColumnType("varchar(255)");

				entity.Property(e => e.GameReviewDateUtc)
					.HasColumnName("game_reviewdate_utc")
					.HasColumnType("timestamp");

				entity.Property(e => e.GameStatus)
					.IsRequired()
					.HasColumnName("game_status")
					.HasColumnType("varchar(1)");

				entity.Property(e => e.GameSubmissionDateUtc)
					.HasColumnName("game_submissiondate_utc")
					.HasColumnType("timestamp")
					.HasDefaultValueSql("'CURRENT_TIMESTAMP'");

				entity.Property(e => e.GameVideolink)
					.HasColumnName("game_videolink")
					.HasColumnType("text");
			});

			modelBuilder.Entity<Tests>(entity =>
			{
				entity.HasKey(e => e.GameId);

				entity.ToTable("tests");

				entity.Property(e => e.GameId)
					.HasColumnName("game_id")
					.HasColumnType("int(11)");

				entity.Property(e => e.Test10min)
					.HasColumnName("test_10min")
					.HasColumnType("bit(1)");

				entity.Property(e => e.TestAttempts)
					.HasColumnName("test_attempts")
					.HasColumnType("int(11)");

				entity.Property(e => e.TestCloses)
					.HasColumnName("test_closes")
					.HasColumnType("bit(1)");

				entity.Property(e => e.TestOpens)
					.HasColumnName("test_opens")
					.HasColumnType("bit(1)");

				entity.Property(e => e.TestAverageRam)
					.HasColumnName("test_average_ram")
					.HasColumnType("varchar(100)");

			});

			modelBuilder.Entity<TestsQueue>(entity =>
			{
				entity.HasKey(e => e.GameId);

				entity.ToTable("testsqueue");

				entity.Property(e => e.GameId)
					.HasColumnName("game_id")
					.HasColumnType("int(11)");

				entity.Property(e => e.RetryCount)
					.HasColumnName("retry_count")
					.HasColumnType("int(11)")
					.HasDefaultValueSql("'0'");
			});

		}
	}

}
