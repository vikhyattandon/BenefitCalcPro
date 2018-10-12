package com.touchpointsinc.payrollapp.persistance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.representations.Audit;


public interface AuditDao extends JpaRepository<Audit, Long> {
	/**
     * Get audit list by field name
     * @param field name
     * @return  audit list
     *          
     */
    @Query("SELECT a FROM Audit a WHERE a.fieldName = :fieldName")
    public List<Audit> getByfieldName(@Param("fieldName")String fieldName);
    
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public <S extends Audit> S save(S entity);
}
