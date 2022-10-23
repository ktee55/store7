from .base import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['store7.club', 'store7.shop', 'store7.herokuapp.com', 'www.store7.club', 'www.store7.shop', '127.0.0.1', 'localhost']

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASS')

RECAPTCHA_PUBLIC_KEY="6LedAKQiAAAAAGD5gmNhe8wGzmQpP65LzKSBPeNm"
RECAPTCHA_PRIVATE_KEY="6LedAKQiAAAAAPt64Z_jTn6QByKVk7u0caP-SpY0"
# Recaptcha settings
# RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
# RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')

INSTALLED_APPS = INSTALLED_APPS + [
  'wagtail.contrib.styleguide',
]

try:
    from .local import *
except ImportError:
    pass
