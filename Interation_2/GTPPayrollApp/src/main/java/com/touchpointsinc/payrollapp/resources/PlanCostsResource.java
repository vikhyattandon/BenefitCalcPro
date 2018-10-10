package com.touchpointsinc.payrollapp.resources;

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

import com.touchpointsinc.payrollapp.persistance.PlanCostDao;
import com.touchpointsinc.payrollapp.representations.PlanCost;


@Path("/planCosts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class PlanCostsResource {
    private PlanCostDao planCostDao;
    
    @Inject
    public PlanCostsResource(PlanCostDao planCostDao){
        this.planCostDao = planCostDao;
    } 

    /**
     * Get all PlanCosts
     * @return planCosts
     */
    @GET
    public List<PlanCost> getAll(){
        List<PlanCost> planCosts = this.planCostDao.findAll();
        
        return planCosts;
    }

    /**
     * Get single PlanCost
     * @param id
     * @return planCost
     */
    @GET
    @Path("{id}")
    public PlanCost getOne(@PathParam("id")long id) {
        PlanCost planCost = planCostDao.findOne(id);
        if(planCost == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            return planCost;
        }
    }

    /**
     * Create new PlanCost
     * @param planCost
     * @return new planCost
     */
    @POST
    public PlanCost save(@Valid PlanCost planCost) {
    	PlanCost returnPlanCost = new PlanCost();
    	try {
    		returnPlanCost = planCostDao.save(planCost);    		   
    	}
    	catch (Exception e) {
    		if (e.getCause().getCause() != null)  {
    			returnPlanCost.setErrorMssage(e.getCause().getCause().toString());
    		}
    		else {
    			returnPlanCost.setErrorMssage(e.getMessage());
    		}
    	}
        return returnPlanCost;       
    }

    /**
     * Update existing PlanCost
     * @param id
     * @param planCost
     * @return updated planCost
     */
    @PUT
    @Path("{id}")
    public PlanCost update(@PathParam("id")long id, @Valid PlanCost planCost) {
        if(planCostDao.findOne(id) == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            planCost.setId(id);
            return planCostDao.save(planCost);
        }
    }

    /**
     * Delete planCost
     * @param id
     */
    //@DELETE
    //@Path("{id}")
    public void delete(@PathParam("id")long id) {
        PlanCost planCost = planCostDao.findOne(id);
        if(planCost == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            planCostDao.delete(planCost);
        }
    }
}