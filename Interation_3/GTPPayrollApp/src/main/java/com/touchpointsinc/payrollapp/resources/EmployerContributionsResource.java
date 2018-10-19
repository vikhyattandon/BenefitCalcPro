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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.persistance.EmployerContributionDao;
import com.touchpointsinc.payrollapp.representations.EmployerContribution;


@Path("/employerContributions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class EmployerContributionsResource {
    private EmployerContributionDao employerContributionDao;
    
    @Inject
    public EmployerContributionsResource(EmployerContributionDao employerContributionDao){
        this.employerContributionDao = employerContributionDao;
    } 

    /**
     * Get all EmployerContributions
     * @return employerContributions
     */
    @GET
    public List<EmployerContribution> getAll(){
        List<EmployerContribution> employerContributions = this.employerContributionDao.findAll();
        /*
        List<EmployerContribution> employerContributionUniqueList = new ArrayList<>();
        
        for (EmployerContribution item : employerContributions) {
        	if (item.getPlanType().equals("M") && item.getServiceYear() == 1) {
        		employerContributionUniqueList.add(item);        	
        	}
        }  */
        
        return employerContributions;
    }

    /**
     * Get single EmployerContribution
     * @param id
     * @return employerContribution
     */
    @GET
    @Path("{id}")
    public EmployerContribution getOne(@PathParam("id")long id) {
        EmployerContribution employerContribution = employerContributionDao.findOne(id);
        if(employerContribution == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            return employerContribution;
        }
    }

    /**
     * Create new EmployerContribution
     * @param employerContribution
     * @return new employerContribution
     */
    @POST
    public EmployerContribution save(@Valid EmployerContribution employerContribution) {
    	EmployerContribution returnEmployerContribution = new EmployerContribution();
    	try {
    		returnEmployerContribution = employerContributionDao.save(employerContribution);    		   
    	}
    	catch (Exception e) {
    		if (e.getCause().getCause() != null)  {
    			returnEmployerContribution.setErrorMssage(e.getCause().getCause().toString());
    		}
    		else {
    			returnEmployerContribution.setErrorMssage(e.getMessage());
    		}
    	}
        return returnEmployerContribution;       
    }

    /**
     * Update existing EmployerContribution
     * @param id
     * @param employerContribution
     * @return updated employerContribution
     */
    @PUT
    @Path("{id}")
    public EmployerContribution update(@PathParam("id")long id, @Valid EmployerContribution employerContribution) {
        if(employerContributionDao.findOne(id) == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            employerContribution.setId(id);
            return employerContributionDao.save(employerContribution);
        }
    }

    /**
     * Delete employerContribution
     * @param id
     */
    //@DELETE
    //@Path("{id}")
    public void delete(@PathParam("id")long id) {
        EmployerContribution employerContribution = employerContributionDao.findOne(id);
        if(employerContribution == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            employerContributionDao.delete(employerContribution);
        }
    }
}