import pymongo

# Connect to the MongoDB server
client = pymongo.MongoClient("mongodb://localhost:27017/")

# Select the database and collection
db = client["Testing"]
col = db["test"]

# Query the collection for all documents
docs = col.find()
# Print each document
for doc in docs:
    print(doc)
