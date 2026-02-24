from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def get_id(self, obj):
        return str(obj.id)


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = '__all__'

    def get_id(self, obj):
        return str(obj.id)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = '__all__'

    def get_id(self, obj):
        return str(obj.id)

    def get_username(self, obj):
        try:
            return obj.user.username if obj.user else ''
        except Exception:
            return ''


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = Leaderboard
        fields = '__all__'

    def get_id(self, obj):
        return str(obj.id)

    def get_username(self, obj):
        try:
            return obj.user.username if obj.user else ''
        except Exception:
            return ''


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = '__all__'

    def get_id(self, obj):
        return str(obj.id)
