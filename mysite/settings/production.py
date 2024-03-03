from .base import *
# from dj_database_url import parse as dburl
# from decouple import config
# import dj_database_url

DEBUG = True

if ENVIRONMENT == 'production':
  DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
  }
# DATABASES = {
#   "default": config("DATABASE_URL", default=default_dburl, cast=dburl),
#   # 'default': dj_database_url.config(default='postgresql://postgres:postgres@localhost:5432/mysite',        conn_max_age=600 )}
# }

  DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
  }
# if ENVIRONMENT == 'production':
#   DATABASES = {
#       'default': dj_database_url.parse(os.environ.get('DATABASE_URL'), conn_max_age=600),
#   }


if ENVIRONMENT == 'development':
  # DATABASES = {
  #   'default': {
  #       'ENGINE': 'django.db.backends.sqlite3',
  #       'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
  #   }
  # }
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


# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASS')


try:
    from .local import *
except ImportError:
    pass
