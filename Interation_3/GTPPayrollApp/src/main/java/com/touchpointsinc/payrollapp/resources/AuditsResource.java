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

import com.touchpointsinc.payrollapp.persistance.AuditDao;
import com.touchpointsinc.payrollapp.representations.Audit;


@Path("/audits")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class AuditsResource {
    private AuditDao auditDao;
    @Inject
    public AuditsResource(AuditDao auditDao){
        this.auditDao = auditDao;
    }

    /**
     * Get all Audits
     * @return audits
     */
    @GET
    public List<Audit> getAll(){
        List<Audit> audits = this.auditDao.findAll();
        return audits;
    }

    /**
     * Get single Audit
     * @param id
     * @return audit
     */
    @GET
    @Path("{id}")
    public Audit getOne(@PathParam("id")long id) {
        Audit audit = auditDao.findOne(id);
        if(audit == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            return audit;
        }
    }

    /**
     * Create new Audit
     * @param audit
     * @return new audit
     */
    @POST
    public Audit save(@Valid Audit audit) {
    	Audit returnAudit = new Audit();
    	try {
    		returnAudit = auditDao.save(audit);    		   
    	}
    	catch (Exception e) {
    		if (e.getCause().getCause() != null)  {
    			returnAudit.setErrorMssage(e.getCause().getCause().toString());
    		}
    		else {
    			returnAudit.setErrorMssage(e.getMessage());
    		}
    	}
        return returnAudit;       
    }

    /**
     * Update existing Audit
     * @param id
     * @param audit
     * @return updated audit
     */
    @PUT
    @Path("{id}")
    public Audit update(@PathParam("id")long id, @Valid Audit audit) {
        if(auditDao.findOne(id) == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            audit.setId(id);
            return auditDao.save(audit);
        }
    }

    /**
     * Delete audit
     * @param id
     */
    //@DELETE
    //@Path("{id}")
    public void delete(@PathParam("id")long id) {
        Audit audit = auditDao.findOne(id);
        if(audit == null){
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }else {
            auditDao.delete(audit);
        }
    }
}