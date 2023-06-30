from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    category1 = models.CharField(max_length=255)
    category2 = models.CharField(max_length=255)
    category3 = models.CharField(max_length=255)

class POI(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    opening_hours = models.FloatField()
    category = models.CharField(max_length=255)

class UserBucketlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poi = models.ForeignKey(POI, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
