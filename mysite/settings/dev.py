from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '9cew9-er$h6f*+5y44j&@dbtgkzcz3z2v)q0$^h5cual@nn#&i'

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*'] 

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

INSTALLED_APPS = INSTALLED_APPS + [
  'wagtail.contrib.styleguide',
]

try:
    from .local import *
except ImportError:
    pass
