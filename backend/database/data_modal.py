from flask import Flask
from flask_mysqldb import MySQL
import time
from datetime import datetime

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db2'

mysql = MySQL(app)

class Order():

    orderid = ''
    customer = ''
    address = ''
    date = ''
    time = ''
    state = ''

    def __init__(self, customer, address, date, time):

        self.customer = customer
        self.address = address
        self.date = date
        self.time = time

    def insert(self):
        cur = mysql.connection.cursor()
        sql = """insert into orderinf (customer,address,date,time) 
        values('{0}','{1}','{2}','{3}')""".format(self.customer,self.address,self.date,self.time)
        cur.execute(sql)
        sql = "SELECT LAST_INSERT_ID();"
        cur.execute(sql)
        insertid = cur.fetchone()
        data = insertid[0]
        mysql.connection.commit()
        cur.close()
        return data

    def update(self):
        cur = mysql.connection.cursor()
        sql = """update orderinf set customer='{0}',address='{1}',date='{2}', time='{3}' where id='{4}
        '""".format(self.customer,self.address,self.date,self.time,self.id)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()

    def delete(oid):
        cur = mysql.connection.cursor()
        sql = "delete from orderinf where id='{0}'".format(oid)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()
        
    def get(oid):
        data = None
        cur = mysql.connection.cursor()
        sql = "select * from orderinf where id='{0}'".format(oid)
        cur.execute(sql)
        result = cur.fetchone()
        if result is None:
            return None
        data = Order(result[1],result[2],result[3],result[4])
        data.id = result[0]
        cur.close()
        return data

    def getall():

        data = []

        cur = mysql.connection.cursor()
        sql = "select * from orderinf"
        cur.execute(sql)
        result = cur.fetchall()

        for item in result:

            time= (datetime.min + item[4]).time()

            gdata = Order(item[1], item[2], item[3], time)
            gdata.id = item[0]
            gdata.state = item[5]
            dbdata={"orderNo":item[0],"customer":item[1],"address":item[2],"date":item[3],"time":time,"state":item[5]}
            data.append(dbdata)

        cur.close()
        return data

class Item():

    id=''
    itemid = ''
    productid = ''
    quantity = ''

    def __init__(self, itemid, productid, quantity):
        self.id=id
        self.itemid = itemid
        self.productid = productid
        self.quantity = quantity

    def insert(self):
        cur = mysql.connection.cursor()
        sql = """insert into items (orderid,productid,quantity) 
        values('{0}','{1}','{2}')""".format(self.itemid,self.productid,self.quantity)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()

    def update(self):
        cur = mysql.connection.cursor()
        sql = """update items set quantity='{1}' where productid='{0}' and orderid='{2}
        '""".format(self.productid,self.quantity,self.itemid)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()

    def delete(oid,pid):
        cur = mysql.connection.cursor()
        sql = "delete from items where orderid='{0}' and productid='{1}'".format(oid,pid)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()
        
    def get(orderid,itemid):
        data = None
        cur = mysql.connection.cursor()
        sql = "select * from items where orderid='{0}' and productid='{1}'".format(orderid,itemid)
        cur.execute(sql)
        result = cur.fetchone()
        if result is None:
            return None
        data = {'id':result[0],'orderNo':result[1],'productid':result[2],"quantity":result[3]}
        cur.close()
        return data

    def getall(oid):

        data = []

        cur = mysql.connection.cursor()
        sql = "select * from items where orderid='{0}'".format(oid)
        cur.execute(sql)
        result = cur.fetchall()
        for item in result:
            gdata = {'orderNo':item[1],'productid':item[2],'quantity':item[3]}
            data.append(gdata)
        cur.close()
        return data

class products():

    pid = ''
    name = ''
    price = ''

    def __init__(self, pid, name, price):
        self.pid = pid
        self.name = name
        self.price = price

    def insert(self):
        cur = mysql.connection.cursor()
        sql = """insert into product (name,price) 
        values('{0}','{1}')""".format(self.name,self.price)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()

    def update(self):
        cur = mysql.connection.cursor()
        sql = """update product set name='{0}',price='{1}' where id='{2}
        '""".format(self.name,self.price,self.pid)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()

    def delete(self):
        cur = mysql.connection.cursor()
        sql = "delete from product where id='{0}'".format(self.pid)
        cur.execute(sql)
        mysql.connection.commit()
        cur.close()
    
    def get(pid):
        data = None
        cur = mysql.connection.cursor()
        sql = "select * from product where id='{0}'".format(pid)
        cur.execute(sql)
        result = cur.fetchone()
        if result is None:
            return None
        data = {'orderItemCode':result[0],'description':result[1],'price':result[2]}
        cur.close()
        return data

    def getall(self):

        data = []

        cur = mysql.connection.cursor()
        sql = "select * from product"
        result = cur.execute(sql)
        for item in result:
            gdata = products(item[0],item[1], item[2])
            data.append(gdata)
        cur.close()
        return data
