//department crud

   
let depttable=document.createElement("table");
depttable.setAttribute("id","deptTable");
depttable.style.marginTop="50px";
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
