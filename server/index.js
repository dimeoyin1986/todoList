const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const pool = require("./db");



     //middleware
     app.use(cors());
     app.use(express.json());//gives you access to request.body

    // ROUTES
  // create a myhtodo

  app.post("/myhtodos",async(request,response, next)=>{
try {
     
    const {first_name,last_name,Email, Gender, Date_of_birth} = request.body;
    const sql = "INSERT INTO myhtodo(first_name,last_name,Email, Gender, Date_of_birth) VALUES($1,$2,$3,$4,$5) RETURNING*";
    const newMyhtodo = await pool.query(sql,[first_name,last_name,Email, Gender, Date_of_birth]);
     response.json(newMyhtodo.rows[0]);
} catch (err) {
    console.error(err.message);
}
  });


  //get all myhtodos
   app.get("/myhtodos", async (request,response,next)=>{
     try {
        const allMyTodos = await pool.query("SELECT * FROM myhtodo");
        response.json(allMyTodos.rows)
     } catch (err) {
         console.error(err.message);
     }
   })

  // get a myhtodo
    app.get("/myhtodos/:id", async(request,response, next)=>{
        try {
            const {id} = request.params
            const sql = "SELECT * FROM myhtodo WHERE m_id = $1";
            const aMyhtodo = await pool.query(sql,[id]);
            response.json(aMyhtodo.rows[0])
        } catch (err) {
            console.error(err.message);
        }
       
    })


  //update a myhtodo
   app.put("/myhtodos/:id", async(request,response,next)=>{
     try {
          const {id} = request.params;
          const {first_name,last_name,Email, Gender, Date_of_birth}= request.body;
          const parameters = [first_name,last_name,Email, Gender, Date_of_birth,id]
          const sql ="UPDATE myhtodo SET first_name =$1, last_name = $2,Email= $3, Gender= $4, Date_of_birth = $5 WHERE m_id = $6"; 
          const updateMyTodo = await pool.query(sql,parameters);
           response.json("myhtodo was finally updated");
     } catch (err) {
         console.error(err.message)
     }
   })


  // delete myhtodo
  app.delete("/myhtodos/:id", async(request,response,next)=>{
      try {
           const {id} = request.params
           const deleteMyhtodo = await pool.query("DELETE FROM myhtodo WHERE m_id = $1",[id]);
           response.json("deleteMyhtodo was successful deleted"); 
      } catch (err) {
         console.error(err.message); 
      }
  })




app.listen(PORT, ()=>{
    console.log (`The server is listening on ${PORT}`)
});