import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from "@material-ui/core/Typography";

import { Input, Form, PrimaryButton } from '../../components';
import { useQuery } from '../../hooks';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    quantity: yup
        .number('Must be a number')
        .min(1)
        .max(3)
        .required('Quantity is a required field'),
    firstName: yup
      .string()
      .matches(/^([^0-9]*)$/, "First name should not contain numbers")
      .required("First name is a required field"),
    lastName: yup
      .string()
      .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
      .required("Last name is a required field"),
    email: yup
      .string()
      .email('Email should have correct format')
      .required("Email is a required field"),
    street1: yup
      .string()
      .required("Address Line 1 is a required field"),
    street2: yup
      .string(),
    city: yup
      .string()
      .required("City is a required field"),
    state: yup
      .string()
      .required("State is a required field"),
    zip: yup
      .string()
      .max(5)
      .required("Zipcode is a required field"),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required("Phone Number is a required field"),
    ccNum: yup
      .string()
      .min(15)
      .max(16)
      .required("Credit card number is a required field"),
    exp: yup
      .string()
      .min(4)
      .max(4)
      .required("Exp date is a required field"),
  });

// TODO: Dynamically set URL base
const productURL = 'http://localhost:3001/api/products/1';
const orderURL = 'http://localhost:3001/api/magic/';

export const Order = () => {
    const { register, handleSubmit, errors, reset } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const formatData = (data, productId) => {
        const {
            quantity,
            firstName,
            lastName,
            email,
            street1,
            street2,
            city,
            state,
            zip,
            phone,
            ccNum,
            exp
        } = data;
        const formatted = {
            quantity,
            firstName,
            lastName,
            email,
            address: {
                street1,
                street2,
                city,
                state,
                zip,
            },
            payment: {
                ccNum,
                exp
            },
            phone,
            productId,
        };
        return formatted;
    }

    const { apiData } = useQuery(productURL);
    const { name, price, description, maxPurchase } = apiData;
    const onSubmit = async (data) => {
        // TODO: Properly handle 'notification' for success and errors
        try {
            const formattedData = formatData(data, apiData.id);
            const res = await axios.post(orderURL, formattedData);
            // reset();
            alert(res.data.message);
            console.log(res.data.message);
        } catch (err) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }
    }
    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* TODO: Separate product into separate component */}
                <div className="product">
                    <Typography component="h2" variant="h5">{name}</Typography>
                    <Typography component="p" variant="body1">{description}</Typography>
                    <Input
                        ref={register}
                        id="quantity"
                        type="number"
                        label="Quantity"
                        name="quantity"
                        error={!!errors.quantity}
                        helperText={errors?.quantity?.message}
                    >
                    </Input>
                    <Typography component="p" variant="body1">Price: {price}</Typography>
                </div>
                <Input
                    ref={register}
                    id="firstName"
                    type="text"
                    label="First Name"
                    name="firstName"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                <Input
                    ref={register}
                    id="lastName"
                    type="text"
                    label="Last Name"
                    name="lastName"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <Input
                    ref={register}
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />
                <Input
                    ref={register}
                    id="street1"
                    type="text"
                    label="Address Line 1"
                    name="street1"
                    error={!!errors.street1}
                    helperText={errors?.street1?.message}
                />
                <Input
                    ref={register}
                    id="street2"
                    type="text"
                    label="Address Line 2"
                    name="street2"
                    error={!!errors.street2}
                    helperText={errors?.street2?.message}
                />
                <Input
                    ref={register}
                    id="city"
                    type="text"
                    label="City"
                    name="city"
                    error={!!errors.city}
                    helperText={errors?.city?.message}
                />
                <Input
                    ref={register}
                    id="state"
                    type="text"
                    label="State"
                    name="state"
                    error={!!errors.state}
                    helperText={errors?.state?.message}
                />
                <Input
                    ref={register}
                    id="zip"
                    type="text"
                    label="Zipcode"
                    name="zip"
                    error={!!errors.zip}
                    helperText={errors?.zip?.message}
                />
                <Input
                    ref={register}
                    id="phone"
                    type="text"
                    label="Phone Number"
                    name="phone"
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                />
                <Input
                    ref={register}
                    id="ccNum"
                    type="text"
                    label="Credit Card Number"
                    name="ccNum"
                    error={!!errors.ccNum}
                    helperText={errors?.ccNum?.message}
                />
                <Input
                    ref={register}
                    id="exp"
                    type="text"
                    label="Exp"
                    name="exp"
                    error={!!errors.exp}
                    helperText={errors?.exp?.message}
                />
                <PrimaryButton>
                    Submit
                </PrimaryButton>
            </Form>
        </div>
    )
};