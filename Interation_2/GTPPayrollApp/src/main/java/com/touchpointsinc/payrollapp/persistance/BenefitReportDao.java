package com.touchpointsinc.payrollapp.persistance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.representations.BenefitReport;


public interface BenefitReportDao extends JpaRepository<BenefitReport, Long> {
	@Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public <S extends BenefitReport> S save(S entity);
	
	/**
     * Get max report number in benefit_report table
     * @return  max report number
     */
    @Query("SELECT max(r.reportNumber) FROM BenefitReport r")
    public Long getMaxReportNumber();
    
    /**
     * Get max report number in benefit_report table
     * @return  max report number
     */
    @Query("SELECT br FROM BenefitReport br WHERE br.yearMonth = :yearMonth "
    	 + "AND br.reportNumber = (SELECT max(br1.reportNumber) FROM BenefitReport br1 WHERE br1.yearMonth = :yearMonth)")
    public List<BenefitReport> getLastBenefitReportByYearMonth(@Param("yearMonth")String yearMonth);
}
