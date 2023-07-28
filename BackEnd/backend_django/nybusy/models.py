""" Database models"""
from django.contrib.auth import get_user_model
from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.conf import settings


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        # Create an empty bucketlist for the new user
        UserBucketlist.objects.create(user=user)

        return user

    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin,):
    """User in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'



class WeatherData(models.Model):
    time = models.DateTimeField(null=True)
    temperature = models.FloatField(null=True)
    humidity = models.FloatField(null=True)
    dewpoint = models.FloatField(null=True)
    apparent_temperature = models.FloatField(null=True)
    precipitation_probability = models.FloatField(null=True)
    rain = models.FloatField(null=True)
    snowfall = models.FloatField(null=True)
    cloudcover = models.FloatField(null=True)


class TaxiZone(models.Model):
    some_id = models.IntegerField()
    shape_area = models.FloatField(null=True)
    objectid = models.IntegerField()
    shape_leng = models.FloatField(null=True)
    location_id = models.IntegerField(primary_key=True)
    zone = models.CharField(max_length=255)
    borough = models.CharField(max_length=255)

class PredictZone(models.Model):
    location_id = models.ForeignKey(TaxiZone, on_delete=models.SET_NULL, null=True)
    time = models.DateTimeField(null=True)
    busylevel = models.FloatField(null=True)



class POI(models.Model):
    addr_housenumber = models.CharField(max_length=255, null=True, blank=True)
    addr_street = models.CharField(max_length=255, null=True, blank=True)
    addr_city = models.CharField(max_length=255, null=True, blank=True)
    addr_postcode = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    name = models.CharField(max_length=255)
    opening_hours = models.CharField(max_length=255, null=True, blank=True)
    tags = models.CharField(max_length=255, null=True, blank=True)
    website = models.URLField(max_length=255, null=True, blank=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    location_id = models.ForeignKey(TaxiZone, on_delete=models.SET_NULL, null=True)
    zone = models.CharField(max_length=255)
    geometry = models.CharField(max_length=255)
    rating = models.FloatField(blank=True)

    # liked_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_pois')

    class Meta:
        ordering = ['addr_housenumber', 'addr_street', 'addr_city', 'addr_postcode', 'description', 'name',
                    'opening_hours', 'tags', 'website', 'longitude', 'latitude', 'location_id', 'zone', 'geometry']


class POIImage(models.Model):
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    poi = models.ForeignKey(POI, related_name='images',
                            on_delete=models.CASCADE)


class UserBucketlist(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    pois = models.ManyToManyField(POI)

