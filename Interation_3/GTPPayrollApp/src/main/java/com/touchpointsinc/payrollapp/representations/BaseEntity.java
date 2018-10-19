package com.touchpointsinc.payrollapp.representations;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

//@Entity
public class BaseEntity {
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@Column(name = "create_ts")
	private Timestamp createTs;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@Column(name = "update_ts")
	private Timestamp updateTs;
	
	private String createTsStr;
	private String errorMssage;	
	
	public BaseEntity() {
		
	}
	
	public BaseEntity(Timestamp createTs) {
		this.createTs = createTs;
	}
	
	public String getCreateTsStr() {
		return createTsStr;
	}

	public void setCreateTsStr(String createTsStr) {
		this.createTsStr = createTsStr;
	}

	public Timestamp getCreateTs() {
		return createTs;
	}

	public void setCreateTs(Timestamp createTs) {
		this.createTs = createTs;
	}

	public String getErrorMssage() {
		return errorMssage;
	}

	public void setErrorMssage(String errorMssage) {
		this.errorMssage = errorMssage;
	}

	public Timestamp getUpdateTs() {
		return updateTs;
	}

	public void setUpdateTs(Timestamp updateTs) {
		this.updateTs = updateTs;
	}		
}
