import React from 'react';
import {SimpleForm, TextInput, NumberInput, SelectInput, useResourceContext, Create } from 'react-admin';

const ItemCreate = (props) => {
const resource = useResourceContext();

const getResource = (resource) => {
    switch (resource) {
            case "main_courses":
                return (
                <>
                    <NumberInput source='main_id' label="ID" fullWidth/>
                    <TextInput source="main_name" label="Name" fullWidth />
                    <TextInput source='main_description' label="Description" multiline fullWidth />
                    <NumberInput source='main_price' label="Price" fullWidth />
                    
                </>
                );

            case "appetizers":
                return (
                <>
                    <NumberInput source='appetizer_id' label="ID" fullWidth/>
                    <TextInput source='appetizer_name' label="Name" fullWidth/>
                    <TextInput source='appetizer_description' label="Description" multiline fullWidth/>
                    <NumberInput source='appetizer_price' label="Price" fullWidth/>
                    <TextInput source='appetizer_image' label="Image link" fullWidth/>
                </>
                );

            case "desserts":
                return (
                <>
                    <NumberInput source='dessert_id' label="ID" fullWidth/>
                    <TextInput source='dessert_name' label="Name" fullWidth/>
                    <TextInput source='dessert_description' label="Description" multiline fullWidth/>
                    <NumberInput source='dessert_price' label="Price" fullWidth/>
                    <TextInput source='dessert_image' label="Image link" fullWidth/>
                </>
                );

            case "drinks":
                return (
                <>
                    <NumberInput source='drink_id' label="ID" fullWidth/>
                    <TextInput source='drink_name' label="Name" fullWidth/>
                    <NumberInput source='drink_price' label="Price" fullWidth/>
                    <TextInput source='drink_description' label="Description" multiline fullWidth/>
                    <TextInput source='drink_image' label="Image link" fullWidth/>
                </>
                );
            
            case "sides":
                return (
                <>
                    <NumberInput source='side_id' label="ID" fullWidth/>
                    <TextInput source='side_name' label="Name" fullWidth/>
                    <TextInput source='side_description' label="Description" multiline fullWidth/>
                    <NumberInput source='side_price' label="Price" fullWidth/>
                    <TextInput source='side_image' label="Image link" fullWidth/>
                </>
                );
                
            case "salads":
                return (
                <>
                    <NumberInput source='salad_id' label="ID" fullWidth/>                    
                    <TextInput source="salad_name" label="Salad Name" fullWidth />
                    <TextInput source="salad_description" label="Description" multiline fullWidth />
                    <NumberInput source='salad_price' label='Price' fullWidth />
                    <TextInput source='salad_image' label="Image link" fullWidth/>
                </>
                );
            
            case "accounts":
                return (
                <>
                    <NumberInput source='acc_id' label="ID" fullWidth/>                   
                    <TextInput source="acc_username" label="Username" fullWidth />
                    <TextInput source="acc_email" label="Description" multiline fullWidth />
                    <NumberInput source="acc_id" label="Price" fullWidth />
                    <SelectInput source="role" label="Role" choices={[
                    { id: 'admin', name: 'admin' },
                    { id: 'user', name: 'user' }
                    ]} 
                    emptyText="Select a role" />
                </>
                );
            
            case "transactions":
                return (
                <>
                    <NumberInput source='transaction_id' label="ID" fullWidth/>
                    <TextInput source="order_date" label="Date" multiline fullWidth />
                    <NumberInput source="order_total" label="Total" fullWidth />
                    <SelectInput source="order_status" label="Role" choices={[
                    { id: 'in_progress', name: 'In-Progress ' },
                    { id: 'complete', name: 'Complete' }
                    ]} 
                    emptyText="Select order status" />
                </>
                );
                case "discount_codes":
                    return (
                        <>
                            <NumberInput source = 'discount_id' label = "Id"/>
                            <TextInput source="discount_code" label="Code" fullWidth />
                            <NumberInput source='discount_amount' label='Amount' fullWidth />
                        </>
                    );
        default:
            return null;
    }
};

return (
    <Create {...props}>
        <SimpleForm sx={{ width: '60%', margin: '0 auto' }}>
            {getResource(resource)}
        </SimpleForm>
    </Create>
  );
};

export default ItemCreate;