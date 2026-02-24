from django.test import TestCase, Client


class ApiRootTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_api_root_available_at_root(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        # ensure keys for collections are present
        expected_keys = {'users', 'teams', 'activities', 'leaderboard', 'workouts'}
        self.assertTrue(expected_keys.issubset(set(data.keys())))
