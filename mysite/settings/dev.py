from .base import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['store7.shop', 'store7.herokuapp.com', 'www.store7.shop', '127.0.0.1', 'localhost']

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASS')

RECAPTCHA_PUBLIC_KEY="6LfG4PoaAAAAAKTa2j8IXOYaCHqA7WduZzu3o_uR"
RECAPTCHA_PRIVATE_KEY="6LfG4PoaAAAAAHjEoKbsC92G2c7zQpPXwZgP5ZqJ"

INSTALLED_APPS = INSTALLED_APPS + [
  'wagtail.contrib.styleguide',
]

try:
    from .local import *
except ImportError:
    pass
