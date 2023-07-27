import sys
from django.http import HttpResponse

def my_view(request):
    return HttpResponse(sys.executable)

