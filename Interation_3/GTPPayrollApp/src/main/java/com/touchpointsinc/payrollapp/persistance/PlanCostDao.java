package com.touchpointsinc.payrollapp.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.representations.PlanCost;


public interface PlanCostDao extends JpaRepository<PlanCost, Long> {
	@Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public <S extends PlanCost> S save(S entity);
}
