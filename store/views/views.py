from django.contrib import messages
from django.shortcuts import render, redirect #, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.mixins import LoginRequiredMixin #, UserPassesTestMixin
from django.views.generic import View

from ..models import Order
from ..forms import CheckoutForm, BillingAddressForm, ItemOptionForm
from core.boost import DynamicRedirectMixin
from users.models import ShippingAddress, BillingAddress

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

        except objectdoesnotexist:
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
