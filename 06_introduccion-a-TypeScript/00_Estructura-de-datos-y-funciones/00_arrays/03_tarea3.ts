interface user{
    id: number;
    name:string;
}

const  users: user[] = [
    {id: 1, name:"alejandro"},
    {id:2, name:"juan"},
    {id:3, name:"camila"}
]

users.forEach(users =>{
    console.log(users.name);
});