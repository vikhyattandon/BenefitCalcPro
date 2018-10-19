package com.touchpointsinc.payrollapp.representations;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "benefit_report")
public class BenefitReport extends BaseEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(fetch = FetchType.EAGER, cascade={CascadeType.DETACH})
    //@PrimaryKeyJoinColumn
    @JoinColumn(name="employee_id", nullable=true)
    private Employee employee;
	
	@NotNull
	@Column(name = "year_month")
	private String yearMonth;
	
	@NotNull
	@Column(name = "benefit_cost")
    private BigDecimal benefitCost;	
	
	@NotNull
	@Column(name = "employer_comp")
    private BigDecimal employerContribution;	
	
	@NotNull
	@Column(name = "final_cost")
    private BigDecimal finalCost;	
	
	@NotNull
	@Column(name = "report_number")
    private Integer reportNumber;
	
	public BenefitReport() {
		super();		
	}

	public Integer getReportNumber() {
		return reportNumber;
	}

	public void setReportNumber(Integer reportNumber) {
		this.reportNumber = reportNumber;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getEmployerContribution() {
		return employerContribution;
	}

	public void setEmployerContribution(BigDecimal employerContribution) {
		this.employerContribution = employerContribution;
	}

	public String getYearMonth() {
		return yearMonth;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public void setYearMonth(String yearMonth) {
		this.yearMonth = yearMonth;
	}

	public BigDecimal getBenefitCost() {
		return benefitCost;
	}

	public void setBenefitCost(BigDecimal benefitCost) {
		this.benefitCost = benefitCost;
	}

	public BigDecimal getFinalCost() {
		return finalCost;
	}

	public void setFinalCost(BigDecimal finalCost) {
		this.finalCost = finalCost;
	}

	
}
