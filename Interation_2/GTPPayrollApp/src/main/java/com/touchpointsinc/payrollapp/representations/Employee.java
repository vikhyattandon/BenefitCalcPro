package com.touchpointsinc.payrollapp.representations;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Employee extends BaseEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String status;
    
    private String email;
    
    @NotNull
    private String login;
    
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date birthday;
    
    @Column(name = "start_date")
    private Date startDate;
    
    /**
     * Benefit plans
     */
    @OneToOne(fetch = FetchType.EAGER)
    //@PrimaryKeyJoinColumn
    @JoinColumn(name="medical_plan_id", nullable=true)
    private BenefitPlan medicalPlan;
    
    @OneToOne(fetch = FetchType.EAGER)
    //@PrimaryKeyJoinColumn
    @JoinColumn(name="dental_plan_id", nullable=true)
    private BenefitPlan dentalPlan;
    
    @OneToOne(fetch = FetchType.EAGER)
    //@PrimaryKeyJoinColumn
    @JoinColumn(name="vision_plan_id", nullable=true)
    private BenefitPlan visionPlan;
    
    /**
     * Employer contributions
     */
    @OneToOne(fetch = FetchType.EAGER)
    //@PrimaryKeyJoinColumn
    @JoinColumn(name="medical_comp_id", nullable=true)
    private EmployerContribution medicalContribution;
    
    @OneToOne(fetch = FetchType.EAGER)
    //@PrimaryKeyJoinColumn
    @JoinColumn(name="dental_comp_id", nullable=true)
    private EmployerContribution dentalContribution;
    
    @OneToOne(fetch = FetchType.EAGER)
    //@PrimaryKeyJoinColumn
    @JoinColumn(name="vision_comp_id", nullable=true)
    private EmployerContribution visionContribution;
    
    /**
     * Employee dependent list
     */
    @OneToMany(fetch = FetchType.EAGER, cascade={CascadeType.DETACH})
    @JoinColumn(name = "employee_id")
    private Set<Dependent> dependents;       
    
    public Employee() {
    	super();
    }

    public Employee(Long id, String firstName, String lastName, String email, String login, Timestamp createTs) {
    	super(createTs);
    	this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.login = login;        
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public BenefitPlan getDentalPlan() {
		return dentalPlan;
	}

	public void setDentalPlan(BenefitPlan dentalPlan) {
		this.dentalPlan = dentalPlan;
	}

	public BenefitPlan getVisionPlan() {
		return visionPlan;
	}

	public void setVisionPlan(BenefitPlan visionPlan) {
		this.visionPlan = visionPlan;
	}

	public EmployerContribution getDentalContribution() {
		return dentalContribution;
	}

	public void setDentalContribution(EmployerContribution dentalContribution) {
		this.dentalContribution = dentalContribution;
	}

	public EmployerContribution getVisionContribution() {
		return visionContribution;
	}

	public void setVisionContribution(EmployerContribution visionContribution) {
		this.visionContribution = visionContribution;
	}

	public Set<Dependent> getDependents() {
		return dependents;
	}

	public void setDependents(Set<Dependent> dependents) {
		this.dependents = dependents;
	}

	public BenefitPlan getMedicalPlan() {
		return medicalPlan;
	}

	public void setMedicalPlan(BenefitPlan medicalPlan) {
		this.medicalPlan = medicalPlan;
	}

	public EmployerContribution getMedicalContribution() {
		return medicalContribution;
	}

	public void setMedicalContribution(EmployerContribution medicalContribution) {
		this.medicalContribution = medicalContribution;
	}
}
