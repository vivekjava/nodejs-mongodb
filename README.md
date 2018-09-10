Api : http://{{ip}}:2000/
Method : GET
Result : 
{
    "success": true
}
==============================
Api : http://{{ip}}:2000/api/create?service=collection1
Method : POST
RequestBody : 
{
	"name":"vivek",
	"age":21
}
Result : 
{
    "record": true
}
==============================
Api : http://{{ip}}:2000/api/getall?service=collection1
Method : GET
Result : 
[
    {
        "_id": "ea4f23cf-267e-4585-8187-207f52423fad",
        "name": "vivek",
        "age": 21
    }
]

