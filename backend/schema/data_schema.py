from flask_marshmallow import Marshmallow,fields
from marshmallow import validate,fields
from ..database.data_modal import Order, Item, products

ma = Marshmallow()

class getSchema(ma.Schema):

    orderNo = fields.Str(required=True)

class customerSchema(ma.Schema):

    customer = fields.Str(required=True)
    
class dateSchema(ma.Schema):

    date = fields.Date(required=True,format='%d-%m-%Y')

class iSchema(ma.Schema):

    orderItemCode = fields.Str(required=True)
    description = fields.Str(required=True)
    quantity = fields.Str(required=True)

class Schema(ma.Schema):

    #orderItemCode = fields.Str(required=True)
    #description = fields.Str(required=True)
    #quantity = fields.Str(required=True)
    item = fields.Dict(key=fields.Str(), values=fields.Nested(iSchema))
    customer = fields.Str(required=True)
    address = fields.Str(required=True)
    date = fields.Date(required=True,format='%d-%m-%Y')
    time = fields.Time(required=True,format='%H:%M')
    
class rSchema(ma.Schema):

    orderNo = fields.Int(required=True)
    item = fields.Dict(key=fields.Str(), values=fields.Nested(iSchema))
    totalPrice = fields.Str(required=True)
    customer = fields.Str(required=True)
    address = fields.Str(required=True)
    date = fields.Date(required=True,format='%d-%m-%Y')
    time = fields.Time(required=True,format='%H:%M')

class updateSchema(ma.Schema):

    orderNo = fields.Int(required=True)
    item = fields.Dict(key=fields.Str(), values=fields.Nested(iSchema))
    customer = fields.Str(required=True)
    address = fields.Str(required=True)
    date = fields.Date(required=True,format='%d-%m-%Y')
    time = fields.Time(required=True,format='%H:%M')

class orderSchema(ma.Schema):

    orderNo = fields.Int(required=True)
    customer = fields.Str(required=True)
    address = fields.Str(required=True)
    date = fields.Date(required=True,format='%d-%m-%Y')
    time = fields.Time(required=True,format='%H:%M')

class itemsSchema(ma.Schema):

    orderNo = fields.Int(required=True)
    description = fields.Str(required=True)
    productid = fields.Str(required=False)
    quantity = fields.Int(required=True)
        
class productsSchema(ma.Schema):

    orderItemCode = fields.Int(required=True)
    description = fields.Str(required=True)
    price = fields.Int(required=True)