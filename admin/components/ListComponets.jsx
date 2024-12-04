import React from 'react';
import ItemList from './ItemList';

const mainCourseFields = [
  { source: 'main_id', label: 'Item ID', type: 'number' },
  { source: 'main_name', label: 'Name', type: 'text' },
  { source: 'main_description', label: 'Description', type: 'text' },
  { source: 'main_price', label: 'Price', type: 'number' },
];

const appetizerFields = [
  { source: 'appetizer_id', label: 'Item ID', type: 'number' },
  { source: 'appetizer_name', label: 'Name', type: 'text' },
  { source: 'appetizer_description', label: 'Description', type: 'text' },
  { source: 'appetizer_price', label: 'Price', type: 'number' },
];

const saladFields = [
  { source: 'salad_id', label: 'Item ID', type: 'number' },
  { source: 'salad_name', label: 'Name', type: 'text' },
  { source: 'salad_description', label: 'Description', type: 'text' },
  { source: 'salad_price', label: 'Price', type: 'number' },
];

const sideFields = [
  { source: 'side_id', label: 'Item ID', type: 'number' },
  { source: 'side_name', label: 'Name', type: 'text' },
  { source: 'side_description', label: 'Description', type: 'text' },
  { source: 'side_price', label: 'Price', type: 'number' },
];

const dessertFields = [
  { source: 'dessert_id', label: 'Item ID', type: 'number' },
  { source: 'dessert_name', label: 'Name', type: 'text' },
  { source: 'dessert_description', label: 'Description', type: 'text' },
  { source: 'dessert_price', label: 'Price', type: 'number' },
];

const drinkFields = [
  { source: 'drink_id', label: 'Item ID', type: 'number' },
  { source: 'drink_name', label: 'Name', type: 'text' },
  { source: 'drink_description', label: 'Description', type: 'text' },
  { source: 'drink_price', label: 'Price', type: 'number' },
];

const accountFields = [
  { source: 'acc_id', label: 'ID', type: 'number' },
  { source: 'acc_username', label: 'Username', type: 'text' },
  { source: 'acc_email', label: 'Email', type: 'text' },
  { source: 'acc_address', label: 'Address', type: 'text' },
];

const transactionFields = [
  { source: 'order_id', label: 'ID', type: 'text'},
  { source: 'order_name', label: 'Name', type: 'text'},
  { source: 'order_date', label: 'Date', type: 'date'},
  { source: 'order_total', label: 'Total', type: 'number'},
  { source: 'order_status', label: 'Status', type: 'text'}
];

const discountFields = [
  { source: 'discount_id', label: 'ID', type: 'number' },
  { source: 'discount_code', label: 'Code', type: 'text' },
  { source: 'discount_amount', label: 'Amount', type: 'number' },
];

const MealList = (props) => (
  <ItemList resource="main_courses" fields={mainCourseFields} {...props} />
);

const AppetizersList = (props) => (
  <ItemList resource="appetizers" fields={appetizerFields} {...props} />
);

const SaladList = (props) => (
  <ItemList resource="salads" fields={saladFields} {...props}/>
);

const SideList = (props) => (
  <ItemList resource="sides" fields={sideFields} {...props}/>
);

const DessertList = (props) =>(
  <ItemList resource="desserts" fields={dessertFields} {...props}/>
);

const DrinkList = (props) => (
  <ItemList resource="drinks" fields={drinkFields} {...props}/>
);

const AccountList = (props) => (
  <ItemList resource="accounts" fields={accountFields} {...props}/>
);

const OrderList = (props) => (
  <ItemList resource="transactions" fields={transactionFields} {...props}/>
);

const DiscountList = (props) => (
  <ItemList resource="discount_codes" fields={discountFields} {...props}/>
);

export { MealList, AppetizersList, SaladList, SideList, DessertList, DrinkList, AccountList, OrderList, DiscountList };
