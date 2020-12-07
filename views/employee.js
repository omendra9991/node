
let counter=0;
let emptable=document.createElement("table");
emptable.setAttribute("id","empTable");

function addUser(user){

    counter++;
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let deleteButton=document.createElement("button");
    let editButton=document.createElement("button");
    td1.innerHTML=user.empName;
    td2.innerHTML=user.department;
    td3.innerHTML=user.DOJ;
    td4.innerHTML=user.employeeCode;
    deleteButton.innerHTML="DELETE";
    editButton.innerHTML="EDIT"
    deleteButton.setAttribute("id",user._id);
    editButton.setAttribute("id",user._id);
    tr.setAttribute("id", counter);
    td1.setAttribute("id", "td"+counter);
    tr.append(td1,td2,td3,td4,editButton,deleteButton);
    emptable.append(tr);
    document.body.append(emptable);
    editButton.addEventListener("click",editemp);
    deleteButton.addEventListener("click",deleteData);
    

}


const getAllData = async() => {
    
    emptable.style.marginTop="50px";
    let tr=document.createElement("tr");
    let th1=document.createElement("th");
    let th2=document.createElement("th");
    let th3=document.createElement("th");
    let th4=document.createElement("th");
    th1.innerHTML="Employee Name";
    th2.innerHTML="Department";
    th3.innerHTML="DOJ";
    th4.innerHTML="Employee Code";
    tr.append(th1,th2,th3,th4);
    emptable.append(tr);
    emptable.classList.add("table-bordered");
    emptable.classList.add("table-dark");
    emptable.classList.add("table-hover");
    document.body.append(emptable);
    const data = await fetch("http://localhost:3000/users");
    const emp = await data.json();
    emp.forEach(emp => {
        addUser(emp);
        console.log(emp);
    });
   
    

}


document.getElementById("EmployeeList").addEventListener('click', () => {
    
    getAllData();
    document.getElementById("EmployeeList").disabled = true;

});
const deleteData = async() => {
    
    let ID=event.target.id;
    window.location.href = "http://localhost:3000";
    console.log("employee deleted");
    const result = await fetch("http://localhost:3000/employee/" + ID, {
         method: "DELETE",
         headers: {
             'Content-Type': 'application/json'
        },
        
    });
    location.reload();
    getAllData();
}
const editemp = async() => {

        jQuery("#menu").css("display", "none");
        jQuery("#empTable").css("display", "none");
        let ID=event.target.id;
        document.getElementById("employee_form").action = "/employee/"+ID;
        // document.getElementById("employee_form").method = "";
         document.getElementById("employee_form").style.display = "";
         document.getElementById("buttonAdd").style.display = "none";
         document.getElementById("buttondept").style.display = "none";
         document.getElementById("buttonemp").style.display = "";
         document.getElementById("buttonemp").setAttribute("id",ID);
         const data = await fetch("http://localhost:3000/users/"+ ID);
        //  console.log(data.empName);
         const emp = await data.json();
         emp.forEach(emp => {
            document.getElementById("empName").value=emp.empName;
            document.getElementById("empCode").value=emp.employeeCode;
            document.getElementById("empDept").value=emp.department;
            document.getElementById("empDOJ").value=emp.DOJ;
            console.log(emp.empName);
        });
       
        
}

document.getElementById("buttonemp").addEventListener('click', () => {
    let ID=event.target.id;
    window.location.href = "http://localhost:3000";
    empName = document.getElementById("empName").value;
    employeeCode = document.getElementById("empCode").value;
    department = document.getElementById("empDept").value;
    DOJ = document.getElementById("empDOJ").value;
   
    fetch("/employee/"+ID, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        empName: empName,
        employeeCode: employeeCode,
        department:department,
        DOJ:DOJ
    })
  })
  location.reload();
    getAllData();
});



