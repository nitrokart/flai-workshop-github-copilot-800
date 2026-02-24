from django.db import models


class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'users'

    def __str__(self):
        return self.username


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration = models.FloatField(help_text='Duration in minutes')
    date = models.DateField()

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'activities'

    def __str__(self):
        return f"{self.user} - {self.activity_type}"


class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField(default=0)

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.user} - {self.score}"


class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.FloatField(help_text='Duration in minutes')

    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'workouts'

    def __str__(self):
        return self.name
