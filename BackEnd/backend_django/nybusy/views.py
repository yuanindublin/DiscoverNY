import sys
from django.http import HttpResponse
from rest_framework.permissions import AllowAny

def my_view(request):
    permission_classes = [AllowAny]
    return HttpResponse(sys.executable)

