package com.touchpointsinc.payrollapp.representations;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "plan_cost")
public class PlanCost extends BaseEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
    private String type;
	
	@NotNull
	@Column(name = "plan_id")
    private String planId;
	
	@NotNull
	@Column(name = "min_age")
	private Integer minAge;
	
	@NotNull
	@Column(name = "max_age")
	private Integer maxAge;
	
	@NotNull
    private BigDecimal cost;	
	
	public PlanCost() {
		super();		
	}

	public PlanCost(Long id, Timestamp createTs, String type, String planId,
			Integer minAge, Integer maxAge, BigDecimal cost, Timestamp createTs2) {
		super(createTs);
		this.id = id;
		this.type = type;
		this.planId = planId;
		this.minAge = minAge;
		this.maxAge = maxAge;
		this.cost = cost;
		createTs = createTs2;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	public Integer getMinAge() {
		return minAge;
	}

	public void setMinAge(Integer minAge) {
		this.minAge = minAge;
	}

	public Integer getMaxAge() {
		return maxAge;
	}

	public void setMaxAge(Integer maxAge) {
		this.maxAge = maxAge;
	}

	public BigDecimal getCost() {
		return cost;
	}

	public void setCost(BigDecimal cost) {
		this.cost = cost;
	}
}
