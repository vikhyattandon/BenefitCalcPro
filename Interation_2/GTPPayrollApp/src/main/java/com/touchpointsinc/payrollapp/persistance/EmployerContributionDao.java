package com.touchpointsinc.payrollapp.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.representations.EmployerContribution;


public interface EmployerContributionDao extends JpaRepository<EmployerContribution, Long> {
	@Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public <S extends EmployerContribution> S save(S entity);
}
