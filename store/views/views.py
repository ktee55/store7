from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import View, ListView
from django.contrib.auth.decorators import permission_required

from taggit.models import Tag

from ..models import Order, ItemDetailPage, ItemCategory, ItemParentCategory, OrderInfo
from ..forms import CheckoutForm, BillingAddressForm, ItemOptionForm
from core.boost import DynamicRedirectMixin
from users.models import ShippingAddress, BillingAddress
from core.views import paginate


class CategoryItemListView(ListView):
    model = ItemDetailPage
    template_name = 'store/item_listing_page.html'
    context_object_name = 'items'
    paginate_by = 4

    def get_queryset(self):
      # try:
      #     category = ItemCategory.objects.get(slug=self.kwargs.get('cat_slug'))
      # except Exception:
      #     messages.error(self.request, "指定されたカテゴリーは存在しませんでした。")
      #     return redirect('/blog/')
      category = get_object_or_404(ItemCategory, slug=self.kwargs.get('cat_slug'))
      
      # return ItemDetailPage.objects.live().public().order_by('-first_published_at').filter(categories__in=[category])
      return category.items.live().public().order_by('-first_published_at')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category"] = get_object_or_404(ItemCategory, slug=self.kwargs.get('cat_slug'))

        return context


class TagItemListView(ListView):
    model = ItemDetailPage
    template_name = 'store/item_listing_page.html'
    context_object_name = 'items'
    paginate_by = 4

    def get_queryset(self):
      # try:
      #     tag = Tag.objects.get(slug=self.kwargs.get('tag_slug'))
      # except Exception:
      #     messages.error(self.request, "指定されたタグは存在しませんでした。")
      #     return redirect('/items/')
      tag = get_object_or_404(Tag, slug=self.kwargs.get('tag_slug'))
      
      return ItemDetailPage.objects.live().public().order_by('-first_published_at').filter(tags__in=[tag])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tag"] = get_object_or_404(Tag, slug=self.kwargs.get('tag_slug'))

        return context


class CartView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            context = {
                'order': order,
            }
            return render(self.request, 'store/shopping-cart.html', context)
        except ObjectDoesNotExist:
            # messages.error(self.request, "ショッピングカートに商品はありません")
            return render(self.request, 'store/shopping-cart.html')


class CheckoutView(LoginRequiredMixin, View):

    def get(self, *args, **kwargs):
        form = CheckoutForm()
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
        except ObjectDoesNotExist:
            return redirect("store:shopping-cart")

        context = {
            'form': form,
            'order': order,
            'primary_shipping_address': ShippingAddress.objects.filter(user=self.request.user, primary=True).first()
        }
        return render(self.request, "checkout/checkout.html", context)

    def post(self, *args, **kwargs):
        form = CheckoutForm(self.request.POST or None)
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)

            if form.is_valid():
                delivery_time = form.cleaned_data.get('delivery_time')
                payment_option = form.cleaned_data.get('payment_option')

                shipping_addresses = self.request.user.shipping_addresses.all()
                order.shipping_address = shipping_addresses.filter(
                    primary=True).first()

                order.delivery_time = delivery_time
                order.payment_option = payment_option

                order.save()

                if payment_option == 'C':
                    return redirect('store:billing-address')
                elif payment_option == 'B':
                    return redirect("store:order-summary")
                else:
                    messages.warning(
                        self.request, "Invalid payment option selected")
                    return redirect('store:checkout')

            messages.warning(self.request, "Something was wrong on the form")
            return redirect('store:checkout')

        except ObjectDoesNotExist:
            # messages.error(self.request, "You do not have an active order")
            return redirect("store:shopping-cart")


class BillingAddressView(LoginRequiredMixin, View):

    def get(self, *args, **kwargs):
        form = BillingAddressForm()
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)

            if not order.shipping_address:
                messages.error(
                    self.request, "Please provide your shipping address first.")
                return redirect("store:checkout")

        except ObjectDoesNotExist:
            return redirect("store:shopping-cart")

        context = {
            'form': form,
            'order': order,
            'first_billing_address': BillingAddress.objects.filter(user=self.request.user).first(),
            'primary_billing_address': BillingAddress.objects.filter(user=self.request.user, primary=True).first()
        }
        return render(self.request, "checkout/billing-address.html", context)

    def post(self, *args, **kwargs):
        form = BillingAddressForm(self.request.POST or None)
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)

            if form.is_valid():
                billing_address_option = form.cleaned_data.get(
                    'billing_address_option')

                if billing_address_option == 'A':

                    billing_addresses = self.request.user.billing_addresses.all()
                    order.billing_address = billing_addresses.filter(
                        primary=True).first()

                elif billing_address_option == 'B':
                    already_stored_billing_address = BillingAddress.objects.filter(
                        street_address=order.shipping_address.street_address,
                        city=order.shipping_address.city,
                        state=order.shipping_address.state,
                        zip=order.shipping_address.zip
                    )
                    if already_stored_billing_address:
                        billing_address = already_stored_billing_address
                    else:
                        billing_address = BillingAddress(
                            user=self.request.user,
                            street_address=order.shipping_address.street_address,
                            city=order.shipping_address.city,
                            state=order.shipping_address.state,
                            zip=order.shipping_address.zip,
                        )

                        billing_addresses = self.request.user.billing_addresses.all()
                        for stored_billing_address in billing_addresses:
                            stored_billing_address.primary = False
                            stored_billing_address.save()
                        billing_address.primary = True

                        billing_address.save()
                        order.billing_address = billing_address

                else:
                    messages.warning(
                        self.request, "ラジオボックスをひとつご選択ください。")
                    return redirect('store:billing-address')

                order.save()
                return redirect("store:order-summary")

            messages.warning(
                self.request, "ラジオボックスをひとつご選択ください。")
            return redirect('store:billing-address')

        except ObjectDoesNotExist:
            return redirect("store:shopping-cart")


class OrderSummaryView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            context = {
                'order': order
            }
            if not order.shipping_address or not order.payment_option:
                messages.warning(
                    self.request, "必要な情報をすべて入力し直してください。")
                # Where should they go back? shopping cart? checkout?
                # return render(self.request, 'checkout/order-summary.html', context)
            return render(self.request, 'checkout/order-summary.html', context)
            # else:
            #     messages.error(
            #         self.request, "Please Provide All Information We need.")
            #     return render(self.request, 'checkout/order-summary.html')

        except ObjectDoesNotExist:
            messages.error(self.request, "カートに何も入ってません。")
            return render(self.request, 'checkout/order-summary.html')


@permission_required('is_staff')
def order_list(request):
  
  all_orders = Order.objects.filter(ordered=True).order_by('-ordered_date')
  if OrderInfo.objects.first():
    pagination = OrderInfo.objects.first().order_list_paginate_by
  else:
    pagination = 5

  context = {
    'orders': paginate(request, all_orders, pagination),
    'list_for_staff': 1,
  }
  return render(request, 'store/order-list.html', context)


# class OrderListView(LoginRequiredMixin, UserPassesTestMixin, ListView):

#     model = Order
#     template_name = 'store/order-list.html'
#     context_object_name = 'orders'
#     paginate_by = 5

#     def get_queryset(self):
#         return Order.objects.filter(ordered=True).order_by('-ordered_date')

#     # ユーザーがスタッフの時にのみ許可
#     def test_func(self):
#         if self.request.user.is_staff:
#             return True
#         return False

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context["list_for_staff"] = 1
#         return context


