package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID 		primitive.ObjectID	`json:"id,omitempty" bson:"_id,omitempty"` 
	Completed bool 	`json:"completed"`
	Body 	string `json:"body"`
}
var collection *mongo.Collection
func main(){
fmt.Println("Hello!")
err:= godotenv.Load(".env")
if err != nil{
	log.Fatal()
}
mongodb_url := os.Getenv("MONGODB_URI")
clientoptions:=options.Client().ApplyURI(mongodb_url)
client,err:=mongo.Connect(context.Background(),clientoptions)
if err != nil{
	log.Fatal(err)
}
defer client.Disconnect(context.Background())

err =client.Ping(context.Background(),nil)

if err != nil{
	log.Fatal(err)
}

fmt.Println("Connected successfully")

collection = client.Database("goland_db").Collection("todos")
app:= fiber.New()
app.Get("/api/todos",getTodos)
app.Post("/api/todos",PostTodos)
app.Patch("/api/todos/:id",PatchTodos)
app.Delete("/api/todos/:id",deleteTodos)

	PORT:=os.Getenv("PORT")
	if PORT == ""{
		PORT = "4000"
	}
	log.Fatal(app.Listen(":"+ PORT))
}
func getTodos(c *fiber.Ctx) error{
	var todos []Todo
	cursor,err :=collection.Find(context.Background(),bson.M{})
	if err != nil{
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()){
		var todo Todo
		if err := cursor.Decode(&todo) ; err != nil{
			return err
		}
		todos = append(todos, todo)
	}
	return c.JSON(todos)
}
 func PostTodos(c *fiber.Ctx) error{
	todo:= new(Todo)
	if err :=c.BodyParser(todo) ; err != nil {
		return err
	}
	if todo.Body == ""{
		return c.Status(400).JSON(fiber.Map{"Error":"Todo Body cannot be empty"})
	}
	insertResult, err := collection.InsertOne(context.Background(),todo)
	if err != nil{
		return err
	}
	todo.ID = insertResult.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(todo)

}
func PatchTodos(c *fiber.Ctx) error{
	id:=c.Params("id")
	objectid, err:=primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"Error":"Error in getting the objectId"})
	}
	filter:=bson.M{"_id": objectid}
	update:=bson.M{"$set":bson.M{"completed":true}}

	_,errs:=collection.UpdateOne(context.Background(),filter,update)
	if errs != nil {
		return c.Status(400).JSON(fiber.Map{"Error":"Error in getting the updation"})
	}
	return c.Status(200).JSON(fiber.Map{"success":true})
}
func deleteTodos(c *fiber.Ctx) error{
	id:=c.Params("id")
	objectid, err:=primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"Error":"Error in getting the objectId for deletion"})
	}

	filter:=bson.M{"_id": objectid}
	_, errs:= collection.DeleteOne(context.Background(),filter)
	if errs != nil {
		return c.Status(400).JSON(fiber.Map{"Error":"Error in collecting the data for deletion"})
	}
	return c.Status(200).JSON(fiber.Map{"success":true})

}
