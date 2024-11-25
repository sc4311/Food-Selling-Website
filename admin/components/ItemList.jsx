import React from 'react';
import { List, Datagrid, TextField, NumberField } from 'react-admin';

const ItemList = ({ resource, fields, ...props }) => {
  return (
    <List resource={resource} {...props}>
      <Datagrid>
        {fields.map((field) => {
          switch (field.type) {
            case 'number':
              return <NumberField key={field.source} source={field.source} label={field.label} />;
            case 'text':
            default:
              return <TextField key={field.source} source={field.source} label={field.label} />;
          }
        })}
      </Datagrid>
    </List>
  );
};

export default ItemList;

