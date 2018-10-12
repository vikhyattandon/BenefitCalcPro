package com.touchpointsinc.payrollapp.representations;

import java.sql.Timestamp;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonFormat;

public class BaseEntity {

	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@Column(name = "create_ts")
	private Timestamp createTs;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@Column(name = "update_ts")
	private Timestamp updateTs;
	
	private String errorMssage;	
	
	public BaseEntity(Timestamp createTs) {		
		this.createTs = createTs;
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
