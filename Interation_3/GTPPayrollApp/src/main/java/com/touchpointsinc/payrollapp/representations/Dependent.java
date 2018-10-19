package com.touchpointsinc.payrollapp.representations;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Dependent extends BaseEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;
    
    private String type;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date birthday;
    
    @Column(name = "employee_id")
    private Long employeeId;
    
    @Column(name = "medical_plan_flag")
    private Boolean medicalPlanFlag;

    @Column(name = "dental_plan_flag")
    private Boolean dentalPlanFlag;
    
    @Column(name = "vision_plan_flag")
    private Boolean visionPlanFlag;
    
    @Column(name = "effective_date")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date effectiveDate;
    
    public Dependent() {
    	super();
    }

    public Date getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public Dependent(Long id, String firstName, String lastName, Date birthday, Timestamp createTs) {
    	super(createTs);
    	this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;               
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public Boolean getDentalPlanFlag() {
		return dentalPlanFlag;
	}

	public void setDentalPlanFlag(Boolean dentalPlanFlag) {
		this.dentalPlanFlag = dentalPlanFlag;
	}

	public Boolean getVisionPlanFlag() {
		return visionPlanFlag;
	}

	public void setVisionPlanFlag(Boolean visionPlanFlag) {
		this.visionPlanFlag = visionPlanFlag;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Boolean getMedicalPlanFlag() {
		return medicalPlanFlag;
	}

	public void setMedicalPlanFlag(Boolean medicalPlanFlag) {
		this.medicalPlanFlag = medicalPlanFlag;
	}    
}
