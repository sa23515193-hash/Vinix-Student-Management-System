const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const DB_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DB_DIR, "students.json");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) {
  const seed = [
    {id:1,name:"Ayesha Malik",email:"ayesha.malik@example.com",course:"Computer Science",year:"3rd Year",status:"Active",gpa:3.82,joined:"2024-09-12"},
    {id:2,name:"Hamza Khan",email:"hamza.khan@example.com",course:"Software Engineering",year:"2nd Year",status:"Active",gpa:3.54,joined:"2025-01-18"},
    {id:3,name:"Maham Ali",email:"maham.ali@example.com",course:"Data Science",year:"4th Year",status:"On Leave",gpa:3.91,joined:"2023-09-05"},
    {id:4,name:"Usman Raza",email:"usman.raza@example.com",course:"Cyber Security",year:"1st Year",status:"Active",gpa:3.27,joined:"2026-02-10"},
    {id:5,name:"Zara Ahmed",email:"zara.ahmed@example.com",course:"Computer Science",year:"3rd Year",status:"Graduated",gpa:3.76,joined:"2023-09-11"},
    {id:6,name:"Bilal Hussain",email:"bilal.hussain@example.com",course:"Software Engineering",year:"2nd Year",status:"Active",gpa:3.42,joined:"2025-02-02"}
  ];
  fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
}
const read = () => JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
const write = data => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
app.get("/api/health", (_,res)=>res.json({status:"ok",service:"Student Management API"}));
app.get("/api/students", (req,res)=>{
  let items = read();
  const q = (req.query.q || "").toLowerCase();
  const status = req.query.status || "All";
  if(q) items = items.filter(s => [s.name,s.email,s.course,s.year].some(v=>v.toLowerCase().includes(q)));
  if(status !== "All") items = items.filter(s=>s.status===status);
  res.json(items);
});
app.post("/api/students", (req,res)=>{
  const {name,email,course,year,status="Active",gpa=0,joined=new Date().toISOString().slice(0,10)} = req.body;
  if(!name || !email || !course || !year) return res.status(400).json({error:"Name, email, course and year are required."});
  const items=read();
  if(items.some(s=>s.email.toLowerCase()===email.toLowerCase())) return res.status(409).json({error:"A student with this email already exists."});
  const item={id:items.reduce((m,s)=>Math.max(m,s.id),0)+1,name,email,course,year,status,gpa:Number(gpa),joined};
  items.unshift(item); write(items); res.status(201).json(item);
});
app.put("/api/students/:id", (req,res)=>{
  const items=read(), idx=items.findIndex(s=>s.id===Number(req.params.id));
  if(idx<0) return res.status(404).json({error:"Student not found."});
  const allowed=["name","email","course","year","status","gpa","joined"];
  for(const key of allowed) if(req.body[key]!==undefined) items[idx][key]=key==="gpa"?Number(req.body[key]):req.body[key];
  write(items); res.json(items[idx]);
});
app.delete("/api/students/:id", (req,res)=>{
  const items=read(), next=items.filter(s=>s.id!==Number(req.params.id));
  if(next.length===items.length) return res.status(404).json({error:"Student not found."});
  write(next); res.json({success:true});
});
app.get("*", (req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Student Management System running at http://localhost:${PORT}`));
