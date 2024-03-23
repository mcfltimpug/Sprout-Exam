from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Union
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class Employee(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    type: str

class RegularEmployee(Employee):
    number_of_leaves: int
    benefits: List[str]

class ContractualEmployee(Employee):
    contract_end_date: str
    project: str

employees = [
    ContractualEmployee(id=1, first_name="Alice", last_name="Smith", email="alice@example.com", contract_end_date="2024-12-31", project="Project A", type="contractual"),
    ContractualEmployee(id=2, first_name="Bob", last_name="Brown", email="bob@example.com", contract_end_date="2024-10-15", project="Project B", type="contractual"),
    RegularEmployee(id=3, first_name="John", last_name="Doe", email="john@example.com", number_of_leaves=20, benefits=["health insurance", "paid time off"], type="regular"),
    RegularEmployee(id=4, first_name="Jane", last_name="Doe", email="jane@example.com", number_of_leaves=15, benefits=["retirement plan"], type="regular"),
]

@app.get("/employees")
def get_employees(type: Optional[str] = Query(None, description="Filter employees by type")):
  if type is None:
        return employees
  elif type.lower() == "regular":
        return [employee for employee in employees if isinstance(employee, RegularEmployee)]
  elif type.lower() == "contractual":
        return [employee for employee in employees if isinstance(employee, ContractualEmployee)]
  else:
        return {"error": "Invalid Employee Type."}
  
@app.post("/employees")
def add_employee(employee_data: Union[RegularEmployee, ContractualEmployee]):
    for existing_employee in employees:
        if existing_employee.id == employee_data.id:
            raise HTTPException(status_code=400, detail="Employee ID already exists")
    employees.append(employee_data)
    return {"message": "Employee Added Successfully!"} 

@app.put("/employees/{employee_id}")
def edit_employee(employee_id: int, employee_data: Union[RegularEmployee, ContractualEmployee]):
    for existing_employee in employees:
        if existing_employee.id == employee_id:
            if existing_employee.type != employee_data.type:
                # Type has changed, handle conversion
                if existing_employee.type == "regular":
                    converted_employee = ContractualEmployee(
                        id=employee_data.id,
                        first_name=employee_data.first_name,
                        last_name=employee_data.last_name,
                        email=employee_data.email,
                        contract_end_date=employee_data.contract_end_date,
                        project=employee_data.project,
                        type="contractual"
                    )
                else:
                    converted_employee = RegularEmployee(
                        id=employee_data.id,
                        first_name=employee_data.first_name,
                        last_name=employee_data.last_name,
                        email=employee_data.email,
                        number_of_leaves=employee_data.number_of_leaves,
                        benefits=employee_data.benefits,
                        type="regular"
                    )
                employees.remove(existing_employee)
                employees.append(converted_employee)
                return {"message": "Employee Updated Successfully"}
            else:
                # Type has not changed, update existing employee
                existing_employee.first_name = employee_data.first_name
                existing_employee.last_name = employee_data.last_name
                existing_employee.email = employee_data.email
                existing_employee.type = employee_data.type
                if isinstance(existing_employee, RegularEmployee):
                    existing_employee.number_of_leaves = employee_data.number_of_leaves
                    existing_employee.benefits = employee_data.benefits
                elif isinstance(existing_employee, ContractualEmployee):
                    existing_employee.contract_end_date = employee_data.contract_end_date
                    existing_employee.project = employee_data.project
                return {"message": "Employee Updated Successfully!"}
    raise HTTPException(status_code=404, detail="Employee not found")

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):
    for existing_employee in employees:
        if existing_employee.id == employee_id:
            employees.remove(existing_employee)
            return {"message": "Employee Deleted Successfully"}
    raise HTTPException(status_code=404, detail="Employee Not Found")
