import React from 'react';
import { useQuery } from '../../hooks';
import { useForm } from "react-hook-form";

import { Input } from '../../components';

// TODO: Dynamically set URL base
const productURL = 'http://localhost:3001/api/products/1';
export const Product = () => {
    const { register, handleSubmit, errors } = useForm({});
    const { apiData } = useQuery(productURL);
    const { name, price, quantity, id, description } = apiData;
    console.log(apiData);
    return (
        <div className="product">
            <h1>{name}</h1>
            <p>{description}</p>
            <Input
                ref={register}
                id="quantity"
                type="number"
                label="Quantity"
                name="quantity"
            >
            </Input>
            <span>Price: {price * quantity}</span>
        </div>
    )
}