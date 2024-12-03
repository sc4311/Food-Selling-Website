import React, { useState } from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput, useResourceContext, useNotify, useRefresh, useUpdate, useRedirect } from 'react-admin';

const ItemEdit = (props) => {
    const resource = useResourceContext();
    const notify = useNotify();
    const redirect = useRedirect();
    const [updatedData, setUpdatedData] = useState(null);
    const [update] = useUpdate();

    const handleSave = async (data) => {
        try {
            await update(resource, { id: data.id, data });
            setUpdatedData(data);
            notify('Item updated successfully', 'info');
            redirect(`/${resource}`);
        } catch (error) {
            notify('Error updating item', 'error');
        }
    };

    const getResource = (resource) => {
        switch (resource) {
            case "main_courses":
                return (
                    <>
                        <TextInput source="main_name" label="Name" fullWidth />
                        <NumberInput source="main_price" label="Price" fullWidth />
                        <TextInput source="main_description" label="Description" multiline fullWidth />
                    </>
                );
            case "appetizers":
                return (
                    <>
                        <TextInput source='appetizer_name' label="Name" fullWidth />
                        <NumberInput source='appetizer_price' label="Price" fullWidth />
                        <TextInput source='appetizer_description' label="Description" multiline fullWidth />
                    </>
                );
            case "desserts":
                return (
                    <>
                        <TextInput source='dessert_name' label="Name" fullWidth />
                        <NumberInput source='dessert_price' label="Price" fullWidth />
                        <TextInput source='dessert_description' label="Description" multiline fullWidth />
                    </>
                );
            case "drinks":
                return (
                    <>
                        <TextInput source='drink_name' label="Name" fullWidth />
                        <NumberInput source='drink_price' label="Price" fullWidth />
                        <TextInput source='drink_description' label="Description" multiline fullWidth />
                    </>
                );
            case "sides":
                return (
                    <>
                        <TextInput source='side_name' label="Name" fullWidth />
                        <NumberInput source='side_price' label="Price" fullWidth />
                        <TextInput source='side_description' label="Description" multiline fullWidth />
                    </>
                );
            case "salads":
                return (
                    <>
                        <TextInput source="salad_name" label="Salad Name" fullWidth />
                        <NumberInput source='salad_price' label='Price' fullWidth />
                        <TextInput source="salad_description" label="Description" multiline fullWidth />
                    </>
                );
            case "accounts":
                return (
                    <>
                        <TextInput source="acc_username" label="Username" fullWidth />
                        <TextInput source="acc_email" label="Email" multiline fullWidth />
                        <TextInput source="acc_address" label="Address" multiline fullWidth />
                        <TextInput source="acc_postal" label="Zip code" multiline fullWidth />
                        <TextInput source="acc_city" label="City" multiline fullWidth />
                        <SelectInput source="role" label="Role" choices={[
                            { id: 'admin', name: 'Admin' },
                            { id: 'user', name: 'User' }
                        ]} emptyText="Select a role" />
                    </>
                );
            case "transactions":
                return (
                    <>
                        <TextInput source="order_name" label="Fist name" multiline fullWidth />
                        <NumberInput source="order_total" label="Total" fullWidth />
                        <SelectInput source="order_status" label="Status" choices={[
                            { id: 'in_progress', name: 'In Progress' },
                            { id: 'complete', name: 'Complete' }
                        ]} emptyText="Select status" />
                    </>
                );
                case "discount_codes":
                    return (
                        <>
                            <TextInput source="discount_code" label="Code" fullWidth />
                            <NumberInput source='discount_amount' label='Amount' fullWidth />
                        </>
                    );
            default:
                return null;
        }
    };

    return (
        <Edit {...props}>
            <SimpleForm onSubmit={handleSave} sx={{ width: '60%', margin: '0 auto' }}>
                {getResource(resource)}
            </SimpleForm>
        </Edit>
    );
};

export default ItemEdit;

