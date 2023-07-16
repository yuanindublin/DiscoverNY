# NYBusy - New York Leisure Travel Planning App

NYBusy is a travel planning application, specifically designed for users planning leisure trips in New York. The application includes a many-to-many relationship between users and points of interest (POIs), with each user having a bucketlist of POIs.

## User Model

The user model includes basic identity information such as email, name, password etc. Users can be either guests or registered users. Only registered users are allowed to add or remove POIs in the Bucketlist.

```python
class User(AbstractBaseUser, PermissionsMixin):
    # Basic user info in the system
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = UserManager()
    
```

## POI Model
POIs include information such as name, description, address, latitude, longitude, opening hours, category etc. All users (both guests and registered users) are allowed to view the POI information, but only registered users can add POIs to their Bucketlist.
```python
class POI(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    Address = models.CharField(max_length=255, null=True)
    opening_hours = models.FloatField()
    category = models.CharField(max_length=255)
    liked_by = models.ManyToManyField(User, through='UserBucketlist')
```
## UserBucketlist Model
UserBucketlist is an intermediate table that describes the many-to-many relationship between users and POIs. Whenever a registered user adds a POI to their Bucketlist, a new entry is created in the UserBucketlist table, which includes the user, the POI, the date added, the planned visit date etc.
```python
class UserBucketlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poi = models.ForeignKey(POI, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    planned_visit_datetime = models.DateTimeField(null=True, blank=True)
```

An empty Bucketlist is automatically created for each registered user at the time of registration. Only registered users are allowed to add or remove POIs to/from their Bucketlist. For each POI, users can also set their planned visit date/time.

This concludes the basic model design of the NYBusy travel planning application.