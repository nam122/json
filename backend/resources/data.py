from flask_restful import Resource, request
from ..schema.data_schema import getSchema, customerSchema, Schema, rSchema, updateSchema, orderSchema, itemsSchema, productsSchema
from ..database.data_modal import Order, Item, products

getschema = getSchema(many=False)
customerschema = customerSchema(many=False)
schema = Schema(many=False)
rschema = rSchema(many=False)
updateschema = updateSchema(many=False)
orderschema = orderSchema(many=False)
itemsschema = itemsSchema(many=False)
productsschema = productsSchema(many=False)

class tools:
    
    def get_param(self):

        data = request.get_json(force=False)
        if data is None:
            data = request.form
        return data

    def checkproduct(self, productCode):

        product = products.get(productCode)
        price = product["price"]

        return price
    
    def total(self,getlist):
        
        totalPrice = 0
        i = 0
        
        for k,v in getlist.items():

            pricePerItem = float(self.checkproduct(v["orderItemCode"]))
            
            if pricePerItem != "":
                totalPrice = totalPrice+(pricePerItem * int(v["quantity"]))
            else:
                return {
                        "message": "order item not exist!",
                        "item" : v['name']
                    }, 404
                
            i = i+1
        return float(totalPrice)

tools = tools()

#supermarket submit order
class Data(Resource):

    #add order
    def post(self):
        result = schema.load(tools.get_param())
        
        totalPrice = tools.total(result['item'])

        try:

            insertorderdata = Order(
            result['customer'],
            result['address'],
            result['date'],
            result['time']
            )

            itemid = insertorderdata.insert()

            try:
                for k,v in result['item'].items():

                    insertitemdata = Item(
                    int(itemid),
                    int(v['orderItemCode']),
                    int(v['quantity'])
                    )
                            
                    insertitemdata.insert()
            except:
                return{'error':'error'}
            
            data = {
                "orderNo": str(itemid),
                "item": result['item'],
                "totalPrice": totalPrice,
                "customer": result["customer"],
                "address": result["address"],
                "date": result["date"],
                "time": result["time"]
            }

            return {
                "message": "Insert data success",
                "data": rschema.dump(data)
            }
        except:
            return {
                "message": "Insert data error",
                "data": schema.dump(result)
            }

#supermarket get product data and order information
class customerData(Resource):
    
    #getall order
    def get(self):

        allorder = Order.getall()

        data = {}

        i = 0

        for e in allorder:
            data[i] = rschema.dump(e)
            i = i + 1

        return {
            "data": data
        }

    # get all order by customer
    def post(self):

        data = {}
        result = schema.load(tools.get_param())
        allorder = Order.getall()

        i = 0

        for e in allorder:
            if e['customer'] == result['customer']:
                data[i] = rschema.dump(e)
                i = i + 1

        return {
            "data": data
        }

class getData(Resource):

    #getall order
    def get(self):

        allorder = Order.getall()

        data = {}

        i = 0

        for e in allorder:
            data[i] = rschema.dump(e)
            i = i + 1

        return {
            "data": data
        }

    #get single order
    def post(self):

        result = getschema.load(tools.get_param())
        allorder = Order.getall()

        find = None

        i = 0

        for e in allorder:

            if str(e["orderNo"]) == result["orderNo"]:
                find = e
            else:
                i = i + 1

        if find == None:
            return {
                       "message": "orderNo not exist!"
                   }, 403
        else:
            data = find

            return {
                "message": "",
                "data": rschema.dump(data)
            }

    #update order
    def put(self):

        result = updateschema.load(tools.get_param())
        order = Order.get(result['orderNo'])

        if order == None:
            return {
                       'message': 'order not exist!'
                   }, 403
        else:
            itemdata = Item.getall(result['orderNo'])

            itemdatalist=[]

            itemlist=[]

            print(itemdata)

            for e in itemdata:

                itemdatalist.append(e['productid'])

            for k,v in result['item'].items():

                itemlist.append(int(v['orderItemCode']))

            print(itemdatalist)

            for e in itemdata: 

                for k,v in result['item'].items():
                    if e['productid'] == int(v['orderItemCode']) and e['quantity'] != int(v['quantity']):
                            print('update')
                            updatedata = Item(
                                int(result['orderNo']),
                                int(v['orderItemCode']),
                                int(v['quantity'])
                                )
                            updatedata.update()

            if not(int(v['orderItemCode']) in itemdatalist):
                print('insert')
                insertdata = Item(
                    int(result['orderNo']),
                    int(v['orderItemCode']),
                    int(v['quantity'])
                )
                insertdata.insert()

            if not(e['productid'] in itemlist):
                print('delete')
                #gid = Item.get(result['orderNo'],e['productid'])
                Item.delete(e['orderNo'],e['productid'])

                    #deletedata = Item(
                    #    int(result['orderNo']),
                    #    int(e['productid']),
                    #    int(e['quantity'])
                    #)
                    #deletedata.delete(Item.id)

            totalPrice = tools.total(result['item'])

            data = {
                "orderNo": result['orderNo'],
                "item": result['item'],
                "totalPrice": totalPrice,
                "customer": result["customer"],
                "address": result["address"],
                "date": result["date"],
                "time": result["time"]
            }
                
            return {
                'message': 'Update order success',
                'data': rschema.dump(data)
            }

            
    #delete order
    def delete(self):

        result = getschema.load(tools.get_param())
        
        Order.delete(int(result['orderNo']))
        Item.delete(int(result['orderNo']))
            
        return {
            'message': 'Delete done!'
        }



