from django.urls import path

from .models import ItemDetailPage
from .views import *


app_name = 'store'


urlpatterns = [
  path('shopping-cart/', CartView.as_view(), name='shopping-cart'),
  path('checkout/', CheckoutView.as_view(), name='checkout'),
  path('billing-address/', BillingAddressView.as_view(), name='billing-address'),
  path('order-summary/', OrderSummaryView.as_view(), name='order-summary'),
  path('payment/<payment_option>/', PaymentView.as_view(), name='payment'),

  path('add-to-cart/<int:pk>/', add_to_cart, name='add-to-cart'),
  path('add-single-item-to-cart/<int:pk>/',
        add_single_item_to_cart, name='add-single-item-to-cart'),
  path('remove-from-cart/<int:pk>/', remove_from_cart, name='remove-from-cart'),
  path('remove-single-item-from-cart/<int:pk>/',
        remove_single_item_from_cart, name='remove-single-item-from-cart'),
  path('add-to-fav-items/<int:pk>', add_to_fav_items, name='add-to-fav-items'),
  path('remove-from-fav-items/<int:pk>',
        remove_from_fav_items, name='remove-from-fav-items'),

  path('confirm-order/', confirm_order, name='confirm-order'),
  path('order-dispatched/<int:pk>', order_dispatched, name='order-dispatched'),
]