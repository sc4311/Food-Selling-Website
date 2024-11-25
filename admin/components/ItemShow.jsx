import React from 'react';
import { Show, SimpleShowLayout, TextField, useResourceContext, NumberField, ImageField } from 'react-admin';

const ItemShow = (props) => {
    const resource = useResourceContext();

    const getResource = (resource) => {
        switch (resource) {
            case"main_courses":
            return(
                <SimpleShowLayout style={{ maxHeight: '90vw', overflow: 'hidden' }}>
                    <NumberField source = "main_id" label = "Item ID"/>
                    <TextField source = "main_name" label = "Name"/>
                    <TextField source = "main_description" label = "Description"/>
                    <NumberField source = "main_price" label = "Price"/>
                    <ImageField source="main_image" label="Site Image" />
                </SimpleShowLayout>
            );
            case"appetizers":
            return(
                <SimpleShowLayout>
                    <NumberField source = "appetizer_id" label = "Item ID"/>
                    <TextField source = "appetizer_name" label = "Name"/>
                    <TextField source = "appetizer_description" label = "Description"/>
                    <NumberField source = "appetizer_price" label = "Price"/>
                    <ImageField source="appetizer_image" label="Site Image" />
                </SimpleShowLayout>
            );
            case"salads":
            return(
                <SimpleShowLayout>
                    <NumberField source = "salad_id" label = "Item ID"/>
                    <TextField source = "salad_name" label = "Name"/>
                    <TextField source = "salad_description" label = "Description"/>
                    <NumberField source = "salad_price" label = "Price"/>
                    <ImageField source="salad_image" label="Site Image" />
                </SimpleShowLayout>
            );
            case"drinks":
            return(
                <SimpleShowLayout>
                    <NumberField source = "drink_id" label = "Item ID"/>
                    <TextField source = "drink_name" label = "Name"/>
                    <TextField source = "drink_description" label = "Description"/>
                    <NumberField source = "drink_price" label = "Price"/>
                    <ImageField source="drink_image" label="Site Image" />
                </SimpleShowLayout>
            );
            case"deserts":
            return(
                <SimpleShowLayout>
                    <NumberField source = "desert_id" label = "Item ID"/>
                    <TextField source = "desert_name" label = "Name"/>
                    <TextField source = "desert_description" label = "Description"/>
                    <NumberField source = "desert_price" label = "Price"/>
                    <ImageField source="desert_image" label="Site Image" />
                </SimpleShowLayout>
            );
            case"sides":
            return(
                <SimpleShowLayout>
                    <NumberField source = "side_id" label = "Item ID"/>
                    <TextField source = "side_name" label = "Name"/>
                    <TextField source = "side_description" label = "Description"/>
                    <NumberField source = "side_price" label = "Price"/>
                    <ImageField source="side_image" label="Site Image" />
                </SimpleShowLayout>
            );
            case "transactions":
            return(
                <SimpleShowLayout>
                    <NumberField source='order_id' label ='Id'/>
                    <NumberField source='order_fname' label ='First name'/>
                    <NumberField source='order_lname' label ='Last name'/>
                    <TextField source='order_date' label ='Date'/>
                    <NumberField source='order_total' label = "Total"/>
                    <TextField source='order_status' label = "Status"/>
                </SimpleShowLayout>
            );
            case"accounts":
            return(
                <SimpleShowLayout>
                    <NumberField source = "acc_id" label = "Account ID"/>
                    <TextField source = "acc_username" label = "Username"/>
                    <TextField source = "acc_email" label = "Email"/>
                    <TextField source = "acc_address" label = "Address"/>
                    <TextField source = "role" label = "Role"/>
                </SimpleShowLayout>
            );
        }
    };
return (
    <Show {...props}>
        <SimpleShowLayout>
            {getResource(resource)}
        </SimpleShowLayout>
    </Show>
    );
};

export default ItemShow;
