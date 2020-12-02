
let counter=0;
let emptable=document.createElement("table");
emptable.setAttribute("id","empTable");
let depttable=document.createElement("table");
depttable.setAttribute("id","deptTable");
depttable.style.marginTop="50px";
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
   
    document.body.append(home);

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



//department crud

   

    function addDept(dept){
    
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        // let td4=document.createElement("td");
        let deleteButton=document.createElement("button");
        let editButton=document.createElement("button");
        td1.innerHTML=dept.deptName;
        td2.innerHTML=dept.deptCode;
        td3.innerHTML=dept.details;
        //td4.innerHTML=department.employeeCode;
        deleteButton.innerHTML="DELETE";
        editButton.innerHTML="EDIT"
        deleteButton.setAttribute("id",dept._id);
        editButton.setAttribute("id",dept._id);
        
        tr.append(td1,td2,td3,editButton,deleteButton);
        depttable.append(tr);
        document.body.append(depttable);
        editButton.addEventListener("click",editdept);
        deleteButton.addEventListener("click",deleteDept);
        
    
    }
    
    
    const getAllDept = async() => {
      
        let deptr=document.createElement("tr");
        let depth1=document.createElement("th");
        let depth2=document.createElement("th");
        let depth3=document.createElement("th");
        let textInput = document.createElement("input");
        textInput.setAttribute("type", "text");
        textInput.setAttribute("id", "searchDEPT");

        let search =document.createElement("button");
        search.innerHTML="Search";
        
        // let depth4=document.createElement("th");
        depth1.innerHTML="Department Name";
        depth2.innerHTML="Department code";
        depth3.innerHTML="Details";
        depttable.classList.add("table-bordered");
        depttable.classList.add("table-dark");
        depttable.classList.add("table-hover");
        // depth4.innerHTML="Employee Code";s
        deptr.append(depth1,depth2,depth3,textInput,search);
        depttable.append(deptr);
        depttable.classList.add("depttable");
       
        document.body.append(depttable);
        search.addEventListener("click",searchdept);
        const data = await fetch("http://localhost:3000/department");
        const dept = await data.json();
        dept.forEach(dept => {
            addDept(dept);
            console.log(dept);
        });
    }
    
document.getElementById("DepartmentList").addEventListener('click', () => {
        
        getAllDept();
        document.getElementById("DepartmentList").disabled = true;
       
    
});
    
    const deleteDept = async() => {
        
        let ID=event.target.id;
        window.location.href = "http://localhost:3000";
        console.log("department deleted");
        const result = await fetch("http://localhost:3000/department/" + ID, {
             method: "DELETE",
             headers: {
                 'Content-Type': 'application/json'
            },
            
        });
        location.reload();
        getAllDept();
    }

const editdept = async() => {
       
    jQuery("#menu").css("display", "none");
    jQuery("#deptTable").css("display", "none");
        let ID=event.target.id;
        document.getElementById("department_form").action = "/depertment/"+ID;
        // document.getElementById("department_form").method = "";
         document.getElementById("department_form").style.display = "";
         document.getElementById("buttonAdd").style.display = "none";
         document.getElementById("buttonemp").style.display = "none";
         document.getElementById("buttondept").style.display = "";
         document.getElementById("deptAdd").style.display = "none";
         document.getElementById("buttondept").setAttribute("id",ID);
         const data = await fetch("/department/"+ ID);
        //  console.log(data.empName);
         const dept = await data.json();
         dept.forEach(dept => {
            document.getElementById("deptName").value=dept.deptName;
            document.getElementById("deptCode").value=dept.deptCode;
            document.getElementById("details").value=dept.details;
            
            console.log(dept.deptName);
        });
       
        
}

document.getElementById("buttondept").addEventListener('click', () => {
    let ID=event.target.id;
    console.log(ID);
     window.location.href = "http://localhost:3000";
   let deptName = document.getElementById("deptName").value;
    let deptCode = document.getElementById("deptCode").value;
    let details = document.getElementById("details").value;
   
   
    fetch("/department/" + ID, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        deptName: deptName,
        deptCode: deptCode,
        details: details
        
    })
  })
  location.reload();
    getAllData();
})
// search department option 
const searchdept = async() => {
    let searchText = document.getElementById("searchDEPT").value;
    console.log(searchText);
    await fetch("http://localhost:3000/search/"+ searchText);
}
