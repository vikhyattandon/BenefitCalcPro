package com.touchpointsinc.payrollapp.representations;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "employer_contribution")
public class EmployerContribution extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Column(name = "coverage_type")
    private String coverageType;
    
    @NotNull
    @Column(name = "plan_type")
    private String planType;
    
    @NotNull
    @Column(name = "service_year")
    private Integer serviceYear;
    
    @NotNull
    private BigDecimal amount;
    
    public EmployerContribution() {
    	super(null);
    }

    public EmployerContribution(Long id, Integer serviceYear, BigDecimal amount, Timestamp createTs) {
    	super(createTs);
        this.id = id;
        this.serviceYear = serviceYear;
        this.amount = amount;     
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public Integer getServiceYear() {
		return serviceYear;
	}

	public void setServiceYear(Integer serviceYear) {
		this.serviceYear = serviceYear;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getCoverageType() {
		return coverageType;
	}

	public void setCoverageType(String coverageType) {
		this.coverageType = coverageType;
	}

	public String getPlanType() {
		return planType;
	}

	public void setPlanType(String planType) {
		this.planType = planType;
	}
}
