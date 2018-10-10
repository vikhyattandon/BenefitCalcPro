package com.touchpointsinc.payrollapp.representations;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "benefit_plan")
public class BenefitPlan extends BaseEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String name;
	
	@NotNull
    private String type;
	
	private String provider;
	
	public BenefitPlan() {
		super();
	}

	public BenefitPlan(Long id, String name, String type, Integer minAge, Integer maxAge, BigDecimal cost, Timestamp createTs) {
		super(createTs);
		this.id = id;
		this.name = name;
		this.type = type;	
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}	
}
