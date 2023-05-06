from .base import *

DEBUG = True

# if ENVIRONMENT == 'production':
#   DATABASES = {
#       'default': {
#           'ENGINE': 'django.db.backends.sqlite3',
#           'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#       }
#   }

try:
    from .local import *
except ImportError:
    pass
