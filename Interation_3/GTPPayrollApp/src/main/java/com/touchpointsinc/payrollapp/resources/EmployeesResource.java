package com.touchpointsinc.payrollapp.resources;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.persistance.EmployeeDao;
import com.touchpointsinc.payrollapp.representations.Employee;


@Path("/employees")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class EmployeesResource {
    private EmployeeDao employeeDao;
    @Inject
    public EmployeesResource(EmployeeDao employeeDao){
        this.employeeDao = employeeDao;
    }

    /**
     * Get all Employees
     * @return employees
     */
    @GET
    public List<Employee> getAll(){
        List<Employee> employees = this.employeeDao.findAll();
        List<Employee> activEmployees = new ArrayList<>();
        
        for (Employee item : employees) {
        	if (!item.getStatus().equals("INACTIVE")) {
        		activEmployees.add(item);        	
        	}
        }  
        return activEmployees;
    }

    /**
     * Get single Employee
     * @param id
     * @return employee
     */
    @GET
    @Path("{id}")
    public Employee getOne(@PathParam("id")long id) {
        Employee employee = employeeDao.findOne(id);
        if(employee == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        
        employee.getMedicalPlan();
        employee.getDentalPlan();
        employee.getVisionPlan();
        
        employee.getMedicalContribution();
        employee.getDentalContribution();
        employee.getVisionContribution();
        
        employee.getDependents().size();
        
        return employee;
    }
    
    /**
     * Get single Employee by login
     * @param login
     * @return employee
     */
    @GET
    @Path("/getEmployeeByLogin")  
    public Employee getEmployeeByLogin(@QueryParam("login")String login) {
        Employee employee = employeeDao.getOneByLogin(login);
        if(employee == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        
        employee.getMedicalPlan();
        employee.getDentalPlan();
        employee.getVisionPlan();
        
        employee.getMedicalContribution();
        employee.getDentalContribution();
        employee.getVisionContribution();
        
        employee.getDependents().size();
        
        return employee;
    }
    
    /**
     * Get employee List By first name or last name
     * @param firstName
     * @param lastName
     * @return List of Employees
     */
    @GET
    @Path("/findEmployeeListByFirstNameAndLastName")
    public List<Employee> findEmployeeListByFirstNameOrLastName(@QueryParam("firstName")String firstName, @QueryParam("lastName")String lastName) {
    	List<Employee> employeeList = null;
    	
    	firstName = "%" + firstName + "%";
    	lastName = "%" + lastName + "%";
    	employeeList = employeeDao.findByName(firstName, lastName);
    	
        if(employeeList == null || employeeList.isEmpty()){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            return employeeList;
        }
    }

    /**
     * Create new Employee
     * @param employee
     * @return new employee
     * 
     */
    @POST
    public Employee save(@Valid Employee employee) {
    	Employee returnEmployee = new Employee();
    	try {
    		returnEmployee = employeeDao.save(employee);    		   
    	}
    	catch (Exception e) {
    		if (e.getCause().getCause() != null)  {
    			returnEmployee.setErrorMssage(e.getCause().getCause().toString());
    		}
    		else {
    			returnEmployee.setErrorMssage(e.getMessage());
    		}
    	}
        return returnEmployee;       
    }

    /**
     * Update existing Employee
     * @param id
     * @param employee
     * @return updated employee
     */
    @PUT
    @Path("{id}")
    public Employee update(@PathParam("id")long id, @Valid Employee employee) {
        if(employeeDao.findOne(id) == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            employee.setId(id);
            return employeeDao.save(employee);
        }
    }

    /**
     * Delete employee
     * @param id
     */
    //@DELETE
    //@Path("{id}")
    public void delete(@PathParam("id")long id) {
        Employee employee = employeeDao.findOne(id);
        if(employee == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            employeeDao.delete(employee);
        }
    }
}