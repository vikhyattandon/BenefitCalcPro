package com.touchpointsinc.payrollapp.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.touchpointsinc.payrollapp.representations.Dependent;

public interface DependentDao extends JpaRepository<Dependent, Long> {
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public <S extends Dependent> S save(S entity);
}