package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)
type Todo struct {
	ID 		int		`json:"id"` 
	Completed bool 	`json:"completed"`
	Body 	string `json:"body"`
}
func main(){
	
	fmt.Println("Hello !")

	app:= fiber.New()
	err := godotenv.Load(".env")
	PORT:=os.Getenv("PORT")
	if err != nil{
		log.Fatal("Error in Loading the env files")
	}

	todos := []Todo{}

	app.Get("/api/todos",func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})


	app.Post("/api/todos",func (c *fiber.Ctx) error {

		todo:= &Todo{} //memory address 
		if err:= c.BodyParser(todo) ; err!=nil {
			return err
		}
		if todo.Body == ""{
			return c.Status(400).JSON(fiber.Map{"error":"Your todo body is empty "})
		}
		todo.ID = len(todos) + 1
		todos = append(todos, *todo) // it will get the pointer value
		return c.Status(201).JSON(todo)
	})

	//update
	app.Patch("/api/todos/:id",func(c *fiber.Ctx) error{
		id:= c.Params(("id"))
		for i ,todo :=range todos{
			if fmt.Sprint(todo.ID) == id{
				todos[i].Completed = true
				return c.Status(200).JSON(todos[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error":"todo not found "})
	})

	//delete a todo 
	app.Delete("/api/todos/:id",func(c *fiber.Ctx)error{
		id:=c.Params(("id"))
		for i , todo := range todos{
			if fmt.Sprint((todo.ID)) == id{

				todos = append(todos[:i],todos[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"success":true})
			}
		}
	return c.Status(404).JSON(fiber.Map{"error":"todo not found "})

	})


	log.Fatal(app.Listen(":"+ PORT))
}