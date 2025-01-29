from .base import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True

if ENVIRONMENT == 'development':
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql_psycopg2',
          'NAME': 'store7',
          'USER': 'postgres',
          'PASSWORD': 'postgres',
          'HOST': 'localhost',
          'PORT': '',
      }
  }


try:
    from .local import *
except ImportError:
    pass
