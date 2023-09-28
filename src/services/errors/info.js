
export const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    
  *title: needs to be a String, received ${product.title}
    
  *type: needs to be a String, received ${product.type}
  
  *required: needs to be a Boolean, received ${product.required}
  
  *description: needs to be a String, received ${product.description}
  
  *code: needs to be a String, received ${product.code}
  
  *category: needs to be a String, received ${product.category}
  
  *price: needs to be a Number, received ${product.price}
  
  *stock: needs to be a Number between 1 and 100, received ${product.stock}`;
};
