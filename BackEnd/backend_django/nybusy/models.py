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


class POI(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.CharField(max_length=255, null=True)
    opening_hours = models.FloatField()
    category = models.CharField(max_length=255)
    liked_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_pois')


class UserBucketlist(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    pois = models.ManyToManyField(POI)
    planned_visit_datetime = models.DateTimeField(null=True, blank=True)

