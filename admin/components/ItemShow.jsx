import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, useResourceContext, NumberField, ImageField } from 'react-admin';

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
            case"desserts":
            return(
                <SimpleShowLayout>
                    <NumberField source = "dessert_id" label = "Item ID"/>
                    <TextField source = "dessert_name" label = "Name"/>
                    <TextField source = "dessert_description" label = "Description"/>
                    <NumberField source = "dessert_price" label = "Price"/>
                    <ImageField source="dessert_image" label="Site Image" />
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
                    <NumberField source='order_name' label ='name'/>
                    <DateField source='order_date' label ='Date'/>
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
                    <TextField source = "acc_postal" label = "Zip code"/>
                    <TextField source = "acc_city" label = "City"/>
                    <TextField source = "role" label = "Role"/>
                </SimpleShowLayout>
            );
            case"discount_codes":
            return(
                <SimpleShowLayout>
                    <NumberField source="discount_id" label = "Code ID"/>
                    <TextField source= 'discount_code' label= 'Code'/>
                    <NumberField source = 'discount_amount' label = 'Amount'/>

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
