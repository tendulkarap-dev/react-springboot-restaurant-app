package com.sachein.service;

import com.sachein.model.Order;
import com.sachein.response.PaymentResponse;
import com.stripe.exception.StripeException;


public interface PaymentService{

    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
