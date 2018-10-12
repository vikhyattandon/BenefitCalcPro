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

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "benefit_plan")
public class BenefitPlan extends BaseEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private String name;
	
	@NotNull
    private String type;
	
	private String provider;
	
	@NotNull
	@Column(name = "min_age")
	private Integer minAge;
	
	@NotNull
	@Column(name = "max_age")
	private Integer maxAge;
	
	@NotNull
	private BigDecimal cost;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@Column(name = "create_ts")
	private Timestamp createTs;
	
	public BenefitPlan() {
		super(null);
	}

	public BenefitPlan(int id, String name, String type, Integer minAge, Integer maxAge, BigDecimal cost, Timestamp createTs) {
		super(createTs);
		this.id = id;
		this.name = name;
		this.type = type;
		this.minAge = minAge;
		this.maxAge = maxAge;
		this.cost = cost;
		this.createTs = createTs;		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Timestamp getCreateTs() {
		return createTs;
	}

	public void setCreateTs(Timestamp createTs) {
		this.createTs = createTs;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getCost() {
		return cost;
	}

	public void setCost(BigDecimal cost) {
		this.cost = cost;
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
