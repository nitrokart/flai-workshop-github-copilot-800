from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')
        users_data = [
            {'username': 'tony_stark', 'email': 'tony@stark.com', 'password': 'ironman123'},
            {'username': 'steve_rogers', 'email': 'steve@avengers.com', 'password': 'cap123'},
            {'username': 'natasha_romanoff', 'email': 'natasha@shield.com', 'password': 'widow123'},
            {'username': 'bruce_banner', 'email': 'bruce@avengers.com', 'password': 'hulk123'},
            {'username': 'thor_odinson', 'email': 'thor@asgard.com', 'password': 'mjolnir123'},
            {'username': 'clark_kent', 'email': 'clark@dailyplanet.com', 'password': 'superman123'},
            {'username': 'bruce_wayne', 'email': 'bruce@wayneenterprises.com', 'password': 'batman123'},
            {'username': 'diana_prince', 'email': 'diana@themyscira.com', 'password': 'wonderwoman123'},
            {'username': 'barry_allen', 'email': 'barry@ccpd.com', 'password': 'flash123'},
            {'username': 'hal_jordan', 'email': 'hal@oa.com', 'password': 'greenlantern123'},
        ]
        users = {}
        for u in users_data:
            user = User.objects.create(**u)
            users[u['username']] = user
            self.stdout.write(f"  Created user: {user.username}")

        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(name='Team Marvel')
        team_dc = Team.objects.create(name='Team DC')
        self.stdout.write(f"  Created team: {team_marvel.name}")
        self.stdout.write(f"  Created team: {team_dc.name}")

        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': users['tony_stark'], 'activity_type': 'Running', 'duration': 30.0, 'date': date(2024, 1, 10)},
            {'user': users['steve_rogers'], 'activity_type': 'Strength Training', 'duration': 60.0, 'date': date(2024, 1, 11)},
            {'user': users['natasha_romanoff'], 'activity_type': 'Yoga', 'duration': 45.0, 'date': date(2024, 1, 12)},
            {'user': users['bruce_banner'], 'activity_type': 'Cycling', 'duration': 50.0, 'date': date(2024, 1, 13)},
            {'user': users['thor_odinson'], 'activity_type': 'Swimming', 'duration': 40.0, 'date': date(2024, 1, 14)},
            {'user': users['clark_kent'], 'activity_type': 'Flying Training', 'duration': 90.0, 'date': date(2024, 1, 10)},
            {'user': users['bruce_wayne'], 'activity_type': 'Martial Arts', 'duration': 75.0, 'date': date(2024, 1, 11)},
            {'user': users['diana_prince'], 'activity_type': 'Combat Training', 'duration': 60.0, 'date': date(2024, 1, 12)},
            {'user': users['barry_allen'], 'activity_type': 'Running', 'duration': 20.0, 'date': date(2024, 1, 13)},
            {'user': users['hal_jordan'], 'activity_type': 'Strength Training', 'duration': 55.0, 'date': date(2024, 1, 14)},
        ]
        for a in activities_data:
            activity = Activity.objects.create(**a)
            self.stdout.write(f"  Created activity: {activity.user.username} - {activity.activity_type}")

        self.stdout.write('Creating leaderboard entries...')
        leaderboard_data = [
            {'user': users['tony_stark'], 'score': 950},
            {'user': users['steve_rogers'], 'score': 1200},
            {'user': users['natasha_romanoff'], 'score': 850},
            {'user': users['bruce_banner'], 'score': 780},
            {'user': users['thor_odinson'], 'score': 1100},
            {'user': users['clark_kent'], 'score': 1500},
            {'user': users['bruce_wayne'], 'score': 1300},
            {'user': users['diana_prince'], 'score': 1400},
            {'user': users['barry_allen'], 'score': 1600},
            {'user': users['hal_jordan'], 'score': 900},
        ]
        for lb in leaderboard_data:
            entry = Leaderboard.objects.create(**lb)
            self.stdout.write(f"  Created leaderboard entry: {entry.user.username} - {entry.score}")

        self.stdout.write('Creating workouts...')
        workouts_data = [
            {'name': 'Iron Man Cardio', 'description': 'High-intensity arc reactor powered cardio session', 'duration': 30.0},
            {'name': 'Super Soldier Strength', 'description': 'Captain America serum-enhanced strength training', 'duration': 60.0},
            {'name': 'Black Widow Flex', 'description': 'Agility and flexibility routine from the Red Room', 'duration': 45.0},
            {'name': 'Hulk Smash', 'description': 'Explosive power training to channel your inner Hulk', 'duration': 40.0},
            {'name': 'Asgardian Warrior', 'description': 'Full-body Asgardian warrior conditioning', 'duration': 50.0},
            {'name': 'Man of Steel Endurance', 'description': 'Solar-powered endurance and stamina training', 'duration': 90.0},
            {'name': 'Dark Knight Martial Arts', 'description': 'Batman-inspired mixed martial arts and conditioning', 'duration': 75.0},
            {'name': 'Amazon Warrior', 'description': 'Wonder Woman Themysciran combat and fitness training', 'duration': 60.0},
            {'name': 'Speed Force Sprint', 'description': 'The Flash speed and agility drills', 'duration': 20.0},
            {'name': 'Green Lantern Power', 'description': 'Willpower and strength training for Lantern Corps', 'duration': 55.0},
        ]
        for w in workouts_data:
            workout = Workout.objects.create(**w)
            self.stdout.write(f"  Created workout: {workout.name}")

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with superhero test data!'))
