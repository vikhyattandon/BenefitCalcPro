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

import com.touchpointsinc.payrollapp.persistance.BenefitPlanDao;
import com.touchpointsinc.payrollapp.representations.BenefitPlan;


@Path("/benefitPlans")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class BenefitPlansResource {
    private BenefitPlanDao benefitPlanDao;
    @Inject
    public BenefitPlansResource(BenefitPlanDao benefitPlanDao){
        this.benefitPlanDao = benefitPlanDao;
    }

    /**
     * Get all BenefitPlans
     * @return benefitPlans
     */
    @GET
    public List<BenefitPlan> getAll(){
        List<BenefitPlan> benefitPlans = this.benefitPlanDao.findAll();
        return benefitPlans;
    }

    /**
     * Get single BenefitPlan
     * @param id
     * @return benefitPlan
     */
    @GET
    @Path("{id}")
    public BenefitPlan getOne(@PathParam("id")long id) {
        BenefitPlan benefitPlan = benefitPlanDao.findOne(id);
        if(benefitPlan == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            return benefitPlan;
        }
    }

    /**
     * Create new BenefitPlan
     * @param benefitPlan
     * @return new benefitPlan
     */
    @POST
    public BenefitPlan save(@Valid BenefitPlan benefitPlan) {
    	BenefitPlan returnBenefitPlan = new BenefitPlan();
    	try {
    		returnBenefitPlan = benefitPlanDao.save(benefitPlan);    		   
    	}
    	catch (Exception e) {
    		if (e.getCause().getCause() != null)  {
    			returnBenefitPlan.setErrorMssage(e.getCause().getCause().toString());
    		}
    		else {
    			returnBenefitPlan.setErrorMssage(e.getMessage());
    		}
    	}
        return returnBenefitPlan;       
    }

    /**
     * Update existing BenefitPlan
     * @param id
     * @param benefitPlan
     * @return updated benefitPlan
     */
    @PUT
    @Path("{id}")
    public BenefitPlan update(@PathParam("id")long id, @Valid BenefitPlan benefitPlan) {
        if(benefitPlanDao.findOne(id) == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            benefitPlan.setId(id);
            return benefitPlanDao.save(benefitPlan);
        }
    }

    /**
     * Delete benefitPlan
     * @param id
     */
    //@Path("{id}")
    public void delete(@PathParam("id")long id) {
        BenefitPlan benefitPlan = benefitPlanDao.findOne(id);
        if(benefitPlan == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            benefitPlanDao.delete(benefitPlan);
        }
    }
}