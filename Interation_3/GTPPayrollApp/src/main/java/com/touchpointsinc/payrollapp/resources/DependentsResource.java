package com.touchpointsinc.payrollapp.resources;

import java.util.List;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.persistance.DependentDao;
import com.touchpointsinc.payrollapp.representations.Dependent;


@Path("/dependents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class DependentsResource {
	private DependentDao dependentDao;
    @Inject
    public DependentsResource(DependentDao dependentDao){
        this.dependentDao = dependentDao;
    }

    /**
     * Get all Dependents
     * @return dependents
     */
    @GET
    public List<Dependent> getAll(){
        List<Dependent> dependents = this.dependentDao.findAll();
        return dependents;
    }

    /**
     * Get single Dependent
     * @param id
     * @return dependent
     */
    @GET
    @Path("{id}")
    public Dependent getOne(@PathParam("id")long id) {
        Dependent dependent = dependentDao.findOne(id);
        if(dependent == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            return dependent;
        }
    }

    /**
     * Create new Dependent
     * @param dependent
     * @return new dependent
     */
    @POST
    public Dependent save(@Valid Dependent dependent) {
    	Dependent returnDependent = new Dependent();
    	try {
    		returnDependent = dependentDao.save(dependent);    		   
    	}
    	catch (Exception e) {
    		if (e.getCause().getCause() != null)  {
    			returnDependent.setErrorMssage(e.getCause().getCause().toString());
    		}
    		else {
    			returnDependent.setErrorMssage(e.getMessage());
    		}
    	}
        return returnDependent;       
    }

    /**
     * Update existing Dependent
     * @param id
     * @param dependent
     * @return updated dependent
     */
    @PUT
    @Path("{id}")
    public Dependent update(@PathParam("id")Long id, @Valid Dependent dependent) {
        if(dependentDao.findOne(id) == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            dependent.setId(id);
            return dependentDao.save(dependent);
        }
    }

    /**
     * Delete dependent
     * @param id
     */
    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id")long id) {
        Dependent dependent = dependentDao.findOne(id);
        if(dependent == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            dependentDao.delete(dependent);
        }
    }
}