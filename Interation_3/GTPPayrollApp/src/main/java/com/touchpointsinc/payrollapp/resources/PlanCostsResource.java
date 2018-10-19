package com.touchpointsinc.payrollapp.resources;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
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
     * Load plan cost records from Csv File
     * @param id
     * @param planCost
     * @return updated planCost
     */
    @GET
    @Path("/loadFromCsvFile")
    public String loadFromCsvFile() {
    	String errorMsg = "No Error";
    	String csvFile = "D:\\share_drive\\1-Projects\\GTP_Benefit_Calc\\Seed_data\\medical_plan_cost.csv";
        String line = "";
        String cvsSplitBy = ",";
        String[] readInLine = {};
        String[] ageRange = {};
        PlanCost planCost = null;
        List<PlanCost> savedPlanCostList = new ArrayList<>();
        
        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            while ((line = br.readLine()) != null) {
                // use comma as separator
                readInLine = line.split(cvsSplitBy);
                ageRange = readInLine[0].split("-");

                System.out.println("Age Range: " + readInLine[0] + "\n" +
                		           "Cost1: " + readInLine[1] + "\n" +
                		           "Cost16: " + readInLine[16] + "\n"
                		           );
                
                List<String> planCostStrList = new ArrayList<>();
                planCostStrList.addAll(Arrays.asList(readInLine));
                
                planCostStrList.remove(0);
                Integer planId = 100;
                for (String item: planCostStrList) {
                	planId++;              
	                planCost = new PlanCost();
	                planCost.setMinAge(new Integer(ageRange[0].trim()));
	                planCost.setMaxAge(new Integer(ageRange[1].trim()));
	                planCost.setType("M");
	                planCost.setPlanId(planId);
	                planCost.setCost(new BigDecimal(item));
	                savedPlanCostList.add(planCost);
	                planCostDao.save(planCost);  
                }
            }
	    } catch (IOException e) {
	        e.printStackTrace();
	        if (e.getCause().getCause() != null)  {
    			errorMsg = e.getCause().toString();
    		}
    		else {
    			errorMsg = e.getMessage();
    		}
	    }
        
        return errorMsg;
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