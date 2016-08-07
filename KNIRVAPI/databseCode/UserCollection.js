//adding a unique index on userName attribute
db.Users.createIndex({"userName":1},{unique:true});
db.Users.createIndex({"email":1},{unique:true});
db.Users.createIndex({"id":1},{unique:true});