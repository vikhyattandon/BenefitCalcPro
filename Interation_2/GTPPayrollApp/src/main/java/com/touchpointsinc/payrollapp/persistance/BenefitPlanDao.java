package com.touchpointsinc.payrollapp.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.representations.BenefitPlan;


public interface BenefitPlanDao extends JpaRepository<BenefitPlan, Long> {
	@Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public <S extends BenefitPlan> S save(S entity);
}
