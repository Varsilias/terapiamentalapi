print("<---------------------------Creating Default User-------------------------->");
db.auth("root", "P@ssword1234");

db = db.getSiblingDB("admin");
db.createUser({
  user: "mainstack",
  pwd: "M@instack1234",
  roles: [{ role: "readWrite", db: "admin" }],
});
print("<------------------------Finished Creating Default User---------------------->");
