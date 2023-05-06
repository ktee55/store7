from .base import *
# import django_heroku
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# # SECURITY WARNING: define the correct hosts in production!
# # ALLOWED_HOSTS = ['store7.pro', 'www.store7.pro', '127.0.0.1', 'localhost']
# ALLOWED_HOSTS = ['*']

# # EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = os.getenv('EMAIL_USER')
# EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASS')

# RECAPTCHA_PUBLIC_KEY="6LedAKQiAAAAAGD5gmNhe8wGzmQpP65LzKSBPeNm"
# RECAPTCHA_PRIVATE_KEY="6LedAKQiAAAAAPt64Z_jTn6QByKVk7u0caP-SpY0"
# # Recaptcha settings
# # RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
# # RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')

# INSTALLED_APPS = INSTALLED_APPS + [
#   'wagtail.contrib.styleguide',
# ]


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


# django_heroku.settings(locals())

# DEFAULT_FILE_STORAGE = 'core.storages.CustomS3Boto3Storage'

# AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
# AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')

# AWS_S3_FILE_OVERWRITE = False
# AWS_DEFAULT_ACL = None
# # https を有効にします
# AWS_S3_SECURE_URLS = True
# # 認証クエリーを無効にします
# AWS_QUERYSTRING_AUTH = False

try:
    from .local import *
except ImportError:
    pass
