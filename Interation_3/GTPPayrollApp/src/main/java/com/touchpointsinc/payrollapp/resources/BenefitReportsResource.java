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
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.persistance.BenefitReportDao;
import com.touchpointsinc.payrollapp.representations.BenefitReport;


@Path("/benefitReports")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class BenefitReportsResource {
    private BenefitReportDao benefitReportDao;
    
    @Inject
    public BenefitReportsResource(BenefitReportDao benefitReportDao){
        this.benefitReportDao = benefitReportDao;
    } 

    /**
     * Get all BenefitReports
     * @return benefitReports
     */
    @GET
    public List<BenefitReport> getAll(){
        List<BenefitReport> benefitReports = this.benefitReportDao.findAll();
        
        return benefitReports;
    }

    /**
     * Get max report number in benefit_report table
     * @return maxReportNumber
     */
    @GET
    @Path("/getMaxReportNumber")  
    public Long getMaxReportNumber() {
        Long maxReportNumber = this.benefitReportDao.getMaxReportNumber();
        
        return maxReportNumber;
    }
    
    /**
     * Get single Employee by login
     * @param login
     * @return employee
     */
    @GET
    @Path("/getLastBenefitReportByYearMonth")  
    public List<BenefitReport> getLastBenefitReportByYearMonth(@QueryParam("yearMonth")String yearMonth) {
    	List<BenefitReport> lastBenefitReportByYearMonth = this.benefitReportDao.getLastBenefitReportByYearMonth(yearMonth);
        System.out.println("yearMonth: " + yearMonth);
        return lastBenefitReportByYearMonth;
    }
    
    /**
     * Get single BenefitReport
     * @param id
     * @return benefitReport
     */
    @GET
    @Path("{id}")
    public BenefitReport getOne(@PathParam("id")long id) {
        BenefitReport benefitReport = benefitReportDao.findOne(id);
        if(benefitReport == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            return benefitReport;
        }
    }

    /**
     * Create new BenefitReport
     * @param benefitReport
     * @return new benefitReport
     */
    @POST
    public BenefitReport save(@Valid BenefitReport benefitReport) {
    	BenefitReport returnBenefitReport = new BenefitReport();
    	try {
    		returnBenefitReport = benefitReportDao.save(benefitReport);    		   
    	}
    	catch (Exception e) {
    		if (e.getCause().getCause() != null)  {
    			returnBenefitReport.setErrorMssage(e.getCause().getCause().toString());
    		}
    		else {
    			returnBenefitReport.setErrorMssage(e.getMessage());
    		}
    	}
        return returnBenefitReport;       
    }

    /**
     * Update existing BenefitReport
     * @param id
     * @param benefitReport
     * @return updated benefitReport
     */
    @PUT
    @Path("{id}")
    public BenefitReport update(@PathParam("id")long id, @Valid BenefitReport benefitReport) {
        if(benefitReportDao.findOne(id) == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            benefitReport.setId(id);
            return benefitReportDao.save(benefitReport);
        }
    }

    /**
     * Delete benefitReport
     * @param id
     */
    //@DELETE
    //@Path("{id}")
    public void delete(@PathParam("id")long id) {
        BenefitReport benefitReport = benefitReportDao.findOne(id);
        if(benefitReport == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            benefitReportDao.delete(benefitReport);
        }
    }
}