# from django.contrib.staticfiles.templatetags.staticfiles import static
### The place has been changed ###
from django.templatetags.static import static
from django.utils.html import format_html
# from django.urls import reverse
# from django.utils.translation import gettext_lazy as _

from wagtail.core import hooks
# from wagtail.admin.wagtail_hooks import ExplorerMenuItem

@hooks.register("insert_global_admin_css", order=100)
def global_admin_css():
    """Add /static/css/custom-admin.css to the admin."""
    return format_html(
        '<link rel="stylesheet" href="{}">',
        static("css/custom-admin.css")
    )


@hooks.register("insert_global_admin_js", order=100)
def global_admin_js():
    """Add /static/css/custom.js to the admin."""
    return format_html(
        '<script src="{}"></script>',
        static("/js/custom.js")
    )


# @hooks.register('register_admin_menu_item')
# def register_explorer_menu_item():
#     return ExplorerMenuItem(
#         _('Explorer'), reverse('wagtailadmin_explore_root'),
#         name='explorer',
#         icon_name='folder-open-inverse',
#         order=100)

