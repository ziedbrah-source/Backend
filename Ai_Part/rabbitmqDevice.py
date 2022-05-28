
import pika
import json


message = {"pattern":"createNotification"}

def sendNotif(device): 
  connection = pika.BlockingConnection(       
    pika.ConnectionParameters(host='localhost'))
  channel = connection.channel()
  channel.queue_declare(queue='camNotif',durable= True)
  print(device.location())
  print(device.location()["latitude"])
  message["data"]=str(device.location()["longitude"])+" "+str(device.location()["latitude"])+ " " + "4"
  channel.basic_publish(exchange='', routing_key='camNotif', body=json.dumps(message))
  print(" [x] Sent ")
  connection.close()

