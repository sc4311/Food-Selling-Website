import React from "react";
import {
  Admin,
  Resource,
} from "react-admin";
import { Layout } from "./Layout.tsx";
import { dataProvider } from "./dataProvider.js";
import { authProvider } from "./authProvider.ts";
import {  
  MealList, 
  AppetizersList, 
  SaladList, 
  SideList, 
  DrinkList, 
  AccountList, 
  OrderList,
  DiscountList
} from "./components/ListComponets.jsx";
import ItemEdit from "./components/ItemEdit";
import ItemShow from "./components/ItemShow.jsx";
import ItemCreate from "./components/ItemCreate.jsx"

export const AdminApp = () => (
  
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    >
    <Resource
      name="main_courses"
      list={MealList}
      edit={ItemEdit}
      show={ItemShow}
      create={ItemCreate}
    />
    <Resource
      name="appetizers"
      list={AppetizersList}
      edit={ItemEdit}
      show={ItemShow}
      create={ItemCreate}
    />
    <Resource
      name="salads"
      list={SaladList}
      edit={ItemEdit}
      show={ItemShow}
      create={ItemCreate}
    />
    <Resource
      name="drinks"
      list={DrinkList}
      edit={ItemEdit}
      show={ItemShow}
      create={ItemCreate}
    />
    <Resource
      name="sides"
      list={SideList}
      edit={ItemEdit}
      show={ItemShow}
      create={ItemCreate}
    />
    <Resource
      name="transactions"
      list={OrderList}
      edit={ItemEdit}
      show={ItemShow}
    />
    <Resource
      name ="accounts"
      list = {AccountList}
      edit = {ItemEdit}
      show = {ItemShow}
    />
    <Resource
      name ="discount_codes"
      list = {DiscountList}
      edit = {ItemEdit}
      show = {ItemShow}
      create={ItemCreate}
    />
  </Admin>
);

export default AdminApp;